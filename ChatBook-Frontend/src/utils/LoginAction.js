const backendAPI = import.meta.env.VITE_BACKEND_API;

export default async function LoginAction({ request }) {
  try {
    const formData = await request.formData();
    const userEmail = formData.get("userEmail");
    const userPassword = formData.get("userPassword");

    // Validate input
    if (!userEmail || !userPassword) {
      return { message: "Email and password are required!" };
    }

    const loginData = { userEmail, userPassword };

    // Fetch from backend
    const response = await fetch(`${backendAPI}/user-login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle response
    if (!response.ok) {
      let backendResponse;
      try {
        backendResponse = await response.json();
      } catch {
        return { message: "Invalid response from server." };
      }
      return { message: backendResponse.message || "Login failed." };
    }

    const backendResponse = await response.json();
    localStorage.setItem("token", backendResponse.token);
    return { isAuth: true };
  } catch (error) {
    console.error("LoginAction Error:", error);
    return { message: "Server is down! Try again later!" };
  }
}
