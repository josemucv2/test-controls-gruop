import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./assets/css/style.css";
import React from "react";
import { Toaster } from "./Context/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <RouterProvider router={router} />
    <Toaster />
  </React.Fragment>
);
