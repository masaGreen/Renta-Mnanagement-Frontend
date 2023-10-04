import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import imageLogo from "../assets/arclogo.png"

export default function Navigation() {
    const [toggle, setToggle] = useState(true)

    const { setArrears, setAvailability, setUnpaidUtlis, setColorMode, colorMode, handleLogout } = useAppContext()
    const username = localStorage.getItem("username")



    return (
        <nav className={`p-3  border-b-2  border-gray-200 shadow-xs col-span-1 w-full bg-gray-100 shadow md:min-h-screen ${colorMode ? "bg-slate-600 border-slate-600 text-white" : ""}`}>
            <div className="flex p-4 justify-between items-center  md:justify-start ">
                <div className="flex justify-between items-center relative w-full">
                    <Link to="/">
                        <div className="h-[80px] w-[80px]  ">
                            <img src={imageLogo} alt="MyRentals-Manager" className="object-contain h-60px w-60px overflow-hidden"></img>
                            <strong className="text-indigo-400 font-extrabold">MyRentals</strong>
                        </div>
                    </Link>
                    <div >
                        <svg onClick={() => { setColorMode(!colorMode) }} xmlns="http://www.w3.org/2000/svg" fill={`${colorMode ? "black" : "white"}`}
                            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="cursor-pointer absolute top-0 right-0 hover:fill-indigo-700 w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>

                    </div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="w-6 h-6 cursor-pointer   md:hidden" onClick={() => setToggle(!toggle)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                </div>

            </div>
            <div className="flex p-2 items-center justify-between ">
                <div className="flex items-center  gap-2  ">

                    <div className="text-[28px] text-center flex items-center justify-center bg-indigo-400 text-white font-extrabold h-[40px] w-[40px] rounded-full">
                        <p>{username?.toUpperCase()?.substring(0, 1)}</p>
                    </div>
                    <p className={`${colorMode ? "text-slate-200 font-semibold" : "text-teal-950"} text-xl `}>{username && username?.substring(0, 1).toUpperCase() + username?.substring(1)}</p>
                </div>
                <div className="">
                    <Link to={"/login"} >
                        <button onClick={handleLogout} type="submit" className="p-1 bg-red-400  text-slate-800 font-semibold text-sm rounded hover:bg-indigo-400 transition ease-in-out 300">logout</button>
                    </Link>
                </div>

            </div>

            <div className={`grid-cols-1 sm:grid-cols-2 border-r-2   items-end  p-4 w-full  ${toggle ? "hidden" : "grid"}  md:grid md:grid-cols-1`}>
                <Link to={"/units"} onClick={() => setAvailability(false)} className="navlinkDiv">
                    <div className="navLink ">



                        <span className={`${colorMode ? "text-slate-200" : ""} w-[80px]  text-xl text-right text-neutral-500 hover:text-slate-200 font-semibold`}>Units</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>
                    </div>
                </Link>
                <Link to={"/tenants"} onClick={() => setArrears(false)} className="navlinkDiv" >
                    <div className="navLink">

                        <span className={`${colorMode ? "text-slate-200" : ""} w-[80px]  text-xl text-right text-neutral-500 hover:text-slate-200 font-semibold`}>Tenants</span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                </Link>
                <Link to={"utilities"} onClick={() => setUnpaidUtlis(false)} className="navlinkDiv">
                    <div className="navLink">

                        <span className={`${colorMode ? "text-slate-200" : ""} w-[80px]  text-xl text-right text-neutral-500 hover:text-slate-200 font-semibold`}>Utilities</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    </div>

                </Link>
                <Link to={"downloads"} className="navlinkDiv">
                    <div className="navLink ">

                        <div>
                            <span className={`${colorMode ? "text-slate-200" : ""} w-[80px]  text-xl text-right text-neutral-500 hover:text-slate-200 font-semibold`}>Downloads</span>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </div>
                </Link>



            </div>

        </nav>
    )
}