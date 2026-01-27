// ===== Imports =====
import { createBrowserRouter, Navigate, useParams } from "react-router-dom";
import LayoutPage from "../components/layouts";
import { HomePage, KontakPage, SholatPage, DetailPage, ErrorPage } from "../pages";
import { lazy, Suspense } from "react";
import { getDetailSurah, getProvinsi, getSurah } from "../../services/cache";
import Loading from "../components/loader";
const QuranPage = lazy(() => import("../pages/Quran/index"));

// ===== Code =====
const router = createBrowserRouter([
     {
          path: "/",
          element: <LayoutPage />,
          errorElement: <ErrorPage />,
          children: [
               {
                    index: true,
                    element: <HomePage />
               },
               {
                    path: "al-quran",
                    loader: () => getSurah("surat"),
                    element: (
                         <Suspense fallback={<Loading />}>
                              <QuranPage />
                         </Suspense>
                    ),
                    children: [
                         { index: true, element: <Navigate to={"1"} /> },
                         {
                              path: ":id",
                              loader: ({ params }) => getDetailSurah("surat", params.id),
                              element: <DetailPage />
                         }
                    ]
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