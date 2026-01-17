import { Outlet, useNavigation } from "react-router-dom";
// import Loading from "../components/loading";
export default function Layout() {
     // const navigation = useNavigation();
     return (
          <div className="min-h-screen bg-[url(/src/resources/images/04.jpg)] bg-no-repeat bg-cover">
               {/* {navigation.state === "loading" && <Loading />} */}
               <Outlet />
          </div>
     )
}