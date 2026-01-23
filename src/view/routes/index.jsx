// ===== Imports =====
import { createBrowserRouter } from "react-router-dom";
import LayoutPage from "../components/layouts";
import { HomePage, KontakPage, QuranPage, SholatPage } from "../pages";

// ===== Code =====
const router = createBrowserRouter([
     {
          path: "/",
          element: <LayoutPage />,
          children: [
               {
                    index: true,
                    element: <HomePage />
               },
               {
                    path: "al-quran",
                    element: <QuranPage />
               },
               {
                    path: "waktu-sholat",
                    element: <SholatPage />
               }
          ]
     },
     {
          path: "/kontak",
          element: <KontakPage />
     }
])

// ===== Export =====
export default router;