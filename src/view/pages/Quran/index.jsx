// ====== Imports =====
import { NavLink, Outlet, useLoaderData, useLocation, useNavigate, useRevalidator } from "react-router-dom";
import Navbar from "../../components/navigations";
import { useEffect, useState } from "react";
import Inputs from "../../components/inputs";

// ===== Code =====
export default function QuranPage() {
     // ===== Get data surah =====
     const surah = useLoaderData() ?? [];
     const [data, setData] = useState(surah);
     const { revalidate } = useRevalidator();

     // ===== Navigation data =====
     const navigation = [
          { label: "Al-Quran", icon: "journal", to: "/al-quran" },
          { label: "Waktu Sholat", icon: "time", to: "/waktu-sholat" },
     ]

     // ===== HandleChange for input search =====
     function handleChange(e) {
          const input = e.target.value.toLowerCase();
          if (input && input.trim()) {
               const result = surah.filter(v => v.namaLatin.toLowerCase().includes(input));
               setData(result.length > 0 ? result : [{ namaLatin: "Tidak menemukan Surat", error: true }]);
          } else {
               setData(surah);
          }
     }

     useEffect(() => {
          const cacheSurah = JSON.parse(localStorage.getItem("surah"));
          if (!cacheSurah || cacheSurah.expireAt < Date.now()) {
               revalidate()
          }
     }, [revalidate]);
     return (
          <>
               {/* ===== Navigation ===== */}
               <Navbar data={navigation} />

               {/* ===== Sidebar ===== */}
               <aside className="fixed left-0 overflow-scroll bottom-0 w-72 border-r-2 gap-1 flex flex-col p-2 border-gray-300/10 backdrop-blur-sm top-14 z-999">
                    <div className="mb-3">
                         <h2 className="text-xl text-gray-200 mb-2">Daftar Surah.</h2>
                         <Inputs onChange={handleChange} text={"Cari Surah..."} icon={"search"} iconStyle={`p-2 px-3 bg-gray-400/30`} />
                    </div>


                    {
                         data.length > 0 ? data.map((v, i) => (
                              <NavLink to={`${v.nomor}`} className={({ isActive }) => `${isActive ? `bg-green-500/50 text-green-200` : `bg-gray-400/30 text-gray-300 `} active:scale-95 duration-150 backdrop-blur-md  text-lg cursor-pointer flex justify-between items-center rounded-sm p-2 text-start`} key={i}>
                                   {!v.error && <small>{i + 1}</small>}
                                   {!v.error ? <div className="text-center flex flex-col justify-center">
                                        <span className="text-base font-medium">{v.namaLatin}</span>
                                        <small className={`text-[0.7rem] text-gray-200`}>Jumlah ayat : {v.jumlahAyat}</small>
                                   </div> : <small>{v.namaLatin}</small>}
                                   {!v.error && <i className="bi bi-book text-xl"></i>}
                              </NavLink>
                         )) : <span className="text-gray-400 text-sm text-center p-2">
                              Surat tidak ditemukan
                         </span>
                    }
               </aside>

               <main className="fixed top-14 right-0 overflow-scroll  border-0  w-[calc(100%-18rem)] bg-gray-950/50 backdrop-blur-sm">
                    {/* ===== Place ===== */}
                    <div className="overflow-auto w-full h-screen p-4 pb-20 flex flex-col gap-3">
                         <Outlet />

                         {/* ===== Footer ===== */}
                         <footer className="text-sm md:text-lg text-center text-gray-400 bg-gray-950 backdrop-blur-md border-t-2 border-gray-300/30 p-5">
                              <span>© {new Date().getFullYear()} Mazumala. Semua hak dilindungi.</span>
                         </footer>
                    </div>
               </main>
          </>
     )
}