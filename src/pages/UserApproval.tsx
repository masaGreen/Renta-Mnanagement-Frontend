import { useForm } from "react-hook-form"
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apis from "../components/ApiService";
import { useAppContext } from "../contextApi/AppContext";
import { AxiosError } from "axios";
import { CommonResponseMsg } from "../types/TypesDefinitions";
import { useState } from "react";


export type ApprovalData = {
    email: string,

}

export default function UserApproval() {
    const [errors, setErrors] = useState<string|null>(null)
    const { register, handleSubmit, reset } = useForm<ApprovalData>();
    const navigate = useNavigate()
    const { colorMode } = useAppContext()
    const mutation = useMutation<boolean, Error, ApprovalData>(
        "approveUser",
        (data) => apis.approveUser(data),
        {
            onSuccess: () => {
                navigate("/")
            },
            onError: (error)=>{
                setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
            }
        }
    )


    async function onSubmit(data: ApprovalData) {
        mutation.mutate(data)
        reset();
    }

    return (
        <div className="flex flex-col  gap-1 items-center min-h-screen ">
            <div>
                <h2 className={`${colorMode ? "text-slate-300" : ""} text-indigo-900 text-xl mt-2 md:mt-6 `}>Approve user by providing their email</h2>
            </div>
            <div className={`${colorMode ? "bg-slate-400" : ""} rounded w-full p-2 md:w-1/3 border-indigo-400 bg-slate-300 shadow-md md:p-6 `}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="formdiv">
                            <label className=" text-xl">email</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("email")} />

                        </div>

                        {errors && <div className="text-red-600"><p>{errors}</p></div>}
                        <div className="flex flex-col gap-2 md:flex-row items-center">
                            <button type="submit" className="p-1 bg-indigo-400 text-slate-800 font-semibold text-lg rounded hover:bg-indigo-500 transition ease-in-out 300">Approve</button>

                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}