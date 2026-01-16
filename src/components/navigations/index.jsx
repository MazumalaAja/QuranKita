import { useEffect, useState } from "react";
import Links from "./navLink";

export default function Navbar() {
     const [open, setOpen] = useState({
          open1: false,
     })

     useEffect(() => {
          console.log(open.open1);
     }, [open])
     return (
          <>
               <header className="z-999 fixed top-0 left-0 right-0 flex border-0 justify-between px-4 items-center py-3 md:py-4 bg-gray-900/50 backdrop-blur-sm md:border-b border-gray-600/50">
                    <div data-aos="fade-right" data-aos-duration="500">
                         <h1 className="text-xl font-semibold text-transparent bg-clip-text bg-linear-to-r to-indigo-100 from-indigo-300">Quran<span>Kita</span>.</h1>
                    </div>

                    {/* ===== Desktop and Tablet Navigation ===== */}
                    <nav className="hidden md:flex text-sm">
                         <Links to={`/`} label={"Beranda"} />
                         <Links to={`/kontak`} label={"Kontak Kami"} />
                    </nav>

                    {/* ===== Toggle ===== */}
                    <div onClick={() => setOpen(prev => ({ open1: !prev.open1 }))} className="md:hidden flex flex-col gap-2 cursor-pointer border-transparent border-2 rounded-md hover:border-gray-400 p-2 duration-300">
                         <div className={`h-0.5 w-7 bg-gray-300/80 rounded-full transition-all duration-300 ${open.open1 ? `rotate-45  translate-y-2.5` : ``}`}></div>
                         <div className={`h-0.5  bg-gray-300/80 rounded-full transition-all duration-300 ${open.open1 ? `w-0` : `w-7`}`}></div>
                         <div className={`h-0.5 w-7 bg-gray-300/80 rounded-full transition-all duration-300 ${open.open1 ? `-rotate-45 -translate-y-2.5` : ``}`}></div>
                    </div>
               </header>

               <nav className={`fixed flex md:hidden flex-col gap-3 top-[4.08rem] ${open.open1 ? `h-max p-2` : `h-0`} overflow-hidden  md:p-0 left-0 right-0 z-999 duration-300 bg-gray-900/50 backdrop-blur-sm border-b border-gray-600/30`}>
                    <Links to={`/`} label={"Beranda"} />
                    <Links to={`/kontak`} label={"Kontak Kami"} />
               </nav>
          </>
     )
}