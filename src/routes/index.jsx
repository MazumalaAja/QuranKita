import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AnimateOnScroll } from "../../libs/aos";
import { Home, AlQuran, Layout } from "../pages";
import { Suspense } from "react";
import Loading from "../components/loading";
import { GetApi } from "../services";
import RouteError from "../pages/routeError";

const router = createBrowserRouter([
     {
          element: <Layout />,
          children: [
               {
                    index: true,
                    element: <Home />
               },
               {
                    path: "quran",
                    element: <Outlet />,
                    children: [
                         {
                              index: true,
                              element: <Navigate to={`1`} replace />
                         },
                         {
                              path: `:nomor`,
                              errorElement: <RouteError />,
                              element: (
                                   <Suspense fallback={<Loading />}>
                                        <AlQuran />
                                   </Suspense >
                              )
                         }
                    ]
                    // element: <AlQuran />,
                    // loader: GetApi("surat")
               }
          ]
     }
])

export default router;