// ===== Code =====
export default function Toggle({ open = false, icon, onclick }) {
     return (
          <>
               <div className={`flex items-center text-2xl gap-2`}>
                    <i className={`bi bi-${icon} ${open ? `text-indigo-400` : `text-gray-400`}`}></i>
                    <label
                         className={`relative inline-block h-8 w-14 cursor-pointer overflow-hidden rounded-full  transition [-webkit-tap-highlight-color:transparent] ${open ? `bg-indigo-400` : `bg-gray-400`}`}>
                         <input onClick={onclick} className="peer sr-only" id="AcceptConditions" type="checkbox" />
                         <span
                              className={`duration-100 absolute ${open ? `start-9 size-6 w-2 bg-indigo-200` : ` bg-gray-100 start-1 size-6`} top-[50%] translate-y-[-50%]  rounded-full`}
                         ></span>
                    </ label>
               </div >
          </>

     )
}