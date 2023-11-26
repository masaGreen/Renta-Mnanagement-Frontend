

import { useEffect, useState } from 'react';
import DeletionModal from '../DeletionModal';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ContextType, UtilityType, fetchUtilities } from '../../types/TypesDefinitions';
import { SpinningCircles } from 'react-loading-icons';
import { useAppContext } from '../../contextApi/AppContext';





export default function UtilitiesList() {
  const [utilities, setUtilities] = useState<UtilityType[]>([])
  const [open, setOpen] = useState(false);
  const [myid, setId] = useState<number | null>(null)
  const { search } = useOutletContext<ContextType>()
  const [errors, setErrors] = useState<string | null>(null)
  const navigate = useNavigate()

  const { utilitiesMutation, unpaidUtils, colorMode } = useAppContext()
  const handleOpen = (id: number) => {
    setOpen(true)
    setId(id)

  };
  const handleClose = () => {
    setOpen(false);
    setId(null)
    setErrors(null)
    navigate(`/utilities`)
  }

  useEffect(
    () => {
      if (utilitiesMutation.data !== undefined) {
        if (unpaidUtils) {
          const allUtilities = utilitiesMutation.data as fetchUtilities

          const data = allUtilities.utilsPayments.filter(utility => utility.status === "unpaid")
          setUtilities(data)
        } else if (search) {

          const allUtilities = utilitiesMutation.data as fetchUtilities
          const data = allUtilities.utilsPayments.filter(utility => utility.unitNumber.toLowerCase().includes(search.toLowerCase()))
          setUtilities(data)
        } else {
          const allUtilities = utilitiesMutation.data as fetchUtilities
          const data = allUtilities.utilsPayments
          setUtilities(data)
        }
      }

    },
    [unpaidUtils, search, utilitiesMutation]
  )

  if (utilitiesMutation.isFetching) {
    <SpinningCircles fill={"#4f46e5"} stroke={"#4f46e5"} />
  }
  if (utilitiesMutation.isLoading) {
    <SpinningCircles fill={"#4f46e5"} stroke={"#4f46e5"} />
  }
  if (utilitiesMutation.error) {
    <div>
      <p>Error loading page: {JSON.stringify(utilitiesMutation.error)}</p>
    </div>
  }



  return (
    <>
      <DeletionModal open={open} handleClose={handleClose} id={myid!} type='utility' errors={errors!} setErrors={setErrors} />

      <div className='flex justify-center mt-4 p-2  w-full'>

        {(utilities && utilities.length === 0) && <div className={`${colorMode ? "text-slate-300" : ""} inline-flex mx-auto text-center text-lg `}> <strong>No utilities found</strong></div>}
        {(utilities === undefined) && <div className={`${colorMode ? "text-slate-300" : ""} inline-flex mx-auto text-center text-lg `}> <SpinningCircles/> </div>}
        {utilities?.length > 0 && <table className='w-full  md:w-[85%] bg-indigo-400 shadow'>
          <thead>
            <tr className="border-b-2 text-xs  md:text-base border-black">
              <td className='text-center p-1 md:p-2  font-bold'>Id</td>
              <td className='text-center p-1 md:p-2  font-bold'>Date</td>
              <td className='text-center p-1 md:p-2  font-bold'>Waterbill</td>
              <td className='text-center p-1 md:p-2  font-bold'>Garbage</td>
              <td className='text-center p-1 md:p-2  font-bold'>Amt-Paid</td>
              <td className='text-center p-1 md:p-2  font-bold'>Status</td>
              <td className='text-center p-1 md:p-2  font-bold'>Bal</td>
              <td className='text-center p-1 md:p-2  font-bold'>Unit</td>
            </tr>
          </thead>
          <tbody>

            {utilities.map((row, index) => (
              <tr key={row.id} className='odd:bg-indigo-200 even:bg-indigo-300 text-xs md:text-base'>
                <td className='text-right p-1  font-semibold text-xs '>
                  <div className='flex items-center ga  '>
                    {index + 1}.
                    <div>
                      <svg onClick={() => handleOpen(row.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 m-l-1 text-xs text-red-600 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className='text-center font-sans text-sm  '>{row.date[0]+"-"+row.date[1]+"-"+row.date[2]}</td>
                <td className='text-center font-sans text-sm  '>{row.waterBill}</td>
                <td className='text-center font-sans text-sm  '>{row.garbage}</td>
                <td className='text-center font-sans text-sm  '>{row.amountPaid}</td>
                <td className={`text-center font-sans text-sm ${row.status === "unpaid" ? "text-red-500" : ""}`}>{row.status}</td>
                <td className='text-center font-sans text-sm  '>{row.carriedForward}</td>
                <td className='text-center font-sans text-sm  '>{row.unitNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </>
  )
}