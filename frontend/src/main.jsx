import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Process from "./Process.jsx";
import Home from "./Home.jsx";
import AboutUs from "./AboutUs.jsx";
import Products from "./Products.jsx";
import Contact from "./Contact.jsx";
import Login from "./Login.jsx";
import Admin from "./Admin.jsx";
import AdminProvider from "../context/AdminProvider.jsx";
import Error from "./Error.jsx"

export const server = "https://lithium-ion.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/process",
        element: <Process />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/admin/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: (
          <AdminProvider>
            <Admin />
          </AdminProvider>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
