import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAppContext } from "../contextApi/AppContext";

export default function Home(){
    const {colorMode} = useAppContext()
    return(
        <div className={`grid grid-cols-1 md:grid-cols-4 font-custom ${colorMode?"bg-slate-700 text-slate-700":""}`}>
            <Navigation/>
            <Outlet/>
        </div>
    )
}