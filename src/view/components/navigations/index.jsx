// ===== Imports =====
import { useState } from "react"
import { NavLink } from "react-router-dom"
import "../../../assets/css/navbar.css"

// ===== Code =====
export default function Navbar() {
     const [open, setOpen] = useState(false);
     return (
          <header className={`${open ? `h-max` : `h-14`} duration-300 navbar overflow-auto`}>
               {/* ===== Logo ===== */}
               <div className="text-xl flex justify-between items-center font-medium text-gray-300 ">
                    <div className="flex gap-2 items-center">
                         <i className="bi bi-journal"></i>
                         <h1>QuranKita.</h1>
                    </div>

                    <div onClick={() => setOpen(!open)} className="flex cursor-pointer flex-col gap-1.5 md:hidden">
                         <span className={`w-6 rounded-full duration-200 ${open ? `rotate-45 translate-y-2` : ``} bg-gray-300 h-[0.1rem]`}></span>
                         <span className={`rounded-full duration-200 ${open ? `w-0` : `w-6`} bg-gray-300 h-[0.1rem]`}></span>
                         <span className={`w-6 rounded-full duration-200 ${open ? `-rotate-45 -translate-y-2` : ``} bg-gray-300 h-[0.1rem]`}></span>
                    </div>
               </div>

               {/* ===== Link ===== */}
               <nav className={`md:flex dura gap-3 overflow-auto`}>
                    <Links to={`/`} label={`Beranda`} icon={`house`} />
                    <Links to={`/kontak`} label={`Kontak Saya`} icon={`envelope`} />
               </nav>
          </header >
     )
}

// ===== Links component ====
function Links({ label, icon, to }) {
     return (
          <NavLink className={({ isActive }) => `${isActive ? `bg-gray-300/10 text-gray-100 border border-gray-300/30` : `text-gray-400`} flex justify-between md:justify-start item-center hover:text-gray-100 gap-1 py-1 px-4 rounded-md md:rounded-full`} to={to}>
               {icon && <i className={`bi bi-${icon}`}></i>}
               <span>{label}</span>
          </NavLink>
     )
}