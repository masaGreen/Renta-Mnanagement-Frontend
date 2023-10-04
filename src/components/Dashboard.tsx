
import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";

export default function Dashboard() {

    const { setAvailability, setArrears, setUnpaidUtlis, colorMode } = useAppContext()

    function handleAvailableUnits() {
        setAvailability(true)
    }
    const userRole = localStorage.getItem("role")

    return (
        <div className="mt-2 md:col-span-3 ">
            <div className=" md:pt-6 md:flex-row flex-col w-full flex gap-1 pb-4 justify-center items-center border-b-2 shadow ">



                <div className="flex items-center my-auto justify-center text-sm md:text-md gap-1 md:gap-2 ">
                    <div className={`${colorMode ? "text-slate-200  " : ""} md:ml-6`}>
                        <Link to="/units" onClick={handleAvailableUnits}>

                            <button className={`${colorMode ? "bg-indigo-500 " : ""} p-2 bg-indigo-300 font-semibold rounded  hover:bg-indigo-400 transition ease-in-out 300`}>Available Units</button>

                        </Link>
                    </div>
                    <div className={`${colorMode ? "text-slate-200  " : ""} md:ml-6`}>
                        <Link to="/tenants" onClick={() => setArrears(true)}>

                            <button className={`${colorMode ? "bg-indigo-500 " : ""} p-2 bg-indigo-300 font-semibold rounded  hover:bg-indigo-400 transition ease-in-out 300`}>Tenants with arrears</button>

                        </Link>
                    </div>
                    <div className={`${colorMode ? "text-slate-200  " : ""} md:ml-6`}>
                        <Link to="/utilities" onClick={() => setUnpaidUtlis(true)}>

                            <button className={`${colorMode ? "bg-indigo-500 " : ""} p-2 bg-indigo-300 font-semibold rounded  hover:bg-indigo-400 transition ease-in-out 300`}>Unpaid utilities</button>

                        </Link>
                    </div>

                    <div className={`${colorMode ? "text-slate-200  " : ""} md:ml-6`}>
                        {userRole === "ADMIN" ?
                            <Link to="/adminPanel">

                                <button className="p-2 bg-teal-600 font-semibold rounded bg- hover:bg-teal-700 transition ease-in-out 300">Admin Panel</button>

                            </Link>
                            :
                            <Link to="/adminPanel">

                                <button className="p-2 bg-teal-600 font-semibold rounded bg- hover:bg-teal-700 transition ease-in-out 300">Change-Password</button>

                            </Link>
                        }
                    </div>

                </div>

            </div>

            <div className="w-full min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}
