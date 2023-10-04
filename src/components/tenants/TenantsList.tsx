
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import DeletionModal from '../DeletionModal';
import { ContextType, TenantType, fetchTenants } from '../../types/TypesDefinitions';
import { SpinningCircles } from 'react-loading-icons';
import { useAppContext } from '../../contextApi/AppContext';

export default function TenantsList() {

  const [open, setOpen] = useState(false);
  const [myid, setId] = useState<number | null>(null)
  const { search } = useOutletContext<ContextType>()
  const [errors, setErrors] = useState<string | null>(null)
  const navigate = useNavigate();
  const handleOpen = (id: number) => {
    setOpen(true)
    setId(id)

  };
  const handleClose = () => {
    setOpen(false);
    setId(null)
    setErrors(null)
    navigate(`/tenants`)
  }

  const [tenants, setTenants] = useState<TenantType[]>([])

  const { tenantsMutation, arrears, colorMode } = useAppContext()


  useEffect(
    () => {
      if (tenantsMutation.data !== undefined) {
        if (arrears) {
          const allTenants = tenantsMutation.data as fetchTenants
          const data = allTenants.tenants.filter(tenant => tenant.payStatus === "unpaid")

          setTenants(data)
        } else {
          const allTenants = tenantsMutation.data as fetchTenants
          const data = allTenants.tenants
          setTenants(data)
        }
        if (arrears) {
          const allUtilities = tenantsMutation.data as fetchTenants

          const data = allUtilities.tenants.filter(tenant => tenant.payStatus === "unpaid")
          setTenants(data)
        } else if (search) {

          const allUtilities = tenantsMutation?.data as fetchTenants
          const data = allUtilities?.tenants?.filter(tenant => tenant.unit.unitNumber.toLowerCase().includes(search.toLowerCase()))
          setTenants(data)
        } else {
          const allUtilities = tenantsMutation?.data as fetchTenants
          const data = allUtilities?.tenants
          setTenants(data)
        }
      }
    },
    [arrears, search, tenantsMutation]
  )



  if (tenantsMutation.isLoading) {
    <SpinningCircles fill={"#4f46e5"} stroke={"#4f46e5"} />
  }
  if (tenantsMutation.error) {
    <div>
      <p>Error loading page: {JSON.stringify(tenantsMutation.error)}</p>
    </div>
  }


  return (
    <>
      <DeletionModal open={open} handleClose={handleClose} id={myid!} type={"tenant"} errors={errors!} setErrors={setErrors} />
      <div className='flex justify-center mt-4 p-2'>
        {(tenants === undefined || tenants && tenants.length === 0) && <div className={`${colorMode ? "text-slate-300" : ""} inline-flex mx-auto text-center text-lg `}> <strong>No tenants found</strong></div>}

        {tenants?.length > 0 && <table className='table-auto w-full md:w-[80%]  bg-indigo-400'>
          <thead>
            <tr className="border-b-2 text-xs border-black md:text-base ">
              <td className='text-right p-1 md:p-2 font-bold'>Id</td>
              <td className='text-right p-1 md:p-2 font-bold'>Name</td>
              <td className='text-right p-1 md:p-2 font-bold'>Phone</td>
              <td className='text-right p-1 md:p-2 font-bold'>Start-Enddate</td>
              <td className='text-right p-1 md:p-2 font-bold'>Paystatus</td>
              <td className='text-right p-1 md:p-2 font-bold'>Unitnumber</td>
            </tr>
          </thead>
          <tbody>
            {tenants.map((row: TenantType, index) => (
              <tr key={row.id} className='odd:bg-indigo-200 even:bg-indigo-300 text-xs md:text-base'>
                <td className='text-right p-1 md:p-2 '>
                  <div className='flex items-center '>
                    {index + 1}.
                    <div>
                      <svg onClick={() => handleOpen(row.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-1 text-xs text-red-600 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                    </div>

                  </div>
                </td >
                <td className='text-center font-sans text-sm '>{row.firstName + " " + row.lastName}</td>
                <td className='text-center font-sans text-sm '>{row.phone}</td>
                <td className='text-center font-sans text-sm '>{row.start + "__" + `${(row.ended == null) ? "" : row.ended}`}</td>
                <td className={`text-center font-sans text-sm ${row.payStatus === "unpaid" ? "text-red-500" : ""}`}>{row.payStatus}</td>
                <td className='text-center font-sans text-sm '>{row.unit.unitNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
        }
      </div>
    </>
  )
}