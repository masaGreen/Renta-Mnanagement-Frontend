
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import apis from "../ApiService";
import { useState } from "react";
import { useAppContext } from "../../contextApi/AppContext";
import { AxiosError } from "axios";
import { CommonResponseMsg } from "../../types/TypesDefinitions";
import {  unitValidationErrors } from "../../types/ValidationErrorsTypes";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";

export type RegisterFormData = {

    plotName: string,
    unitNumber: string,
    tag: string,
    rent: number

}

export default function RegisterUnit() {
    const { register, handleSubmit, reset } = useForm<RegisterFormData>();
    const [loadingCircle, setLoadingCircle] = useState(false)
    const [errors, setErrors] = useState<string | null>(null)
    const [plotnameError, setPlotnameErrors] = useState<string | undefined>(undefined)
    const [unitError, setUnitError] = useState<string | undefined>(undefined)
    const [tagError, setTagErrors] = useState<string | undefined>(undefined)
    const [rentError, setRentErrors] = useState<string | undefined>(undefined)
    const navigate = useNavigate()
    const { colorMode } = useAppContext()


    const client = useQueryClient()
    const { mutate } = useMutation<boolean, Error, RegisterFormData>(
        "registerUnit",
        (data) => apis.registerUnit(data),
        {
            onSuccess: () => {
                
                client.invalidateQueries("fetchedUnits")
                setLoadingCircle(false)
                reset();
                navigate("/units");
            },
            onError: (error) => {

                setLoadingCircle(false)
                if ((error as AxiosError).response?.status === 400) {
                    const validityerrors = (error as AxiosError).response?.data as unitValidationErrors
                    setPlotnameErrors(validityerrors.plotName);
                    setTagErrors(validityerrors.tag);
                    setRentErrors(validityerrors.rent);
                    setUnitError(validityerrors.unitNumber);
                }
                setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
            }
        }

    )

    async function onSubmit(data: RegisterFormData) {

        mutate(data)


    }
    function handleLoading():void {
        setLoadingCircle(true)
    }



    return (
        <div className="flex flex-col  gap-1 items-center ">
            <div>
                <h2 className={`text-indigo-900 text-2xl underline font-semiibold ${colorMode ? "text-slate-300" : ""}`}>Add Unit</h2>
            </div>
            <div className={ `${colorMode?"bg-slate-500 shadow-neutral-500 shadow-md":""} w-full p-2 md:w-2/5 rounded-lg  border-indigo-200 shadow-sm md:p-2 `}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""} text-lg font-bold`}>PlotName</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("plotName")} />
                            {plotnameError &&
                                <div>
                                    <strong className="text-red-400">{plotnameError}</strong>
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
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""} text-lg font-bold`}>Tag</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("tag")} />
                            {tagError &&
                                <div>
                                    <strong className="text-red-400">{tagError}</strong>
                                </div>
                            }
                        </div>
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""} text-lg font-bold`}>Rent</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("rent", { valueAsNumber: true })} />
                            {rentError &&
                                <div>
                                    <strong className="text-red-400">{rentError}</strong>
                                </div>
                            }
                        </div>
                        {errors &&
                        <div>
                            <strong className="text-red-400">{errors}</strong>
                        </div>
                    }
                        <button type="submit" onClick={handleLoading}
                                className={`${!loadingCircle ? "p-1 bg-indigo-400 text-slate-800 font-semibold text-lg rounded hover:bg-indigo-500 transition ease-in-out 300" : "hidden"}`
                                }>register</button>
                                
                            {loadingCircle && <div className="flex  p-1 gap-1 rounded bg-indigo-500 text-red-500 items-center justify-center font-semibold ">
                                <SpinningCircles />

                            </div>}
                    </div>
                   
                </form>
            </div>
        </div>

    )
}