// import { useLoaderData } from "react-router-dom"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useDetailSurat, useSurat } from "../hooks"
import { AnimateOnScroll } from "../../libs/aos"
import { useEffect, useState } from "react"
import { AudioQuran } from "../components/audio"

export default function AlQuran() {
     const { nomor } = useParams()
     const [play, setPlay] = useState(false)

     const [surat, setSurat] = useState({
          namaLatin: "Al-Fatihah",
          tempatTurun: "Mekah",
          arti: "Pembukaan"
     })

     const [qori, setQori] = useState("https://cdn.equran.id/audio-full/Abdullah-Al-Juhany/001.mp3");
     const { data: suratList } = useSurat();
     const { data: suratDetail } = useDetailSurat(nomor)
     const navigate = useNavigate()
     const [open, setOpen] = useState({
          translate: false,
          qori: false,
     })

     const ustadz = [
          { id: "01", name: "Abdullah-Al-Juhany", url: "https://i.scdn.co/image/ab67616d0000b27341e4021e775036c61be46459" },
          { id: "02", name: "Abdul-Muhsin-Al-Qasim", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Abdul_Mohsin_Al-Qasim.jpg/640px-Abdul_Mohsin_Al-Qasim.jpg" },
          { id: "03", name: "Abdurrahman-as-Sudais", url: "https://assets.promediateknologi.id/crop/0x0:0x0/1200x800/webp/photo/2022/07/25/3092496303.jpg" },
          { id: "03", name: "Ibrahim-Al-Dossari", url: "https://i.scdn.co/image/ab67616d0000b273a467fa6dbfc5190f35b602fb" },
          { id: "05", name: "Misyari-Rasyid-Al-Afasi", url: "https://i.pinimg.com/564x/93/08/8b/93088be16e324b36b2d98a12748366a6.jpg" },
          { id: "06", name: "Yasser-Al-Dosari", url: "https://i1.sndcdn.com/artworks-yRdHunkzvtypsKvH-YmPLEA-t500x500.jpg" }
     ]


     function arabic(data) {
          return data.toLocaleString('ar-Eg')
     }

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
                                        <button onClick={() => {
                                             navigate(`/quran/${v.nomor}`)
                                             setQori(v.audioFull["01"])
                                             setSurat({ namaLatin: v.namaLatin, tempatTurun: v.tempatTurun, arti: v.arti })
                                        }} key={v.nomor} data-aos-duration={`${i + 1}00`} data-aos={`fade-up`} data-aos-anchor="#judul-daftar" className={` active:scale-95 text-start cursor-pointer hover:outline-1 hover:outline-indigo-400 duration-200 text-indigo-100 items-center flex justify-between  bg-gray-500/50 backdrop-blur-sm p-2 px-4 rounded-md`}>
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

               <main id="quran" className="fixed flex gap-3 flex-col items-end p-5 overflow-auto top-[8.4%]  right-0 bottom-0 w-[calc(100%-18rem)] bg-gray-950/80 backdrop-blur-sm">
                    <div className="flex gap-3">
                         <div onClick={() => setOpen(prev => ({ ...prev, translate: !open.translate }))} style={{ fontFamily: "Montserrat" }} className={`rounded-full items-center px-5 py-1 outline flex active:scale-95  gap-3  cursor-pointer ${open.translate ? `bg-green-600/10 text-green-300 duration-200  outline-green-300/30` : `bg-indigo-600/10 text-indigo-300 outline-indigo-300/30`}`}>
                              <i className={`bi bi-${open.translate ? `globe` : `globe2`}`}></i>
                              <span>Terjemah</span>
                         </div>
                         <div onClick={() => setOpen(prev => ({ ...prev, qori: !open.qori }))} style={{ fontFamily: "Montserrat" }} className={`rounded-full items-center px-5 py-1 outline flex active:scale-95  gap-3  cursor-pointer ${open.qori ? `bg-green-600/10 text-green-300 duration-200  outline-green-300/30` : `bg-indigo-600/10 text-indigo-300 outline-indigo-300/30`}`}>
                              <i className={`bi bi-${open.qori ? `mic-fill` : `mic`}`}></i>
                              <span>Qori</span>
                         </div>
                    </div>

                    <div>
                         <ul>
                              {ustadz.map((v, i) => (
                                   <li key={v.id}>
                                        <span>{v.name}</span>
                                   </li>
                              ))}
                         </ul>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-full mb-3">
                         <h1 style={{ fontFamily: "Montserrat" }} className="text-3xl text-indigo-100 font-medium text-start">Surat : {surat.namaLatin}</h1>
                         <div className="flex gap-3 items-center">
                              <span style={{ fontFamily: "Montserrat" }} className="text-indigo-300 bg-indigo-600/10 px-6 rounded-full py-1 outline-1 outline-indigo-300">Tempat turun : {surat.tempatTurun}</span><span style={{ fontFamily: "Montserrat" }} className="text-green-300 bg-green-600/10 px-6 rounded-full py-1 outline-1 outline-green-300">Arti Surat : {surat.arti}</span>
                         </div>
                    </div>

                    {/* ==== Audio ini ===== */}
                    <AudioQuran source={qori} />
                    {
                         suratDetail?.ayat.map((v, i) => (
                              <div className="text-indigo-100 backdrop-blur-sm w-full rounded-md text-end p-3 bg-gray-700/50" key={i}>
                                   <div className="text-3xl p-5 leading-loose flex gap-2 ring-1 ring-indigo-300/20 rounded-md">
                                        <span className=" flex flex-1 self-start">{arabic(v.nomorAyat)}</span>
                                        <div className="flex flex-col gap-5 duration-200">
                                             <span className="flex-4">{v.teksArab}</span>
                                             <small style={{ fontFamily: "Montserrat" }} className="bg-green-600/10 text-green-300 px-4 rounded-md outline outline-green-300/50 text-[0.9rem]">{v.teksLatin}</small>

                                             {open.translate && <small style={{ fontFamily: "Montserrat" }} className="bg-indigo-600/10 text-indigo-300 py-1.5 px-4 rounded-md text-start outline outline-green-300/50 text-base">{v.teksIndonesia}</small>}

                                        </div>
                                   </div>

                              </div>
                         ))
                    }
               </main >
          </>
     )
}