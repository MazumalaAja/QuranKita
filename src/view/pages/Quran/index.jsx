import { useEffect, useState } from "react"
import { get } from "../../../services/api";
import Navbar from "../../components/navigations";

// ===== Code =====
export default function QuranPage() {
     const [data, setData] = useState([]);

     // ===== Get Surah with  cache function =====
     async function getSurah() {
          try {
               const cacheSurat = JSON.parse(localStorage.getItem("surat"));
               if (cacheSurat) {
                    if (cacheSurat.expireAt > Date.now()) {
                         console.log("cache surat masih ada");
                         setData(cacheSurat.data);
                         return
                    } else {
                         console.log("cache sudah espired");
                         const response = await get("surat");
                         localStorage.setItem("surat", JSON.stringify({
                              data: response.data,
                              expireAt: Date.now() + (1000 * 60 * 1)
                         }));
                         setData(response.data)
                    }
               } else {
                    console.log("Initial fetcing");
                    const response = await get("surat");
                    localStorage.setItem("surat", JSON.stringify({
                         data: response.data,
                         expireAt: Date.now() + (1000 * 60 * 1)
                    }));
                    setData(response.data)
               }
          } catch (err) {
               console.log(err);
          }
     }

     // ===== Navigation data =====
     const navigation = [
          { label: "Al-Quran", icon: "journal", to: "/al-quran" },
          { label: "Waktu Sholat", icon: "time", to: "/waktu-sholat" },
     ]

     useEffect(() => {
          // localStorage.clear();
          getSurah()
     }, [])
     return (
          <>
               {/* ===== Navigation ===== */}
               <Navbar data={navigation} />

               {/* ===== Sidebar ===== */}
               <aside className="fixed left-0 overflow-scroll bottom-0 w-72 border-r-2 gap-1 flex flex-col p-2 border-gray-300/10 backdrop-blur-sm top-14 z-999">
                    {
                         data.map((v, i) => (
                              <button className="bg-gray-400/30 backdrop-blur-md  text-lg text-gray-300 cursor-pointer flex justify-between items-center rounded-sm p-2 text-start" key={i}>
                                   <small>{v.nomor}</small>
                                   <span>{v.namaLatin}</span>
                                   <i className="bi bi-book text-xl"></i>
                              </button>
                         ))
                    }
               </aside>

               <main className="fixed top-14 right-0 border-0 min-h-screen w-[calc(100%-18rem)] bg-gray-950/50 backdrop-blur-sm">

                    {/* ===== Footer ===== */}
                    <footer className="text-sm md:text-lg text-center text-gray-400 bg-gray-600/10 backdrop-blur-md border-t-2 border-gray-300/30 p-5">
                         <span>© {new Date().getFullYear()} Mazumala. Semua hak dilindungi.</span>
                    </footer>
               </main>
          </>
     )
}