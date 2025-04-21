// import Chat from "./Components/Chats.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import { ThemeProvider } from "@emotion/react";
// import { theme } from "./utils/Theme.js";
import Homepage from "./Components/Homepage.jsx";
import SignUpPage from "./Components/SignUpPage.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/API/http.js";
import Auth from "./utils/Auth.js";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans",
  },
  palette: {
    background: { default: "#E9EDF1" },
  },
});
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/",
          element: <LoginPage />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/sign-up",
          element: <SignUpPage />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
