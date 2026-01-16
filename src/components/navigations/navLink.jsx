import { NavLink } from "react-router-dom";

export default function Links({ to, label, icon }) {
     const style = ({ isActive }) => `${isActive ? `text-indigo-100 bg-indigo-300/30 rounded-full border border-indigo-100/50` : ``} duration-200 hover:text-indigo-100 text-gray-400 py-1.5 px-4 inline-flex`
     return (
          <>
               <NavLink data-aos="zoom-in" data-aos-duration="500" className={style} to={to}>
                    {icon && <i className={`${icon}`}></i>}
                    <span>{label}</span>
               </NavLink>
          </>
     )
}