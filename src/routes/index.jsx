import { createBrowserRouter } from "react-router-dom";
import { AnimateOnScroll } from "../../libs/aos";
import { Home, AlQuran, Layout } from "../pages";
import { Suspense } from "react";
import Loading from "../components/loading";
import { GetApi } from "../services";

const router = createBrowserRouter([
     {
          element: <Layout />,
          children: [
               {
                    index: true,
                    element: (
                         <AnimateOnScroll>
                              <Home />
                         </AnimateOnScroll>
                    )
               },
               {
                    path: "quran",
                    element: (
                         <Suspense fallback={<Loading />}>
                              <AlQuran />
                         </Suspense>
                    )
                    // element: <AlQuran />,
                    // loader: GetApi("surat")
               }
          ]
     }
])

export default router;