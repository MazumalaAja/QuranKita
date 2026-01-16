import { Outlet, useNavigation } from "react-router-dom";
// import Loading from "../components/loading";
export default function Layout() {
     // const navigation = useNavigation();
     return (
          <>
               {/* {navigation.state === "loading" && <Loading />} */}
               <Outlet />
          </>
     )
}