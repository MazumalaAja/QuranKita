import { useEffect, useRef, useState } from "react"

export function AudioQuran({ source }) {
     const reference = useRef(null);
     const [current, setCurrent] = useState(0);
     const [duration, setDuration] = useState(0)
     const [play, setPlay] = useState(false)
     const [ready, setReady] = useState(false);

     // Reset state setiap kali source/URL audio berubah
     useEffect(() => {
          setReady(false);
          setPlay(false);
          setCurrent(0);

          if (reference.current) {
               reference.current.pause();
               reference.current.load(); // Paksa browser muat ulang source baru
          }
     }, [source]); // Hanya jalan saat source berubah

     async function handlePlay() {
          if (!reference.current || !ready) return;

          try {
               if (play) {
                    reference.current.pause();
                    setPlay(false);
               } else {
                    // Pakai await karena play() mengembalikan promise
                    await reference.current.play();
                    setPlay(true);
               }
          } catch (err) {
               console.error("Gagal memutar audio:", err);
          }
     }

     function handleMetaData() {
          if (reference.current) {
               setDuration(reference.current.duration);
          }
     }

     // Fungsi ini dipicu otomatis oleh tag <audio> setiap detik saat jalan
     function handleTimeUpdate() {
          if (reference.current) {
               setCurrent(reference.current.currentTime);

               // Cek jika sudah selesai
               if (reference.current.currentTime >= reference.current.duration) {
                    setPlay(false);
                    setCurrent(0);
               }
          }
     }

     function handleChange(e) {
          if (reference.current) {
               const time = Number(e.target.value);
               reference.current.currentTime = time;
               setCurrent(time);
          }
     }

     function formatTime(data) {
          const time = Number(data) || 0;
          const minutes = Math.floor(time / 60);
          const second = Math.floor(time % 60);
          return `${String(minutes).padStart(2, '0')}:${String(second).padStart(2, '0')}`
     }

     return (
          <div className={`flex self-start gap-3 w-full max-w-2xl bg-indigo-800/10 outline outline-indigo-300 px-5 rounded-md py-2 transition-all ${!ready ? "opacity-50" : "opacity-100"}`}>

               {/* Button Play/Pause: Disabled jika belum ready */}
               <button
                    className="audio-btn disabled:cursor-wait"
                    onClick={handlePlay}
                    disabled={!ready}
               >
                    {ready ? (
                         <i className={`bi bi-${play ? "pause" : "play"}`} ></i>
                    ) : (
                         <i className="bi bi-arrow-repeat text-indigo-400"></i>
                    )}
               </button>

               <div className="flex-1">
                    <input
                         onChange={handleChange}
                         type="range"
                         min={0}
                         value={current || 0}
                         max={duration || 0}
                         disabled={!ready}
                         className="w-full cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div style={{ fontFamily: "Montserrat" }} className="text-indigo-100 text-[0.75rem] flex gap-1">
                         <h3>{formatTime(current)}</h3>
                         <div>/</div>
                         <h3>{formatTime(duration)}</h3>
                    </div>
               </div>

               <audio
                    ref={reference}
                    src={source}
                    onLoadedMetadata={handleMetaData}
                    onTimeUpdate={handleTimeUpdate}
                    onCanPlay={() => setReady(true)} // Tombol baru bisa diklik setelah ini terpicu
                    onWaiting={() => setReady(false)} // Kunci tombol jika tiba-tiba buffering
               ></audio>
          </div>
     )
}