import { useForm } from "react-hook-form"
import { useMutation } from "react-query";

import { useState } from "react";
import { AxiosError } from "axios";
import { useAppContext } from "../../contextApi/AppContext";
import apis from "../ApiService";
import { ChangePasswordFormdata } from "../../types/TypesDefinitions";



export type MyFormdata = {
    email: string,
    password: string
}
export type LoginRes = {
    id: number,
    email: string,
    status: boolean,
    message: string,
    token: string,
    role: string,
}

export default function changePassword() {
    const [errors, setErrors] = useState<string | null>(null)

    const [oldPasswordError, setOldPasswordError] = useState<string | undefined>(undefined)
    const [newPasswordError, setNewPasswordError] = useState<string | undefined>(undefined)

    const { register, handleSubmit, reset } = useForm<ChangePasswordFormdata>();
    const { colorMode, handleLogout } = useAppContext()

    const mutation = useMutation<LoginRes, Error, ChangePasswordFormdata>(
        "changePassword",
        (data) => apis.changePassword(data),
        {
            onSuccess: () => {
                handleLogout()
                reset()
            },

            onError: (error) => {
                if ((error as AxiosError).response?.status === 400) {
                    const validityerrors = (error as AxiosError).response?.data as ChangePasswordFormdata;

                    setOldPasswordError(validityerrors.oldPassword);
                    setNewPasswordError(validityerrors.newPassword);

                }

                setErrors((((error as AxiosError).response?.data) as LoginRes).message)
            }
        }
    )


    async function onSubmit(data: ChangePasswordFormdata) {

        mutation.mutate(data)

    }

    return (
        <div className={`flex flex-col  gap-1 items-center min-h-screen ${colorMode ? "bg-indigo-200" : ""} `} >
            <div>
                <h2 className={`text-indigo-900 text-xl mt-2 mb-2 md:mt-6 ${colorMode ? "text-slate-800" : ""}`}>Change your Password</h2>
            </div>
            <div className={`${colorMode ? "bg-slate-500 shadow-neutral-500 shadow-md" : ""} w-full p-2 md:w-2/5 rounded-lg  border-indigo-200 shadow-sm md:p-2 `}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="formdiv">
                            <label className={`text-xl font-bold ${colorMode ? "text-slate-200" : ""}`}>Old password</label>
                            <input className='p-2 rounded outline-indigo-200' type="password" {...register("oldPassword")} />
                            {oldPasswordError &&
                                <div>
                                    <strong className="text-red-400">{oldPasswordError}</strong>
                                </div>
                            }
                        </div>
                        <div className="formdiv">
                            <label className={`text-xl font-bold  ${colorMode ? "text-slate-200" : ""}`}>password</label>
                            <input className='p-2 rounded outline-indigo-200' type="password" {...register("newPassword")} />
                            {newPasswordError &&
                                <div>
                                    <strong className="text-red-400">{newPasswordError}</strong>
                                </div>
                            }
                        </div>
                        {errors && <div>
                            <strong className="text-red-400">{errors}</strong>
                        </div>}
                        <div className="flex flex-col gap-2 md:flex-row items-center">
                            <button type="submit" className="p-1 bg-indigo-400 text-slate-800 font-semibold text-lg rounded hover:bg-indigo-500 transition ease-in-out 300">changePassword</button>

                        </div>
                    </div>
                </form>
                {/* <button type="button" onClick={handleHello}>log hello</button> */}
            </div>
        </div>
    )
}