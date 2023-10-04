import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useAppContext } from '../contextApi/AppContext';
import { fetchTenants, fetchUnits, fetchUtilities } from '../types/TypesDefinitions';

export default function Landing() {
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)
    const [count3, setCount3] = useState(0)

    const { unitsMutation, tenantsMutation, utilitiesMutation, colorMode } = useAppContext()
    const data = unitsMutation.data as fetchUnits
    const tenantData = tenantsMutation.data as fetchTenants
    const utilitiesData = utilitiesMutation.data as fetchUtilities

    const occupied = data?.units.filter(unit => unit.status == false)

    const registeredTenant = tenantData?.tenants.filter(tenant => tenant.payStatus === "paid")

    const utilitiesPaid = utilitiesData?.utilsPayments.filter(utility => utility.status === "paid")

    let utilitiesCleared: number;
    let occupancy: number;
    let tenantsPayments: number;
    if (occupied) {
        occupancy = Math.trunc(occupied.length / data?.units.length * 100)

    }
    if (registeredTenant) {
        tenantsPayments = Math.trunc(registeredTenant.length / tenantData?.tenants.length * 100)
    }
    if (utilitiesPaid) {
        utilitiesCleared = Math.trunc(utilitiesPaid.length / utilitiesData?.utilsPayments.length * 100)
    }

    useEffect(() => {
        while (occupied && count < occupancy) {
            const interval = setInterval(() => {
                setCount(count + 1)

            }, 22);
            return () => clearInterval(interval);

        };

    }, [count, data]);
    useEffect(() => {
        while (registeredTenant && count2 < tenantsPayments) {
            const interval = setInterval(() => {
                setCount2(count2 + 1)

            }, 22);
            return () => clearInterval(interval);

        };

    }, [count2, tenantData]);
    useEffect(() => {
        while (utilitiesData && count3 < utilitiesCleared) {
            const interval = setInterval(() => {
                setCount3(count3 + 1)

            }, 22);
            return () => clearInterval(interval);

        };

    }, [count3, utilitiesData]);

    return (
        <div className="p-2  gap-2 flex flex-col min-h-screen items-center justify-center md:p-8 md:flex-row md:gap-3 ">
            <div className={`${colorMode ? "bg-slate-600 text-slate-200" : ""} flex items-center gap-4 flex-col p-3 text-2xl min-h-[300px] max-w-sm rounded-xl shadow-xl 
            border-6 bg-slate-100 w-full md:w-[360px]  border-gray-200`}>
                <div className="flex items-center gap-4 justify-around flex-1 relative">
                    <p>Units occupancy</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                    </svg>

                </div>
                <div className='w-[180px] h-[180px] font-extrabold text-xl flex-4'>

                    <CircularProgressbar value={count} text={`${count}%`} styles={{
                        path: {
                            stroke: `${colorMode ? "#06b6d4" : "#818cf8"}`,
                            strokeLinecap: 'round',
                            transition: `stroke-dashoffset ${data && data.units.length * 0.004}s ease 0s`,
                            transform: 'rotate(0.25turn)',
                            transformOrigin: 'center center',
                        },

                    }}
                    />

                </div>
            </div>

            <div className={`${colorMode ? "bg-slate-600 text-slate-200" : ""} flex items-center gap-4 flex-col p-3 text-2xl min-h-[300px] max-w-sm rounded-xl shadow-xl 
            border-6 bg-slate-100 w-full md:w-[360px]  border-gray-200`}>
                <div className="flex items-center gap-4 justify-around flex-1">
                    <p>Last month payments status</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </div>
                <div className='w-[180px] h-[180px] font-extrabold text-xl flex-4'>

                    <CircularProgressbar value={count2} text={`${count2}%`} styles={{
                        path: {
                            stroke: `${colorMode ? "#06b6d4" : "#818cf8"}`,
                            strokeLinecap: 'round',
                            transition: `stroke-dashoffset ${tenantData && tenantData.tenants.length * 0.004}s ease 0s`,
                            transform: 'rotate(0.25turn)',
                            transformOrigin: 'center center',
                        },

                    }}
                    />

                </div>
            </div>

            <div className={`${colorMode ? "bg-slate-600 text-slate-200" : ""} flex items-center gap-4 flex-col p-3 text-2xl min-h-[300px] max-w-sm rounded-xl shadow-xl 
            border-6 bg-slate-100 w-full md:w-[360px]  border-gray-200`}>
                <div className="flex items-center gap-4 justify-around flex-1 ">
                    <p>Utilities payments status</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className='w-[180px] h-[180px] font-extrabold text-xl flex-4'>

                    <CircularProgressbar value={count3} text={`${count3}%`} styles={{
                        path: {
                            stroke: `${colorMode ? "#06b6d4" : "#818cf8"}`,
                            strokeLinecap: 'round',
                            transition: `stroke-dashoffset ${utilitiesData && utilitiesData.utilsPayments.length * 0.004}s ease 0s`,
                            transform: 'rotate(0.25turn)',
                            transformOrigin: 'center center',
                        },

                    }}
                    />

                </div>
            </div>
        </div>
    )
}