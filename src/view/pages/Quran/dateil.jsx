import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"
import Toggle from "../../components/toggle";

export default function DetailPage() {
     // ===== Open =====
     const [open, setOpen] = useState({
          translate: true,
          audio: false,
          teksLatin: true,
          description: false
     })

     // ===== Data loader =====
     const data = useLoaderData();

     // ===== Data Surah =====
     const [dataSurah, setDataSurah] = useState(data)

     // ===== To Arabic =====
     function Arabic(data) {
          return data.toLocaleString("ar-EG")
     }

     useEffect(() => {
          setDataSurah(data)
     }, [data])
     return (
          <>
               <div className=" flex gap-3">
                    <Toggle onclick={() => setOpen(prev => ({ ...prev, translate: !prev.translate }))} open={open.translate} icon={"translate"} />
                    <Toggle onclick={() => setOpen(prev => ({ ...prev, audio: !prev.audio }))} open={open.audio} icon={"soundwave"} />
                    <Toggle onclick={() => setOpen(prev => ({ ...prev, teksLatin: !prev.teksLatin }))} open={open.teksLatin} icon={"fonts"} />
                    <Toggle onclick={() => setOpen(prev => ({ ...prev, description: !prev.description }))} open={open.description} icon={"journal-text"} />
               </div>
               <div style={{ fontFamily: "Poppins" }} className="text-center flex flex-col gap-4 text-gray-200 text-xl">
                    <div className="flex flex-col gap-1">
                         <h1 className="text-3xl text-green-400">Surah : {data.namaLatin}</h1>
                         <h2 className="text-base italic text-gray-300">({data.arti})</h2>
                    </div>
                    {open.description && <small dangerouslySetInnerHTML={{ __html: dataSurah.deskripsi }}
                         className="text-start text-sm text-indigo-200 p-3 rounded-md bg-indigo-600/10 font-light"></small>}
               </div>
               {
                    dataSurah.ayat.map((v, i) => (
                         <div key={i} className="bg-gray-700/30 gap-7 backdrop-blur-sm p-6 rounded-md text-gray-200 flex flex-col">
                              <div className="flex justify-center gap-4">
                                   <span className="teks-arab text-end text-indigo-300 text-3xl">{Arabic(v.nomorAyat)}</span>
                                   <span className="flex-1 teks-arab leading-16 text-end text-3xl">{v.teksArab}</span>
                              </div>
                              <div className="bg-green-600/10 flex border rounded-md border-green-400/30 flex-col gap-1 p-4 text-green-300">
                                   {open.teksLatin && <small className="text-indigo-100 p-2 rounded-sm bg-indigo-600/10">{v.teksLatin}</small>}
                                   {open.translate && <span > {v.teksIndonesia}</span>}
                              </div>
                         </div >
                    ))
               }
          </>
     )
}