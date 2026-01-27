// ===== Imports =====
import { createRoot } from "react-dom/client";
import router from "./view/routes";
import { RouterProvider } from "react-router-dom";
import "./assets/fonts/index.js"
import "./assets/icons/index.js"
import "./assets/css/app.css";
import "./assets/css/main.css";

// ===== Code =====
createRoot(document.getElementById("root")).render(
     <RouterProvider router={router} />
);