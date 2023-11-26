import { useForm } from "react-hook-form"
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import apis from "../components/ApiService";
import { AxiosError } from "axios";
import { useState } from "react";

import { useAppContext } from "../contextApi/AppContext";
import { CommonResponseMsg } from "../types/TypesDefinitions";
import { SpinningCircles } from "react-loading-icons";


export type SignupFormdata = {
    email: string,
    password: string,
    role: string,
}
export default function Signup() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState<string | null>(null)
    const [loadingCircle, setLoadingCircle] = useState(false)
    const [emailError, setEmailError] = useState<string | undefined>(undefined)
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined)
    const [roleError, setRoleError] = useState<string | undefined>(undefined)
    const { register, handleSubmit, reset } = useForm<SignupFormdata>();
    const { colorMode } = useAppContext()
    const mutation = useMutation<boolean, Error, SignupFormdata>(
        "signupUser",
        (data) => apis.signUp(data),
        {
            onSuccess: () => {
                reset()
                navigate("/login")
                setLoadingCircle(false)
            },
            onError: (error) => {
                setLoadingCircle(false)
                if ((error as AxiosError).response?.status === 400) {
                    const validityerrors = (error as AxiosError).response?.data as SignupFormdata

                    setEmailError(validityerrors.email);
                    setPasswordError(validityerrors.password);
                    setRoleError(validityerrors.role);
                   

                }

                setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
            }
        }


    )

    async function onSubmit(data: SignupFormdata) {
        mutation.mutate(data)

    }
    function handleLoading():void {
        setLoadingCircle(true)
    }


    return (
        <div className={`flex flex-col  gap-1 items-center min-h-screen ${colorMode ? "bg-indigo-200" : ""} `}>
            <div>
                <h2 className={`text-indigo-900 text-xl mt-2 mb-2 md:mt-6 ${colorMode ? "text-slate-800" : ""}`}>Signup to MyRentals Manager</h2>
            </div>
            <div className={`${colorMode ? "bg-slate-400 shadow-neutral-500 shadow-md " : ""} w-full p-2 md:w-1/3 rounded-lg  border-indigo-200 shadow-sm md:p-2 `}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="formdiv">
                            <label className={`text-xl font-bold ${colorMode ? "text-slate-200" : ""}`}>email</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("email")} />
                            {emailError &&
                                <div>
                                    <strong className="text-red-400">{emailError}</strong>
                                </div>
                            }
                        </div>
                        <div className="formdiv">
                            <label className={`text-xl font-bold ${colorMode ? "text-slate-200" : ""}`}>password</label>
                            <input className='p-2 rounded outline-indigo-200' type="password" {...register("password")} />
                            {passwordError &&
                                <div>
                                    <strong className="text-red-400">{passwordError}</strong>
                                </div>
                            }
                        </div>
                        <div className="formdiv">
                            <label className={`text-xl font-bold ${colorMode ? "text-slate-200" : ""}`}>role</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("role")} />
                            {roleError &&
                                <div>
                                    <strong className="text-red-400">{roleError}</strong>
                                </div>
                            }
                        </div>
                        {errors && <div className="text-red-600 text-lg font-bold">{errors}</div>}
                        <div className="flex flex-col gap-2 md:flex-row items-center">


                            <button type="submit" onClick={handleLoading}
                                className={`${!loadingCircle ? "p-1 bg-indigo-400 text-slate-800 font-semibold text-lg rounded hover:bg-indigo-500 transition ease-in-out 300" : "hidden"}`
                                }>signup</button>
                                
                            {loadingCircle && <div className="flex  p-1 gap-1 rounded bg-indigo-500 text-red-500 items-center justify-center font-semibold ">
                                <SpinningCircles />

                            </div>}
                            <p className={`${colorMode ? "text-slate-100 font-bold" : ""}`}>already signed up <Link to="/login"><span className="underline font-semibold text-blue-800 text-lg">login</span></Link></p>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    )
}