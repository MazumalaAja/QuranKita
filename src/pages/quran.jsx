// import { useLoaderData } from "react-router-dom"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useDetailSurat, useSurat } from "../hooks"
import Links from "../components/navigations/navLink"
import { AnimateOnScroll } from "../../libs/aos"

export default function AlQuran() {
     const { nomor } = useParams()
     const { data: suratList } = useSurat()
     const { data: suratDetail } = useDetailSurat(nomor)
     const navigate = useNavigate()
     // const data = useLoaderData()
     return (
          <>
               <header className="fixed flex items-center px-3 z-99999 min-h-1/12 border-b-2 bg-gray-900/30 backdrop-blur-sm border-indigo-200/30 top-0 right-0 w-[calc(100%-18rem)]">
                    <NavLink className={({ isActive }) => `${isActive ? `text-indigo-100 bg-indigo-300/30 rounded-full border border-indigo-100/50` : ``} duration-200 hover:text-indigo-100 text-gray-400 py-1 px-5 inline-flex`} to={"/quran"}>
                         <span>Al Qur'an</span>
                    </NavLink>
               </header>

               <AnimateOnScroll data={suratList}>
                    <aside className="fixed top-0 left-0 border-e-2 border-indigo-200/30  bottom-0 overflow-auto w-72 p-3 bg-gray-900/30 backdrop-blur-sm">
                         <nav className="flex flex-col gap-2">
                              <div>
                                   <h2 id="judul-daftar" className="text-xl text-indigo-100 font-medium">Daftar Surat.</h2>
                              </div>
                              {
                                   suratList?.map((v, i) => (
                                        <button onClick={() => navigate(`/quran/${v.nomor}`)} key={v.nomor} data-aos-duration={`${i + 1}00`} data-aos={`fade-up`} data-aos-anchor="#judul-daftar" className={` active:scale-95 text-start cursor-pointer hover:outline-1 hover:outline-indigo-400 duration-200 text-indigo-100 items-center flex justify-between  bg-gray-500/50 backdrop-blur-sm p-2 px-4 rounded-md`}>
                                             <div>
                                                  <span>{v.nomor}</span>
                                             </div>

                                             <div className="flex flex-col">
                                                  <span>{v.namaLatin}</span>
                                                  <small className="text-indigo-300">Jumlah Ayat : {v.jumlahAyat}</small>
                                             </div>

                                             <div>
                                                  <i className="bi bi-book"></i>
                                             </div>
                                        </button>
                                   ))
                              }
                         </nav>
                    </aside>
               </AnimateOnScroll>

               <main className="fixed flex gap-3 flex-col items-end p-3 overflow-auto top-[8.4%]  right-0 bottom-0 w-[calc(100%-18rem)] bg-gray-950/80 backdrop-blur-sm">
                    {
                         suratDetail?.ayat.map((v, i) => (
                              <div className="text-indigo-50 w-full rounded-md text-end p-3 bg-gray-700/50" key={v.nomor}>
                                   <div className="text-2xl">{v.teksArab}</div>
                              </div>
                         ))
                    }
               </main>
          </>
     )
}