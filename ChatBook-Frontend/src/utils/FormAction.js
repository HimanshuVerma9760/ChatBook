const backendAPI = import.meta.env.VITE_BACKEND_API;

export default async function FormAction({ request }) {
  let response;
  try {
    const newUserData = await request.formData();
    const form = {
      fullName: newUserData.get("fullName"),
      userEmail: newUserData.get("userEmail"),
      userPassword: newUserData.get("userPassword"),
    };
    console.log(form);
    response = await fetch(`${backendAPI}/add-new-user`, {
      method: "post",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      if (!response.ok) {
        return { message: "Some error occured while saving data!" };
      } else {
        const backendResponse=await response.json();
        return { message: backendResponse.message };
      }
    } else {
      return { message: "No response from server!" };
    }
  } catch (error) {
    return { message: "Some error Occured!" };
  }
}
