import axios, { AxiosError } from "axios"
import { useAppContext } from "../contextApi/AppContext"
import { CommonResponseMsg } from "../types/TypesDefinitions"

export default function Downloads(){
    const {colorMode} = useAppContext()

    async function handleDownload(link: string) {
        const url = "http://localhost:8080/v1/"+link
        try {
            const res = await axios.get(url, {
                headers:{
                "Authorization":"Bearer "+localStorage.getItem("key")},
            
                responseType:"arraybuffer"})
               async function  file(){
                    console.log(res)
                    // Create a Blob from the arraybuffer
                    const blob = new Blob([res.data], { type: 'application/pdf' });
        
                    // Create a link element to trigger the download
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    
                    link.setAttribute('download', 'file_'+fileName()+'.pdf')
                    link.click();
                    window.URL.revokeObjectURL(link.href);
                }
                file();
        } catch (error) {
            alert((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
        }
      
       
    }
    function fileName(): string{
        const currentDate = new Date();

       
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; 
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        // Create a formatted string
       return`${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
        

    }
    return (
        <div>
            <div className="flex gap-2 flex-col  p-2 md:p-6">
                <div>
                    <h2 className={`text-2xl font-bold ${colorMode?"text-slate-300":""}`}>Quick downloads</h2>
                </div>
                <div>
                    <ul>
                        <li  className={`underline ${colorMode?"text-blue-400":""}`}>
                            <button onClick = {()=>handleDownload("units/download/allUnits")} className={` underline ${colorMode?"text-blue-400":" text-blue-800"} text-lg font-semibold`}>All Units</button>
                        </li>
                        <li className="underline">
                            <button onClick = {()=>handleDownload("tenants/download/allTenants")} className={` underline ${colorMode?"text-blue-400":" text-blue-800"} text-lg font-semibold`}>All Tenants</button>
                            
                        </li>
                        <li className="underline">
                            <button onClick = {()=>handleDownload("tenants/download/allTenantsWithArrears")} className={` underline ${colorMode?"text-blue-400":" text-blue-800"} text-lg font-semibold`}>Tenants with rent arrears</button>
                        
                        </li>
                        <li className="underline">
                            <button onClick = {()=>handleDownload("utilities/download/allUtilPaymentsWithPendingBills")} className={` underline ${colorMode?"text-blue-400":" text-blue-800"} text-lg font-semibold`}>Unpaid UtilPayments</button>
                        
                        </li>
                        <li className="underline">
                            <button onClick = {()=>handleDownload("utilities/download/allUtilPayments")} className={` underline ${colorMode?"text-blue-400":" text-blue-800"} text-lg font-semibold`}>All utilities payments</button>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}