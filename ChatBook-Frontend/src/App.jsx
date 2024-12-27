import Chat from "./Components/Chat";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./utils/Theme.js";
import Dashboard from "./Components/Dashboard.jsx";
import Homepage from "./Components/Homepage.jsx";
import SignUp from "./Components/SignUp.jsx";
import FormAction from "./utils/FormAction.js";

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
          element: <Dashboard />,
        },
        {
          path: "/sign-up",
          action: FormAction,
          element: <SignUp />,
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
