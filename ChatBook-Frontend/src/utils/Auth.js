// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const backendApi = import.meta.env.VITE_BACKEND_API;

export async function Auth() {
  const token = localStorage.getItem("token");

  if (!token) {
    return { isAuth: false };
  }

  try {
    const response = await fetch(`${backendApi}/dashboard`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("Valid token");
      return { isAuth: true };
    } else {
      console.log("Invalid token");
      localStorage.removeItem("token");
      return { isAuth: false };
    }
  } catch (error) {
    console.error("Error during authentication check:", error);
    localStorage.removeItem("token");
    return { isAuth: false };
  }
}
