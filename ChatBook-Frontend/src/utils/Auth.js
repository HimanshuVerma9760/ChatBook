// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import { redirect } from "react-router-dom";

const backendApi = import.meta.env.VITE_BACKEND_URL;

export default async function Auth() {
  // return { isAuth: true };
  const token = localStorage.getItem("token");
  if (!token) {
    return { response: false, data: null };
  }

  try {
    const response = await fetch(`${backendApi}/auth/verify`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log("Invalid token");
      localStorage.removeItem("token");
      return { response: false, data: null };
    } else {
      const user = await response.json();
      return { response: true, data: user };
    }
  } catch (error) {
    console.error("Error during authentication check:", error);
    localStorage.removeItem("token");
    return { response: false, data: null };
  }
}
