// ====== Imports =====
import { NavLink, Outlet, useLoaderData, useLocation, useNavigate, useRevalidator } from "react-router-dom";
import Navbar from "../../components/navigations";
import { useEffect, useState } from "react";
import Inputs from "../../components/inputs";

// ===== Code =====
export default function QuranPage() {
     // ===== States =====
     const surah = useLoaderData() ?? [];
     const [data, setData] = useState(surah);
     const { revalidate } = useRevalidator();
     const [open, setOpen] = useState({
          qori: false,
          mobile: false,
     })

     // ===== Navigation data =====
     const navigation = [
          { label: "Al-Quran", icon: "journal", to: "/al-quran" },
          { label: "Waktu Sholat", icon: "clock", to: "/waktu-sholat" },
     ]

     // ====== Resource Ustadz =====
     const ustadz = [
          { id: "01", name: "Abdullah-Al-Juhany", url: "https://i.scdn.co/image/ab67616d0000b27341e4021e775036c61be46459" },
          { id: "02", name: "Abdul-Muhsin-Al-Qasim", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Abdul_Mohsin_Al-Qasim.jpg/640px-Abdul_Mohsin_Al-Qasim.jpg" },
          { id: "03", name: "Abdurrahman-as-Sudais", url: "https://assets.promediateknologi.id/crop/0x0:0x0/1200x800/webp/photo/2022/07/25/3092496303.jpg" },
          { id: "04", name: "Ibrahim-Al-Dossari", url: "https://i.scdn.co/image/ab67616d0000b273a467fa6dbfc5190f35b602fb" },
          { id: "05", name: "Misyari-Rasyid-Al-Afasi", url: "https://i.pinimg.com/564x/93/08/8b/93088be16e324b36b2d98a12748366a6.jpg" },
          { id: "06", name: "Yasser-Al-Dosari", url: "https://i1.sndcdn.com/artworks-yRdHunkzvtypsKvH-YmPLEA-t500x500.jpg" }
     ]

     const [qori, setQori] = useState({
          id: ustadz[4].id,
          name: ustadz[4].name
     });

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
               <Navbar quran={true} onClick={() => setOpen(prev => ({ ...prev, mobile: !prev.mobile }))} mobile={open.mobile} data={navigation} />

               {/* ===== Qori ===== */}
               {open.qori && <div className="fixed p-5 inset-0 min-h-screen overflow-auto z-999999 flex flex-col  gap-3 bg-gray-950/10 backdrop-blur-lg">
                    <div>
                         <h1 className="text-2xl text-gray-200 text-center">List 6 Qori Terbaik</h1>
                    </div>

                    <div className="flex justify-center gap-3 flex-wrap items-center">
                         {ustadz.map((v, i) => (
                              <div key={i} className="flex flex-col gap-1 items-center">
                                   <img onClick={() => {
                                        setQori({ id: v.id, name: v.name });
                                        setOpen(prev => ({ ...prev, qori: false }))
                                   }} className={`w-64 h-64 active:scale-90 duration-150 hover:saturate-100 rounded-md cursor-pointer ${qori.name == v.name ? `scale-100 ring-2 ring-gray-300 ring-offset-4 ring-offset-gray-900` : `scale-95 saturate-20`}`} src={v.url} alt={v.name} />
                                   <span className="text-xl text-gray-200">{v.name}</span>
                              </div>
                         ))}
                    </div>
               </div>}

               {/* ===== Sidebar ===== */}
               <aside className={`fixed ${open.mobile ? `left-0` : `-left-full`} h-screen md:left-0 overflow-auto md:bottom-0 w-full md:w-72 border-r-2 gap-1 flex flex-col p-2 border-gray-300/10 duration-200 backdrop-blur-sm top-14 z-999`}>
                    <div className="mb-3">
                         <h2 className="text-xl text-gray-200 mb-2">Daftar Surah.</h2>
                         <Inputs onChange={handleChange} text={"Cari Surah..."} icon={"search"} iconStyle={`p-2 px-3 bg-gray-400/30`} />
                    </div>

                    <div onClick={() => setOpen(prev => ({ ...prev, qori: !open.qori }))} className="bg-green-500/30 mb-3 flex gap-2 justify-center text-green-300 px-3 py-1.5 rounded-full border-green-300/30 border-2 text-center cursor-pointer active:scale-95 duration-100">
                         <i className="bi bi-mic-fill"></i>
                         <span>{qori.name}</span>
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

               <main className="fixed top-14 right-0 overflow-scroll  border-0 w-full md:w-[calc(100%-18rem)] bg-gray-950/50 backdrop-blur-sm">
                    {/* ===== Place ===== */}
                    <div className="overflow-auto w-full h-screen p-2 md:p-4 pb-20 flex flex-col gap-3">
                         <Outlet context={{ qori }} />

                         {/* ===== Footer ===== */}
                         <footer className="text-sm md:text-lg text-center text-gray-400 bg-gray-950 backdrop-blur-md border-t-2 border-gray-300/30 p-5">
                              <span>© {new Date().getFullYear()} Mazumala. Semua hak dilindungi.</span>
                         </footer>
                    </div>
               </main>
          </>
     )
}