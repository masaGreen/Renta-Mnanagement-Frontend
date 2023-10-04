
import { ChangeEvent, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import { useAppContext } from "../contextApi/AppContext";



export default function TenantsPage() {
    const [search, setSearch] = useState("");
    const { setArrears } = useAppContext()
    function handleSearch(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setSearch(event.target.value);
    }
    return (
        <div >

            <div className="flex items-center justify-center w-full mt-6 bg-indigo-200">
                <Link to="" onClick={() => setArrears(false)}>
                    <div className="dashboardlink">
                        <span >All Tenants</span>
                    </div>
                </Link>
                <Link to="registertenant" >
                    <div className="dashboardlink">
                        <span >Add Tenant</span>
                    </div>
                </Link>
                <Link to="updatepaymentstatus" >
                    <div className="dashboardlink">
                        <span >Update payment status</span>
                    </div>
                </Link>

                <div className="flex items-center rounded-md bg-white">
                    <input
                        className="p-2 outline-none bg-transparent"
                        value={search}
                        onChange={handleSearch}
                        placeholder="unit number.."
                    >
                    </input>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>

            </div>
            <div>
                <Outlet context={{ search }} />
            </div>

        </div>
    )


}