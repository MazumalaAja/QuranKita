import { useEffect } from "react";
import AOS from "aos";
import "../node_modules/aos/dist/aos.css"

const AnimateOnScroll = ({ children }) => {
     useEffect(() => {
          AOS.init({
               duration: 1000,
               easing: "ease-in-out",
          });
     }, [])

     return children;
}

export { AnimateOnScroll }