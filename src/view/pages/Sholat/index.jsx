// ===== Imports =====
import { useEffect, useState } from "react";
import Navbar from "../../components/navigations";
import { post } from "../../../services/api";
import Selects from "../../components/select"
import Loading from "../../components/loader"
import { getProvinsi } from "../../../services/cache";

// ===== Navigation data =====
const navigation = [
     { label: "Al-Quran", icon: "journal", to: "/al-quran" },
     { label: "Waktu Sholat", icon: "clock", to: "/waktu-sholat" },
];

// ===== Code =====
export default function SholatPage() {
     // ===== Master Data =====
     const [masterProvinsi, setMasterProvinsi] = useState([]);
     const [masterKabkota, setMasterKabkota] = useState([]);
     const [masterShlat, setMasterShalat] = useState([]);

     // ===== Filter Data =====
     const [listProvinsi, setListProvinsi] = useState(masterProvinsi || [])
     const [listKabkota, setListKabkota] = useState(masterKabkota || [])

     // ===== Bulan =====
     const bulan = [];
     for (let i = 0; i <= 11; i++) {
          bulan.push(formatMonth(i))
     }

     // ===== user Pick =====
     const [pick, setPick] = useState({
          provinsi: "",
          kabkota: "",
          bulan: new Date().getMonth(),
          tahun: new Date().getFullYear(),
     })


     // ===== Loading =====
     const [open, setOpen] = useState(false);

     // ===== HandleClick =====
     function HandleClickProvinsi(value) {
          setPick(prev => ({ ...prev, provinsi: value.value }));
     }

     function HandleClickKabkota(value) {
          setPick(prev => ({ ...prev, kabkota: value.value }));
     }

     function HandleClickBulan(value) {
          setPick(prev => ({ ...prev, bulan: value.index }));
     }

     // ===== HandleChange =====
     function HandleChange(value) {
          if (value && value.trim()) {
               const filtered = masterProvinsi.filter(v => v.toLowerCase().includes(value.toLowerCase()));
               setListProvinsi(filtered.length > 0 ? filtered : ["Tidak Tersedia"]);
          } else {
               setListProvinsi(masterProvinsi);
          }
     }

     function HandleChange2(value) {
          if (value && value.trim()) {
               const filtered = masterKabkota.filter(v => v.toLowerCase().includes(value.toLowerCase()));
               setListKabkota(filtered.length > 0 ? filtered : ["Tidak Tersedia"]);
          } else {
               setListKabkota(masterKabkota);
          }
     }

     // ===== GetProvinsi API =====
     async function getProvinsiApi() {
          try {
               setOpen(true)
               const response = await getProvinsi("shalat/provinsi");
               setMasterProvinsi(response.data);
          } catch (err) {
               console.error(err);
          } finally {
               setOpen(false)
          }
     }

     // ===== GetKabKota API =====
     async function getKabKota() {
          if (!navigator.onLine) throw new Error("Anda sedang Offline")
          try {
               const response = await post("shalat/kabkota", { provinsi: pick.provinsi });
               setMasterKabkota(response.data);
               setListKabkota(response.data)
          } catch (err) {
               console.error(err);
          }
     }

     // ==== Get Waktu Shalat API ====
     async function getShalat() {
          if (!navigator.onLine) throw new Error("Anda sedang Offline")
          try {
               setOpen(true)
               const response = await post("shalat", {
                    provinsi: pick.provinsi,
                    kabkota: pick.kabkota,
                    bulan: pick.bulan + 1,
                    tahun: pick.tahun,
               });
               setMasterShalat(response.data.jadwal);
          } catch (err) {
               console.error(err);
          } finally {
               setOpen(false)
          }
     }

     // ===== format Bulan dan Hari =====
     function formatMonth(params) {
          const data = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
          return `${data[params]}`
     }

     function formatDay(params) {
          const data = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
          return `${data[params]}`
     }

     useEffect(() => {
          if (pick.provinsi != "") {
               getKabKota()
          }
     }, [pick.provinsi]);

     useEffect(() => {
          if (pick.kabkota != "") {
               getShalat()
          }
     }, [pick.kabkota, pick.bulan]);

     useEffect(() => {
          getProvinsiApi();
     }, []);

     useEffect(() => {
          setListProvinsi(masterProvinsi);
     }, [masterProvinsi]);
     return (
          <>

               {/* ===== Navbar ===== */}
               <Navbar data={navigation} />

               {/* ===== Loading ===== */}
               {open && <Loading />}

               {/* ===== Main ===== */}
               <main className="min-h-screen md:py-14 p-1 md:p-3 bg-gray-950/30">
                    {/* ===== Title ===== */}
                    <div className="mb-5 space-y-3 max-w-5xl mx-auto text-center mt-20">
                         <div className="flex justify-center gap-3 text-2xl md:text-4xl items-center">
                              <i className="bi bi-clock text-green-400"></i>
                              <h1 className="text-green-400">Jadwal Sholat.</h1>
                         </div>

                         <div className="space-y-3">
                              <p className="text-gray-400 text-sm md:text-base">Lihat jadwal shalat harian untuk wilayah Anda. Pilih provinsi, kabupaten/kota, dan bulan untuk melihat jadwal lengkap.</p>
                         </div>
                    </div>

                    {/* ===== Selects ===== */}
                    <div className="flex flex-wrap gap-2 justify-center mb-5">
                         {/* ===== Provinsi ===== */}
                         <Selects defaultValuex={true} icon={`map`} isReady={listProvinsi ? listProvinsi.length > 0 : false} value={pick.provinsi} onChange={HandleChange} onCLick={HandleClickProvinsi} data={listProvinsi} title={`Provinsi`} />

                         {/* ===== KabKota ===== */}
                         <Selects defaultValuex={true} icon={`map`} title={`Kabupaten & Kota`} isReady={listKabkota ? listKabkota.length > 0 : false} value={pick.kabkota} data={listKabkota} onCLick={HandleClickKabkota} onChange={HandleChange2} />

                         {/* ===== Bulan ===== */}
                         <Selects icon={`clock`} title={`Bulan`} isReady={true} value={bulan[pick.bulan]} data={bulan} onCLick={HandleClickBulan} />
                    </div>

                    {/* ===== Title ===== */}
                    {masterShlat.length > 0 && (pick.bulan) == new Date().getMonth() &&
                         <>
                              <div className="mb-3 max-w-5xl space-y-3 mx-auto flex flex-col justify-center">
                                   <div className="flex justify-center items-center gap-3">
                                        <i className="bi bi-calendar text-gray-300 text-md md:text-2xl"></i>
                                        <h2 className="text-green-400 text-center text-lg md:text-2xl">Jadwal sholat hari ini</h2>
                                   </div>
                                   <div className="space-x-2 mx-auto">
                                        <span className="bg-indigo-600/10 text-center text-indigo-200 border-indigo-300/10 px-3 py-0.5 rounded-full border">{formatDay(new Date().getDay())} {new Date().getDay()} {formatMonth(new Date().getMonth())} {new Date().getFullYear()}</span>
                                   </div>
                              </div>

                              <div className="bg-gray-950/50 backdrop-blur-md flex flex-wrap gap-3 max-w-5xl mx-auto p-3 mb-3 rounded-md">
                                   <div className="bg-amber-400/10 flex-1 flex flex-col gap-1 p-1 px-3 rounded-md items-center">
                                        <small className="text-amber-50">Imsak</small>
                                        <span className="text-amber-300 font-semibold text-xl md:text-2xl">{masterShlat[new Date().getDay()].imsak}</span>
                                   </div>
                                   <div className="bg-indigo-400/10 flex-1 flex flex-col gap-1 p-1 px-3 rounded-md items-center">
                                        <small className="text-indigo-50">Subuh</small>
                                        <span className="text-indigo-300 font-semibold text-xl md:text-2xl">{masterShlat[new Date().getDay()].subuh}</span>
                                   </div>
                                   <div className="bg-gray-400/10 flex-1 flex flex-col gap-1 p-1 px-3 rounded-md items-center">
                                        <small className="text-gray-50">Dzuhur</small>
                                        <span className="text-gray-300 font-semibold text-xl md:text-2xl">{masterShlat[new Date().getDay()].dzuhur}</span>
                                   </div>
                                   <div className="bg-orange-400/10 flex-1 flex flex-col gap-1 p-1 px-3 rounded-md items-center">
                                        <small className="text-orange-50">Ashar</small>
                                        <span className="text-orange-300 font-semibold text-xl md:text-2xl">{masterShlat[new Date().getDay()].ashar}</span>
                                   </div>
                                   <div className="bg-green-400/10 flex-1 flex flex-col gap-1 p-1 px-3 rounded-md items-center">
                                        <small className="text-green-50">Maghrib</small>
                                        <span className="text-green-300 font-semibold text-xl md:text-2xl">{masterShlat[new Date().getDay()].maghrib}</span>
                                   </div>
                                   <div className="bg-indigo-600/10 flex-1 flex flex-col gap-1 p-1 px-3 rounded-md items-center">
                                        <small className="text-indigo-50">Isya</small>
                                        <span className="text-indigo-300 font-semibold text-xl md:text-2xl">{masterShlat[new Date().getDay()].isya}</span>
                                   </div>
                              </div>
                         </>
                    }




                    {/* ===== Title ===== */}
                    {masterShlat.length > 0 && <div className="mb-3 text-sm md:text-base">
                         <h2 className="text-gray-400 text-center">Berikut merupakan jadwal sholat bulan <span className="text-indigo-400 font-semibold">{formatMonth(pick.bulan)}</span> di <span className="text-green-400 font-semibold">{pick.kabkota}</span> selama 1 bulan</h2>
                    </div>}


                    {/* ===== list Jadwal ===== */}
                    {masterShlat.length > 0 ?
                         <>
                              {/* ===== Jadwal 1 Bulan ===== */}
                              <div className="bg-gray-950/70 backdrop-blur-md p-3 overflow-auto rounded-md max-w-5xl mx-auto max-h-96">
                                   <table id="table-sholat" className="w-full h-full  text-center border-collapse">
                                        <thead>
                                             <tr className="text-gray-400">
                                                  <th>Tanggal</th>
                                                  <th>Hari</th>
                                                  <th>Imsak</th>
                                                  <th>Subuh</th>
                                                  <th>Dzuhur</th>
                                                  <th>Ashar</th>
                                                  <th>Maghrib</th>
                                                  <th>Isya</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {
                                                  masterShlat.map((v, i) => (
                                                       <tr key={i}>
                                                            <td className="text-indigo-400">{v.tanggal}</td>
                                                            <td className="text-indigo-400">{v.hari}</td>
                                                            <td className="text-amber-300">{v.imsak}</td>
                                                            <td className="text-amber-100">{v.subuh}</td>
                                                            <td className="text-gray-100">{v.dzuhur}</td>
                                                            <td className="text-green-300">{v.ashar}</td>
                                                            <td className="text-green-400">{v.maghrib}</td>
                                                            <td className="text-indigo-400">{v.isya}</td>
                                                       </tr>
                                                  ))}
                                        </tbody>
                                   </table>
                              </div>
                         </>
                         :
                         <div className="border-3 max-w-5xl mx-auto border-gray-400/50 border-dashed p-5 rounded-lg flex flex-col justify-center bg-gray-900/10 backdrop-blur-md gap-1">
                              <i className="bi bi-geo-alt text-center text-gray-400 text-3xl"></i>
                              <h1 className="text-2xl font-medium text-gray-400 text-center ">Silahkan Pilih Lokasi Anda.</h1>
                              <p className="text-center text-gray-500">Pilih provinsi , kota maupun kabupaten  untuk melihat jadwal sholat bulanan.</p>
                         </div>}
               </main>

               {/* ===== Footer ===== */}
               <footer className="text-sm md:text-lg text-center text-gray-400 bg-gray-950 backdrop-blur-md border-t-2 border-gray-300/30 p-5">
                    <span>© {new Date().getFullYear()} Mazumala. Semua hak dilindungi.</span>
               </footer>
          </>
     );
}
