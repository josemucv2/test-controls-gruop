import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "@/layouts/Auth";
import { Login } from "@/views/Auth/Login";
import { CoreLayout } from "@/layouts/Core";
import { Home } from "@/views/Core/Home/Home";
import { Episodes } from "@/views/Core/Episodes";
import { Register } from "@/views/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "/app",
    Component: CoreLayout,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "episodes",
        Component: Episodes,
      },
    ],
  },
]);
