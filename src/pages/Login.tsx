import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import apis from "../components/ApiService";
import { useState } from "react";
import { AxiosError } from "axios";
import { useAppContext } from "../contextApi/AppContext";
import { LoginFormdata, LoginRes } from "../types/TypesDefinitions";
import { MyFormdata } from "./UserApproval";


export default function Login() {
    const [errors, setErrors] = useState<string | null>(null)
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
                reset();
                navigate("/")




            },

            onError: (error) => {
                console.log(error)
                setErrors((((error as AxiosError).response?.data) as LoginRes).message)
            }
        }
    )


    async function onSubmit(data: MyFormdata) {

        mutation.mutate(data)

    }

    return (
        <div className={`flex flex-col  gap-1 items-center min-h-screen ${colorMode ? "bg-indigo-200" : ""} `} >
            <div>
                <h2 className={`text-indigo-900 text-xl mt-2 mb-2 md:mt-6 ${colorMode ? "text-slate-800" : ""}`}>Login to MyRentals Manager</h2>
            </div>
            <div className={`${colorMode ? "bg-slate-400 shadow-neutral-500 shadow-md " : ""} w-full p-2 md:w-1/3 rounded-lg  border-indigo-200 shadow-sm md:p-2 `}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="formdiv">
                            <label className={`text-xl font-bold ${colorMode ? "text-slate-200" : ""}`}>email</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("email")} />

                        </div>
                        <div className="formdiv">
                            <label className={`text-xl font-bold  ${colorMode ? "text-slate-200" : ""}`}>password</label>
                            <input className='p-2 rounded outline-indigo-200' type="password" {...register("password")} />

                        </div>
                        {errors && <div className="text-red-600"><p>{errors}</p></div>}
                        <div className="flex flex-col gap-2 md:flex-row items-center">
                            <button type="submit" className="p-1 bg-indigo-400 text-slate-800 font-semibold text-lg rounded hover:bg-indigo-500 transition ease-in-out 300">login</button>
                            <p>Not signed up <Link to="/signup"><span className="underline font-semibold text-blue-800 text-lg">Signup</span></Link></p>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}