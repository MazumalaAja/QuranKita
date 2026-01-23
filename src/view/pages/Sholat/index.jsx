// ===== Imports =====
import Navbar from "../../components/navigations";

// ===== Navigation data =====
const navigation = [
     { label: "Al-Quran", icon: "journal", to: "/al-quran" },
     { label: "Waktu Sholat", icon: "time", to: "/waktu-sholat" },
]

// ===== Code =====
export default function SholatPage() {
     return (
          <>
               {/* ===== Navbar ===== */}
               <Navbar data={navigation} />
          </>
     )
}