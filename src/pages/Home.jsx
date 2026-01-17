import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navigations";

export default function Home() {
     const navigate = useNavigate();
     // ===== Data Untuk perulangan =====
     const data = [
          { icon: `bi bi-book`, title: `Baca Al-Quran`, text: `Teks Arab, transliterasi, dan terjemahan bahasa Indonesia` },
          { icon: `bi bi-soundwave`, title: `Audio Berkualitas`, text: `Teks Arab, transliterasi, dan terjemahan bahasa Indonesia` },
          { icon: `bi bi-lightbulb`, title: `Tafsir Lengkap`, text: `Memahami makna dengan tafsir yang mudah dipahami` },
          { icon: `bi bi-clock`, title: `Waktu Sholat yang Akurat`, text: `Mengintegrasi API waktu sholat yang tepat dan akurat` }
     ]
     return (
          <>
               {/* ===== Navbar ===== */}
               <Navbar />

               {/* ===== First Section ===== */}
               <section className="p-1 py-24 flex flex-col gap-8 justify-center items-center min-h-screen w-full mb-3">

                    {/* ===== Title ===== */}
                    <span data-aos="fade-right" data-aos-duration="500" className="text-[0.7rem] md:text-md lg:text-lg xl:text-xl rounded-full border border-indigo-200/20 backdrop-blur-sm bg-indigo-400/10 px-5 md:px-10 py-1.5 text-indigo-50">Al-Qur'an Digital Anak Bangsa</span>
                    <div data-aos="fade-left" data-aos-duration="500" className="max-w-4xl space-y-3">
                         <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-center font-semibold text-indigo-100">Platform Baca Al-Qur'an Online</h1>
                         <p className="text-[0.7rem] sm:text-sm md:text-md lg:text-xl text-gray-200/80  text-center">Baca, dengarkan, dan pelajari Al-Quran dengan terjemahan Indonesia, audio 6 qari terbaik, tafsir lengkap</p>
                    </div>

                    {/* ===== Tombol CTA ===== */}
                    <div data-aos-duration="600" data-aos="fade-up" className="">
                         <button onClick={() => navigate("quran/1")} className="bg-indigo-500/10 shadow-md border active:scale-90 border-indigo-200/20 md:text-md lg:text-xl text-indigo-50 backdrop-blur-sm px-8 md:px-10 cursor-pointer hover:bg-indigo-200 hover:text-gray-700 py-2 md:py-3 hover:scale-95 rounded-full flex justify-center items-center gap-3 transition-all duration-300">
                              <i className="bi bi-journal"></i>
                              <span className="">Ayo Mulai!</span>
                         </button>
                    </div>

                    {/* ===== Card ===== */}
                    <div className="flex flex-wrap gap-3 max-w-full justify-center">
                         {
                              data.map((v, i) => (
                                   <div className="transition-all duration-300  hover:translate-y-[-3%]" key={i}>
                                        <div data-aos-duration={`${i + 6}00`} data-aos="fade-up" className="bg-indigo-500/10 shadow-md  cursor-pointer space-y-2 backdrop-blur-sm w-full text-indigo-100 text-center max-w-[20rem] p-3 border border-indigo-200/20 rounded-lg">
                                             <i className={`${v.icon} block max-w-max mx-auto text-3xl md:text-4xl bg-indigo-300/20 px-4 py-2 rounded-md`}></i>
                                             <h2 className="text-md md:text-xl font-medium">{v.title}</h2>
                                             <small className="text-gray-300/60">{v.text}</small>
                                        </div>
                                   </div>
                              ))
                         }
                    </div>
               </section>

               <Footer />
          </>
     )
}