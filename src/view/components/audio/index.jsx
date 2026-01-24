// ===== Imports ===== 
import { useRef, useState } from "react"

// ===== Code =====
export default function Audios({ src }) {
     // ===== Ref =====
     const refrences = useRef(null);

     // ===== Play =====
     const [play, setPlay] = useState(false);

     // ===== Duration & Current Time =====
     const [current, setCurrent] = useState(0);
     const [duration, setDuration] = useState(0);

     // ===== play & Pause Audio =====
     function handlePlay() {
          if (refrences.current.paused) {
               setPlay(true);
               refrences.current.play()
          } else {
               setPlay(false)
               refrences.current.pause()
          }
     }

     // ===== Handle Duration =====
     function handleDuration() {
          setDuration(refrences.current.duration);
     }

     // ===== Handle Current =====
     function handleCurrent() {
          setCurrent(refrences.current.currentTime);
     }

     // ===== HandleChange =====
     function handleChange(e) {
          refrences.current.currentTime = e.target.value;
     }

     // ===== HandleEnded =====
     function handleEnded() {
          setPlay(false);
          setCurrent(0)
     }

     // ===== Format Time ===== 
     function formatTime(data) {
          const time = Math.floor(data);
          const minutes = Math.floor(time / 60);
          const second = Math.floor(time % 60);
          return `${String(minutes).padStart(2, "0")}:${String(second).padStart(2, "0")}`
     }
     return (
          <div>
               {/* ===== Audio Tag ===== */}
               <audio
                    ref={refrences}
                    src={src}
                    onEnded={handleEnded}
                    onLoadedMetadata={handleDuration}
                    onTimeUpdate={handleCurrent}
               ></audio>

               {/* ===== Audio ===== */}
               <div className="flex bg-gray-700/30 border-2 border-gray-400/10 w-full  max-w-3xl p-3  px-5 rounded-md items-center gap-3">
                    <div className="">
                         {/* ===== Btn ===== */}
                         <button onClick={handlePlay} className="bg-gray-900 cursor-pointer active:scale-95 duration-100 py-1 text-gray-200 px-2 rounded-full">
                              <i className={`bi bi-${play ? `pause-fill` : `play-fill`} text-2xl`}></i>
                         </button>
                    </div>

                    <div className="flex flex-1 flex-col">
                         {/* ===== Bar ===== */}
                         <div>
                              <input onChange={handleChange} value={current} min={0} max={duration} className="w-full" type="range" />
                         </div>

                         {/* ===== Time ===== */}
                         <div style={{ fontFamily: "poppins" }} className="text-sm text-gray-200">
                              <small>{formatTime(current)}</small>
                              <small>/</small>
                              <small>{formatTime(duration)}</small>
                         </div>
                    </div>
               </div>
          </div >
     )
}