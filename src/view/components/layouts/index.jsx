// ===== Imports =====
import { Outlet } from "react-router-dom";
import Navbar from "../navigations";

// ===== Code =====
export default function LayoutPage() {
     return (
          <div className="bg-main w-full min-h-screen  bg-gray-900">
               {/* ===== Navigation ===== */}
               <Navbar />

               {/* ===== Place for the children */}
               <Outlet />

               <footer className="text-sm md:text-lg text-center text-gray-400 bg-gray-600/10 backdrop-blur-md border-t-2 border-gray-300/30 p-5">
                    <span>© {new Date().getFullYear()} Mazumala. Semua hak dilindungi.</span>
               </footer>
          </div>
     )
}