import { useAppContext } from "../contextApi/AppContext"

export default function Downloads(){
    const {colorMode} = useAppContext()
    return (
        <div>
            <div className="flex gap-2 flex-col  p-2 md:p-6">
                <div>
                    <h2 className={`text-2xl font-bold ${colorMode?"text-slate-300":""}`}>Quick downloads</h2>
                </div>
                <div>
                    <ul>
                        <li className={`underline ${colorMode?"text-blue-400":""}`}>
                            <a target="_blank" href="http://localhost:8080/v1/units/download/allUnits"><span className={`underline ${colorMode?"text-blue-400":" text-blue-800"} text-lg font-semibold`}>All Units</span></a>
                        </li>
                        <li className="underline">
                            <a target="_blank" href="http://localhost:8080/v1/tenants/download/allTenants"><span className={`underline ${colorMode?"text-blue-400":"text-blue-800"} text-lg font-semibold `}>All Tenants</span></a>
                        </li>
                        <li className="underline">
                            <a target="_blank" href="http://localhost:8080/v1/tenants/download/allTenantsWithArrears"><span className={`underline ${colorMode?"text-blue-400":"text-blue-800"} text-lg font-semibold `}>Tenants with arrears</span></a>
                        </li>
                        <li className="underline">
                            <a target="_blank" href="http://localhost:8080/v1/utilities/download/allUtilPaymentsWithPendingBills"><span className={`underline ${colorMode?"text-blue-400":"text-blue-800"} text-lg font-semibold `}>All tenants with pending bills</span></a>
                        </li>
                        <li className="underline">
                            <a target="_blank" href="http://localhost:8080/v1/utilities/download/allUtilPayments"><span className={`underline ${colorMode?"text-blue-400":" text-blue-800"} text-lg font-semibold`}>All Utilities payments</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}