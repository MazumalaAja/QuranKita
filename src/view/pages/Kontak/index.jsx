// ===== Imports =====
import { useEffect, useState } from "react";
import Inputs from "../../components/inputs";
import Navbar from "../../components/navigations";

// ===== Code =====
export default function KontakPage() {
     // ===== BioData ======
     const [bioData, setBioData] = useState({
          name: "",
          nomor: "",
          email: "",
          pesan: ""
     })

     // ===== Handle Submit =====
     function handleSubmit(e) {
          e.preventDefault();
          const nomorHP = "6283194086388"; // Gunakan kode negara, tanpa tanda '+'
          const pesan = encodeURIComponent(`Halo saya :\nNama: ${bioData.name} \nnomor:${bioData.nomor} \nEmail:${bioData.email} \nPesan: ${bioData.pesan}`);
          const url = `https://wa.me/${nomorHP}?text=${pesan}`;
          setBioData({ name: "", nomor: "", email: "", pesan: "" })
          window.open(url, '_blank');
     }

     // ===== Navigation data =====
     const navigation = [
          { label: "Home", icon: "house", to: "/" },
          { label: "Kontak Saya", icon: "telephone", to: "/kontak" },
     ]
     return (
          <>
               <div className="w-full flex-col py-24 p-1 gap-4 flex justify-center items-center min-h-screen bg-main">
                    {/* ===== Navbar ===== */}
                    <Navbar data={navigation} />

                    {/* ===== Social Media ===== */}
                    <div className="flex gap-3 flex-wrap justify-center items-center">
                         <div className="backdrop-blur-md bg-green-600/20 flex gap-2 items-center text-green-300   px-4 py-1 text-sm md:text-base rounded-full border border-green-300/50">
                              <i className="bi bi-whatsapp"></i>
                              <span>+62-831-9408-6388</span>
                         </div>
                         <div className="backdrop-blur-md bg-orange-600/20 flex gap-2 items-center text-orange-300   px-4 py-1 text-sm md:text-base rounded-full border border-orange-300/50">
                              <i className="bi bi-instagram"></i>
                              <span>Mazumalaa</span>
                         </div>
                         <div className="backdrop-blur-md bg-red-600/20 flex gap-2 items-center text-red-300   px-4 py-1 text-sm md:text-base rounded-full border border-red-300/50">
                              <i className="bi bi-envelope-at"></i>
                              <span>programlia1108@gmail.com</span>
                         </div>
                         <div className="backdrop-blur-md bg-neutral-600/20 flex gap-2 items-center text-neutral-300   px-4 py-1 text-sm md:text-base rounded-full border border-neutral-300/50">
                              <i className="bi bi-github"></i>
                              <span>MazumalaAja</span>
                         </div>
                         <div className="backdrop-blur-md bg-indigo-600/20 flex gap-2 items-center text-indigo-300   px-4 py-1 text-sm md:text-base rounded-full border border-indigo-300/50">
                              <i className="bi bi-linkedin"></i>
                              <span>mazumala</span>
                         </div>
                    </div>

                    {/* ===== Form ====== */}
                    <form onSubmit={handleSubmit} action="" className="bg-gray-950/40 w-full max-w-3xl p-3 md:p-5 backdrop-blur-md border-2 border-gray-400/20 rounded-xl flex gap-3 flex-col">
                         {/* ===== Title ===== */}
                         <div className="text-center mb-3">
                              <h2 className="text-2xl md:text-3xl font-medium text-gray-300">Form Kontak</h2>
                              <span className="text-sm md:text-base text-gray-400">Silahkan isi form untuk menghubungi saya.</span>
                         </div>

                         {/* ===== Inputs ===== */}
                         <Inputs value={bioData.name} onChange={(e) => setBioData(prev => ({ ...prev, name: e.target.value }))} type={"text"} icon={"person"} text={"Masukkan nama anda..."} />
                         <Inputs value={bioData.nomor} onChange={(e) => setBioData(prev => ({ ...prev, nomor: e.target.value }))} type={"number"} icon={"phone"} text={"Masukkan nomor anda..."} />
                         <Inputs value={bioData.email} onChange={(e) => setBioData(prev => ({ ...prev, email: e.target.value }))} type={"email"} icon={"envelope"} text={"Masukkan Email anda..."} />
                         <textarea value={bioData.pesan} onChange={(e) => setBioData(prev => ({ ...prev, pesan: e.target.value }))} className="text-gray-200 h-40 focus:outline-0 resize-none rounded-md p-3 border-2 border-gray-500/50" placeholder="Pesan..."></textarea>

                         {/* ===== Btn ===== */}
                         <div className="flex flex-col md:flex-row gap-3">
                              <button className="flex-1 flex active:scale-95 duration-200 cursor-pointer gap-3 px-5 py-1.5 bg-green-600/20 text-green-300 rounded-full justify-center border-green-300/10 border-2">
                                   <span>Whatsapp</span>
                                   <i className="bi bi-whatsapp"></i>
                              </button>
                         </div>
                    </form>
               </div>

               {/* ====== Footer ====== */}
               <footer className="text-sm md:text-lg text-center text-gray-400 bg-gray-950 backdrop-blur-md border-t-2 border-gray-300/30 p-5">
                    <span>© {new Date().getFullYear()} Mazumala. Semua hak dilindungi.</span>
               </footer>
          </>
     )
}