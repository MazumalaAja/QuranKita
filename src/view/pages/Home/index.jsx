// ===== Code =====
export default function HomePage() {
     // ===== Data For Card =====
     const data = [
          { icon: `bi bi-book`, title: `Baca Al-Quran`, text: `Teks Arab, transliterasi, dan terjemahan bahasa Indonesia` },
          { icon: `bi bi-soundwave`, title: `Audio Berkualitas`, text: `Teks Arab, transliterasi, dan terjemahan bahasa Indonesia` },
          { icon: `bi bi-lightbulb`, title: `Tafsir Lengkap`, text: `Memahami makna dengan tafsir yang mudah dipahami` },
          { icon: `bi bi-clock`, title: `Waktu Sholat yang Akurat`, text: `Mengintegrasi API waktu sholat yang tepat dan akurat` }
     ]

     return (
          <div className="w-full min-h-screen py-24 flex flex-col gap-4 justify-center items-center p-1">
               {/* ===== Label ===== */}
               <div className="bg-gray-600/10 backdrop-blur-md text-gray-300 rounded-full px-5 py-1 text-[0.7rem] sm:text-sm md:text-lg xl:text-xl border-2 border-gray-300/20 flex justify-center items-center">
                    <span className="block">Platform Baca Al-Qur'an Online</span>
               </div>

               {/* ===== Text ===== */}
               <div className="text-center w-full max-w-3xl  bg-gray-600/10 backdrop-blur-md p-5 rounded-lg border-2 border-gray-300/20 space-y-3">
                    <h1 className="text-2xl sm:text-3xl xl:text-4xl font-medium text-gray-200">Platform Baca Al-Qur'an Online</h1>
                    <p className="text-md sm:text-lg xl:text-xl text-gray-400">Baca, dengarkan, dan pelajari Al-Quran dengan terjemahan Indonesia, audio 6 qari terbaik, tafsir lengkap</p>
               </div>

               {/* ===== CTA ===== */}
               <div className="flex flex-col w-full items-center justify-center sm:flex-row gap-4">
                    <button className="text-gray-200 w-full md:w-max duration-200 active:scale-95 bg-gray-600/10 backdrop-blur-md border-2 border-gray-200/30 hover:text-gray-800 cursor-pointer text-sm sm:text-md md:text-xl flex justify-center items-center gap-2 hover:bg-gray-100 px-7 py-2 rounded-full">
                         <i className="bi bi-book text-xl md:text-2xl"></i>
                         <span>Ayo Mulai Baca!</span>
                    </button>
                    <button className="text-gray-200 w-full md:w-max duration-200 active:scale-95 bg-gray-600/10 backdrop-blur-md border-2 border-gray-200/30 hover:text-gray-800 cursor-pointer text-sm sm:text-md md:text-xl flex justify-center items-center gap-2 hover:bg-gray-100 px-7 py-2 rounded-full">
                         <i className="bi bi-clock text-xl md:text-2xl"></i>
                         <span>Lihat Waktu Sholat!</span>
                    </button>
               </div>

               {/* ===== Card ===== */}
               <div className="flex flex-wrap gap-3 max-w-full justify-center w-full">
                    {
                         data.map((v, i) => (
                              <div className="transition-all duration-300 w-full sm:w-100  hover:translate-y-[-3%]" key={i}>
                                   <div className="bg-gray-500/10 shadow-md  cursor-pointer space-y-2 backdrop-blur-sm w-full text-gray-100 text-center  p-3 border border-gray-200/20 rounded-lg">
                                        <i className={`${v.icon} block max-w-max mx-auto text-3xl md:text-4xl bg-gray-300/20 px-4 py-2 rounded-md`}></i>
                                        <h2 className="text-md md:text-xl font-medium">{v.title}</h2>
                                        <small className="text-gray-300/60">{v.text}</small>
                                   </div>
                              </div>
                         ))
                    }
               </div>
          </div>
     )
}