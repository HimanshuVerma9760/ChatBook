export default async function LoginAction({ request }) {
  const formData = await request.formData();

  const userEmail = formData.get("userEmail");
  const userPassword = formData.get("userPassword");

  console.log(userEmail);
  return { message: "executed!" };
}
