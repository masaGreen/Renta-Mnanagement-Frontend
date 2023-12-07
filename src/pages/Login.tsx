import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import apis from "../components/ApiService";
import { useState } from "react";
import { AxiosError } from "axios";
import { useAppContext } from "../contextApi/AppContext";
import { CommonResponseMsg, LoginFormdata, LoginRes } from "../types/TypesDefinitions";
import { MyFormdata } from "../components/Users/ChangePassword";
import { SpinningCircles } from "react-loading-icons";


export default function Login() {
    const [errors, setErrors] = useState<string | null>(null)
    const [loadingCircle, setLoadingCircle] = useState(false)
    const { register, handleSubmit, reset } = useForm<LoginFormdata>();
    const navigate = useNavigate()
    const { colorMode, setAuth } = useAppContext()
    const client = useQueryClient()
    const mutation = useMutation<LoginRes, Error, LoginFormdata>(
        "logUser",
        (data) => apis.logUser(data),
        {
            onSuccess: (data) => {
                setAuth(true)
                
                localStorage.setItem("key", data.token)

                localStorage.setItem("role", data.role)
                localStorage.setItem("email", data.email)
                localStorage.setItem("username", data.email.split("@")[0])
                client.invalidateQueries("fetchedUsers")
                setLoadingCircle(false)
                reset();
                navigate("/")




            },

            onError: (error) => {
                console.log(error)
                setLoadingCircle(false)
                setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
            }
        }
    )


    async function onSubmit(data: MyFormdata) {

        mutation.mutate(data)

    }
    function handleLoading():void {
        setLoadingCircle(true)
    }

    return (
        <div  className={`flex bg-indigo-300 items-center justify-center bg-hero  flex-col gap-1 items-center min-h-screen ${colorMode ? "bg-indigo-200" : ""} `} >
            <div>
                <h2 className={`text-black text-xl mt-2 mb-2 md:mt-6 ${colorMode ? "text-slate-800" : ""}`}>Login to MyRentals Manager</h2>
            </div>
            <div className={`${colorMode ? "bg-slate-400 shadow-neutral-500 shadow-md " : ""} w-full bg-indigo-800 p-2 md:w-1/3 rounded-lg  border-indigo-200 shadow-sm md:p-2 `}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="formdiv">
                            <label className={`text-xl font-bold  text-slate-100 ${colorMode ? "text-navyblue" : ""}`}>email</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("email")} />

                        </div>
                        <div className="formdiv">
                            <label className={`text-xl font-bold  text-slate-100 ${colorMode ? "text-navyblue" : ""}`}>password</label>
                            <input className='p-2 rounded outline-indigo-200' type="password" {...register("password")} />

                        </div>
                        {errors && <div className="text-red-600"><p>{errors}</p></div>}
                        <div className="flex flex-col gap-2 md:flex-row items-center">
                            <button type="submit" onClick={handleLoading}
                                className={`${!loadingCircle ? "p-1 bg-indigo-400 text-slate-800 font-semibold text-lg rounded hover:bg-indigo-500 transition ease-in-out 300" : "hidden"}`
                                }>login</button>
                                
                            {loadingCircle && <div className="flex  p-1 gap-1 rounded bg-indigo-500 text-red-500 items-center justify-center font-semibold ">
                                <SpinningCircles />

                            </div>}
                            <p className="text-indigo-200 ">Not signed up <Link to="/signup"><span className="underline font-semibold text-slate-200 text-lg">Signup</span></Link></p>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
// absolute top-[60%] right-[50%]