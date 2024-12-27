const backendAPI = import.meta.env.VITE_BACKEND_API;

export default async function FormAction({ request }) {
  let response;
  try {
    const newUserData = await request.formData();
    const form = {
      userName: newUserData.get("userName"),
      firstName: newUserData.get("firstName"),
      lastName: newUserData.get("lastName"),
      userEmail: newUserData.get("userEmail"),
      userPhone: newUserData.get("userPhone"),
      userPassword: newUserData.get("userPWD"),
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
        return { message: "Successfully Added!" };
      }
    } else {
      return { message: "No response from server!" };
    }
  } catch (error) {
    return { message: "Some error Occured!" };
  }
}
