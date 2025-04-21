const backendAPI = import.meta.env.VITE_BACKEND_URL;
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export default async function signup({ signal, userData }) {
  let response;
  console.log(userData);
  response = await fetch(`${backendAPI}/users/add-new-user`, {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
    signal: signal,
  });
  if (!response.ok) {
    const error = new Error();
    error.message = "Some error occurred while saving data!";
    error.status = response.status;
    throw error;
  } else {
    const backendResponse = await response.json();
    queryClient.invalidateQueries({
      queryKey: ["all-users"],
    });
    return { message: backendResponse.message };
  }
}

export async function Login({ signal, loginCred }) {
  const response = await fetch(`${backendAPI}/users/user-login`, {
    method: "POST",
    body: JSON.stringify(loginCred),
    headers: {
      "Content-Type": "application/json",
    },
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error();
    if (response.status === 401) {
      error.message = "Invalid email or password!";
      error.status = response.status;
      throw error;
    } else {
      error.message = "Some error occured while logging in!";
      error.status = response.status;
      throw error;
    }
  } else {
    const result = await response.json();
    return result;
  }
}

export async function LoadUsers({ signal }) {
  const response = await fetch(`${backendAPI}/users/load-users`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    const error = new Error();
    error.status = response.status;
    error.message = response.statusText;
    throw error;
  } else {
    const result = await response.json();
    return result.result;
  }
}
