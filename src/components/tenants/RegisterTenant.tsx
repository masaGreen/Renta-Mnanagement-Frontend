
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CommonResponseMsg, TenantReqType } from "../../types/TypesDefinitions";
import { useQueryClient, useMutation } from "react-query";
import apis from "../ApiService";
import { useAppContext } from "../../contextApi/AppContext";
import { AxiosError } from "axios";
import { useState } from "react";
import { tenantValidationErrors } from "../../types/ValidationErrorsTypes";



export default function RegisterTenant() {
    const { register, handleSubmit, reset } = useForm<TenantReqType>();
    const [errors, setErrors] = useState<string | null>(null)

    const [fnameError, setFnameError] = useState<string | undefined>(undefined)
    const [lnameError, setLnameError] = useState<string | undefined>(undefined)
    const [phoneError, setPhoneError] = useState<string | undefined>(undefined)
    const [unitError, setUnitError] = useState<string | undefined>(undefined)
    const navigate = useNavigate()
    const client = useQueryClient()
    const { colorMode } = useAppContext()
    const { mutate } = useMutation<boolean, Error, TenantReqType>(
        "registerTenant",
        (data) => apis.registerTenant(data),
        {
            onSuccess: () => {
                client.invalidateQueries("fetchedTenants")
                client.invalidateQueries("fetchedUnits")
                reset();
                navigate("/tenants")
            },
            onError: (error) => {
                if ((error as AxiosError).response?.status === 400) {
                    const validityerrors = (error as AxiosError).response?.data as tenantValidationErrors

                    setFnameError(validityerrors.firstName);
                    setLnameError(validityerrors.lastName);
                    setPhoneError(validityerrors.phone);
                    setUnitError(validityerrors.unitNumber);
                }

                setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).message)
            }

        }

    )

    async function onSubmit(data: TenantReqType) {

        mutate(data)


    }

    return (

        <div className="flex flex-col  gap-1 items-center ">
            <div>
                <h2 className={`text-indigo-900 text-2xl underline font-semiibold ${colorMode ? "text-slate-300" : ""}`}>Add Tenant</h2>
            </div>
            <div className={`${colorMode ? "bg-slate-500 shadow-neutral-500 shadow-md" : ""} w-full p-2 md:w-2/5 rounded-lg  border-indigo-200 shadow-sm md:p-2 `}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""} text-lg font-bold`}>FirstName</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("firstName")} />
                            {fnameError &&
                                <div>
                                    <strong className="text-red-400">{fnameError}</strong>
                                </div>
                            }
                        </div>
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""} text-lg font-bold`}>LastName</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("lastName")} />
                            {lnameError &&
                                <div>
                                    <strong className="text-red-400">{lnameError}</strong>
                                </div>
                            }
                        </div>
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""} text-lg font-bold`}>Phone</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("phone")} />
                            {phoneError &&
                                <div>
                                    <strong className="text-red-400">{phoneError}</strong>
                                </div>
                            }
                        </div>
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""} text-lg font-bold`}>UnitNumber</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("unitNumber")} />
                            {unitError &&
                                <div>
                                    <strong className="text-red-400">{unitError}</strong>
                                </div>
                            }
                        </div>

                        <button type="submit" className="p-1 bg-indigo-400 text-slate-800 font-semibold text-lg rounded hover:bg-indigo-500 transition ease-in-out 300" >register</button>
                        {errors &&
                            <div>
                                <strong className="text-red-400">{errors}</strong>
                            </div>
                        }
                    </div>
                </form>
            </div>

        </div>

    )
}