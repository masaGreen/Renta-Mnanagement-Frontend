
import { useEffect, useState } from 'react';

import { useNavigate, useOutletContext } from 'react-router-dom';
import DeletionModal from '../DeletionModal';
import SpinningCircles from 'react-loading-icons/dist/esm/components/spinning-circles';

import { useAppContext } from '../../contextApi/AppContext';
import { ContextType, UnitType, fetchUnits } from '../../types/TypesDefinitions';




export type Data = {
  units: UnitType[]
}


export default function UnitsList() {
  const [open, setOpen] = useState(false);
  const [myid, setId] = useState<number | null>(null)
  const [units, setUnits] = useState<UnitType[]>([])
  const [errors, setErrors] = useState<string | null>(null)
  const { search } = useOutletContext<ContextType>()
  const navigate = useNavigate();
  const handleOpen = (id: number) => {
    setOpen(true)
    setId(id)


  };
  const handleClose = () => {
    setOpen(false);
    setId(null)
    setErrors(null)
    navigate(`/units`)
  }


  const { unitsMutation, availability, colorMode, auth } = useAppContext()

  useEffect(
    () => {
      if (unitsMutation.data !== undefined) {
        if (availability) {
          const allUtilities = unitsMutation.data as fetchUnits

          const data = allUtilities.units.filter(unit => unit.status == true)
          setUnits(data)
        } else if (search) {

          const allUtilities = unitsMutation?.data as fetchUnits
          const data = allUtilities?.units?.filter(unit => unit.unitNumber.toLowerCase().includes(search.toLowerCase()))
          setUnits(data)
        } else {
          const allUtilities = unitsMutation?.data as fetchUnits
          const data = allUtilities?.units
          setUnits(data)
        }
      }
    },
    [availability, search, unitsMutation, auth]
  )




  if (unitsMutation.isLoading) {
    <SpinningCircles fill={"#4f46e5"} stroke={"#4f46e5"} />
  }
  if (unitsMutation.isFetching) {
    <SpinningCircles fill={"#4f46e5"} stroke={"#4f46e5"} />
  }


  return (
    <>
      <DeletionModal open={open} handleClose={handleClose} id={myid!} type='unit' errors={errors!} setErrors={setErrors} />

      <div className="flex justify-center mt-4 p-1 md:p-2">
        {(units === undefined || units && units.length === 0) && <div className={`${colorMode ? "text-slate-300" : ""} inline-flex mx-auto text-center text-lg `}> <strong>No units found</strong></div>}

        {units?.length > 0 && <table className='table-auto w-full  md:w-[80%]   bg-indigo-400 '>
          <thead>
            <tr className="border-b-2 text-xs md:text-base  border-black ">
              <th className='text-center p-1 md:p-2 font-bold'>Id</th>
              <th className='text-center p-1 md:p-2 font-bold'>Plotname</th>
              <th className='text-center p-1 md:p-2 font-bold'>Unitnumber</th>
              <th className='text-center p-1 md:p-2 font-bold'>Tag</th>
              <th className='text-center p-1 md:p-2 font-bold'>Status</th>
              <th className='text-center p-1 md:p-2 font-bold'>Rent&nbsp;(Ksh)</th>
            </tr>
          </thead>
          <tbody>
            {units?.map((row: UnitType, index) => (
              <tr key={index} className='odd:bg-indigo-200 even:bg-indigo-300 text-xs  md:text-lg'>
                <td className='text-right p-1 md:p-2 '>
                  <div className='flex items-center justify-end font-sans text-sm '>
                    {index + 1}.
                    <div>
                      <svg onClick={() => handleOpen(row.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="w-6 m-l-[10px] h-6 text-xs text-red-600 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                    </div>
                  </div>

                </td>
                <td className='text-center font-sans text-sm md:text-md md:font-semibold  '>
                  {row.plotName}

                </td>
                <td className='text-center font-sans text-sm md:text-md md:font-semibold  '>{row.unitNumber}</td>
                <td className='text-center font-sans text-sm md:text-md md:font-semibold  '>{row.tag}</td>
                <td className={`text-center font-sans text-sm md:text-md md:font-semibold ${row.status ? "text-purple-500 text-md md:font-semibold font-extrabold" : ""}`}>{row.status ? "available" : "unavailable"}</td>
                <td className='text-center font-sans text-sm md:text-md md:font-semibold  '>{row.rent}</td>
              </tr>
            ))}
          </tbody>
        </table>
        }
      </div>
    </>
  )
}