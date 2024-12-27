import Chat from "./Components/Chat";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Theme.js";
import Dashboard from "./Components/Dashboard.jsx";
import Homepage from "./Components/Homepage.jsx";
import Login from "./Components/Login.jsx";

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
          path: "/login",
          element: <Login />,
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
