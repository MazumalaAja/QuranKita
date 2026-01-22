// ===== Code =====
export default function Inputs({ type, onChange, text, icon, value }) {
     return (
          <div className="border-2 flex gap-3 focus-within:bg-gray-800/50 duration-200 rounded-md text-gray-200 border-gray-500/50 overflow-hidden focus-within:ring-gray-500 focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-offset-gray-950">
               {icon && <i className={`bi bi-${icon} text-xl md:text-2xl text-gray-300 bg-gray-500/50 px-2 md:px-3 p-1 md:p-2`}></i>}
               <input value={value} required className="focus:outline-0 text-sm md:text-base w-full px-2 md:px-3" onChange={onChange} type={type} placeholder={text} />
          </div>
     )
}