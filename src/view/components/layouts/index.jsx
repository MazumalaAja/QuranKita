// ===== Imports =====
import { Outlet } from "react-router-dom";
import Navbar from "../navigations";

// ===== Code =====
export default function LayoutPage() {
     return (
          <div className="bg-main w-full min-h-screen  bg-gray-900">
               {/* ===== Place for the children */}
               <Outlet />

          </div>
     )
}