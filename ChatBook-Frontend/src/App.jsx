// import Chat from "./Components/Chats.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./utils/Theme.js";
import Homepage from "./Components/Homepage.jsx";
import SignUpPage from "./Components/SignUpPage.jsx";
import FormAction from "./utils/FormAction.js";
import LoginPage from "./Components/LoginPage.jsx";
import LoginAction from "./utils/LoginAction.js";
// import Chats from "./Components/Chats.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import { Auth } from "./utils/Auth.js";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/dashboard",
          loader: Auth,
          element: <Dashboard />,
        },
        {
          path: "/sign-up",
          action: FormAction,
          element: <SignUpPage />,
        },
        {
          path: "/login",
          action: LoginAction,
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
