// ===== Imports =====
import { useState } from "react"

// ===== Code =====
export default function Selects({ title, type, data, text, onCLick, value = "", onChange, isReady, icon, defaultValuex }) {
     // ===== States =====
     const [open, setOpen] = useState(false)
     return (
          <>
               {/* ===== Container ===== */}
               <div className={`bg-gray-900/30 w-full  md:max-w-max z-999  backdrop-blur-md ${isReady ? `opacity-100` : `opacity-50`} h-max border-gray-400/10 border-2 rounded-md`}>
                    {/* ===== Title ===== */}
                    <div className="bg-gray-400/10 text-gray-300 px-2 flex justify-center items-center gap-2 p-1 text-center">
                         {icon && <i className={`bi bi-${icon}`}></i>}
                         <h2 className="text-sm md:text-base">{title ?? "Titel"}</h2>
                    </div>

                    {/* ===== Input ===== */}
                    <div className={`flex  items-center gap-2 p-2 w-full`}>
                         <div className={`border-2 flex-1 border-gray-400/10 rounded-md flex overflow-hidden`}>
                              <i className="bi bi-search p-1 px-2 text-gray-300 bg-gray-400/10"></i>
                              <input {...(!isReady ? { readOnly: true } : null)} onChange={(e) => {
                                   setOpen(true)
                                   onChange(e.target.value)
                              }} {...(defaultValuex ? { defaultValue: value } : { value: value })} placeholder={text ?? "Choose your own..."} type={type ?? "text"} className={`focus:outline-0 ${isReady ? `` : `cursor-not-allowed`} flex-1 placeholder:text-sm text-gray-300 px-2`} />
                         </div>

                         {/* ===== Chevron ===== */}
                         <div onClick={() => setOpen(!open)} className={`bg-gray-400/10 text-gray-300 hover:bg-gray-400/20 px-2 p-1 rounded-full ${isReady && open ? `-rotate-90` : `rotate-0`} duration-200 overflow-hidden border-2 border-gray-300/10 active:scale-95 ${isReady ? `cursor-pointer` : `cursor-not-allowed`}`}>
                              <i className={`bi bi-chevron-left ${isReady && open ? `` : ``}`}></i>
                         </div>
                    </div>

                    {/* ===== List ===== */}
                    <ul className={`text-indigo-300  bg-gray-900 backdrop-blur-md mt-3 rounded-md left-0 right-0  duration-200 ${isReady && open ? `max-h-56 border` : `max-h-0`} overflow-auto border-gray-400/10 `}>
                         {data && data.map((v, i) => (
                              <li onClick={() => {
                                   onCLick({ value: v, index: i })
                                   setOpen(false)
                              }} className={`hover:bg-indigo-500 px-2 py-1 cursor-pointer hover:text-indigo-100`} key={i}>{v}</li>
                         ))}
                    </ul>
               </div>
          </>
     )
}