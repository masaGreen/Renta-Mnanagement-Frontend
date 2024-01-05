import { useState } from "react";
import { useForm } from "react-hook-form";
import { CommonResponseMsg, StatusUpdateReqDto } from "../../types/TypesDefinitions";
import { useQueryClient, useMutation } from "react-query";
import apis from "../ApiService";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import { AxiosError } from "axios";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";


export default function UpdateStatus() {
    const { register, handleSubmit, reset } = useForm<StatusUpdateReqDto>();
    const [errors, setErrors] = useState<string | null>(null)
    const [loadingCircle, setLoadingCircle] = useState(false)
    const [val, setVal] = useState("")
    const navigate = useNavigate()
    const client = useQueryClient()
    const { colorMode, } = useAppContext()
    const mutation = useMutation<boolean, Error, StatusUpdateReqDto>("updateTenantStatus", (data) => apis.updateTenantPaymentStatus(data), {
        onSuccess: () => {
            client.invalidateQueries("fetchedTenants")
            setLoadingCircle(false)
            navigate("/tenants")
        },
        onError: (error) => {
            setLoadingCircle(false)
            setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
        }
    })
    async function onSubmit(data: StatusUpdateReqDto) {

        mutation.mutate(data)

        reset()
    }

     
    function handleLoading():void {
        setLoadingCircle(true)
    }

    return (
        <div className="flex flex-col  gap-1 items-center ">
            <div className={`mt-2 font-semibold  ${colorMode ? "text-slate-300" : ""}`}>
                <h2>1. To update Tenant Payment</h2>
                <h4>2. Enter  their phoneNumber  & click update </h4>
            </div>
            <div className={`${colorMode ? "bg-slate-500 shadow-neutral-500 shadow-md" : ""} w-full p-2 md:w-2/5 rounded-lg  border-indigo-200 shadow-sm md:p-2 `}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="formdiv">
                            <label className=" text-xl">PhoneNumber</label>
                            <input className='p-1 rounded outline-indigo-200' placeholder="phoneno" type="text" {...register("phone")} />
                        </div>
                        <div className="formdiv">
                            <label className=" text-xl">Paystatus</label>
                            <select
                                className='p-1 rounded outline-indigo-200'
                                value={val}
                                {...register("payStatus")}
                                onChange={(e: React.SyntheticEvent<HTMLSelectElement, Event>): void => setVal((e.target as HTMLSelectElement).value)}
                            >

                                <option value={"unpaid"} >unpaid</option>
                                <option value={"paid"} >paid</option>

                            </select>
                        </div>

                        {errors && <div className="text-red-600"><p>{errors}</p></div>}
                        <button type="submit" onClick={handleLoading}
                                className={`${!loadingCircle ? "p-1 bg-indigo-400 text-slate-800 font-semibold text-lg rounded hover:bg-indigo-500 transition ease-in-out 300" : "hidden"}`
                                }>update</button>
                                
                            {loadingCircle && <div className="flex  p-1 gap-1 rounded bg-indigo-500 text-red-500 items-center justify-center font-semibold ">
                                <SpinningCircles />

                            </div>}
                    </div>
                </form>
            </div>
        </div>

    )
}
