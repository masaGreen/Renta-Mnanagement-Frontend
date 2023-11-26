
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';

import apis from './ApiService';
import { Dispatch, SetStateAction, useState } from 'react';

import { AxiosError } from 'axios';
import { CommonResponseMsg } from '../types/TypesDefinitions';
import SpinningCircles from 'react-loading-icons/dist/esm/components/spinning-circles';


type ModalProps = {
  open: boolean,
  handleClose: () => void,
  id: number,
  type: string,
  errors: string | null,
  setErrors: Dispatch<SetStateAction<string | null>>
}

type MyMutationType = {
  mutate: UseMutateFunction<boolean, Error, void, unknown>,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  data: any,
  error: Error | null,
}


export default function DeletionModal({ open, handleClose, id, type, errors, setErrors }: ModalProps) {
  const [loadingCircle, setLoadingCircle] = useState(false)
  const client = useQueryClient()
  let mutation: MyMutationType;
  if (type === "unit") {
    mutation = useMutation<boolean, Error>("deleteUnit", () => apis.deleteUnitById(id), {
      onSuccess: () => {
        client.invalidateQueries("fetchedUnits")
        setLoadingCircle(false)
        handleClose()
     
      },
      onError: (error) => {
        setLoadingCircle(false)
        setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
      }
    })
  }
  if (type === "tenant") {
    mutation = useMutation<boolean, Error>("deleteTenant", () => apis.deleteTenantById(id), {
      onSuccess: () => {
        client.invalidateQueries("fetchedTenants")
        client.invalidateQueries("fetchedUnits")
        setLoadingCircle(false)
        handleClose()
        
      },
      onError: (error) => {
        setLoadingCircle(false)
        setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
      }
    })
  }
  if (type === "utility") {
    mutation = useMutation<boolean, Error>("deleteUtility", () => apis.deleteUtilityById(id), {
      onSuccess: () => {
        client.invalidateQueries("fetchedUtilities")
        setLoadingCircle(false)
        handleClose()
        
      },
      onError: (error) => {
        setLoadingCircle(false)
        setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
      }
    })
  }
  if (type === "user") {
    mutation = useMutation<boolean, Error>("deleteUser", () => apis.deleteUserById(id), {
      onSuccess: () => {
        client.invalidateQueries("fetchedUsers")
        setLoadingCircle(false)
        handleClose()
       
      },
      onError: (error) => {
        setLoadingCircle(false)
        setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
      }
    })
  }

  function deleteById() {
    setLoadingCircle(true)
    mutation.mutate()

  }
 

  return (
    <div className={`${open ? "flex" : "hidden"} justify-center absolute bg-opacity-60 bg-black top-0 bottom-0 right-0 left-0 items-center  min-w-full min-h-full `} >

      <div className={`max-w-[80%] max-h-[240px] relative border-2 rounded-md z-50 shadow-neutral-300 ${errors ? "border-red-600, bg-red-200 " : "bg-indigo-500"} flex flex-col gap-2 p-4 `}>
        <button className='p-2 right-2 top-2 absolute font-light flex-1'>x</button>
        <p className='font-bold text-1xl text-center'>Are you sure you want to delete?</p>
        <div className='flex gap-2 justify-center items-center flex-2'>

          
          
          {errors &&
                            <div>
                                <strong className="text-red-400">{errors}</strong>
                            </div>
                        }
                        {!loadingCircle && <button onClick={deleteById} className='p-1  font-bold border-2 border-red-500 bg-red-500 hover:bg-red-600 rounded-md'>delete</button>}
                                
                            {loadingCircle && <div className="flex  p-1 gap-1 rounded bg-indigo-500 text-red-500 items-center justify-center font-semibold ">
                                <SpinningCircles />

                            </div>}
                            <button onClick={handleClose} className='p-1 font-bold  hover:bg-indigo-200 border-2 border-indigo-300 rounded-md'>cancel</button>
        </div>
        {/* {errors && <div className="text-red-600 font-bold text-lg text-center"><p>{errors}</p></div>} */}
      </div>

    </div>
  );
}