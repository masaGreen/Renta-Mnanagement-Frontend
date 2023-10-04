import { useMutation, useQueryClient } from "react-query";
import { CommonResponseMsg, ContextType, User, fetchUsers } from "../../types/TypesDefinitions";
import apis from "../ApiService";
import { useEffect, useState } from "react";
import { ApprovalData } from "../../pages/UserApproval";
import { AxiosError } from "axios";
import { SpinningCircles } from "react-loading-icons";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import DeletionModal from "../DeletionModal";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [emailData, setEmailData] = useState<string | null>(null)
  const [myid, setId] = useState<number | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [errors, setErrors] = useState<string | null>(null)
  const [errorClose, setErrorClose] = useState(false)
  const { search } = useOutletContext<ContextType>()
  const navigate = useNavigate();
  const { usersMutation, colorMode, unApproved, handleLogout, auth } = useAppContext()
  const userEmail = localStorage.getItem("email")
  const client = useQueryClient();
  const mutation = useMutation<boolean, Error, ApprovalData>(
    "approveUser",
    (data) => apis.approveUser(data),
    {
      onSuccess: () => {
        client.invalidateQueries("fetchedUsers")
        setEmailData(null)
        navigate("/adminPanel")
      },
      onError: (error) => {

        setErrorClose(true)
        setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).message)
      }
    }
  )



  const handleOpen = (id: number) => {
    if (users.length === 1) {
      handleLogout()
    } else {
      setOpen(true)
      setId(id)
    }



  };
  const handleClose = () => {
    setOpen(false);
    setId(null)
    setErrors(null)
    navigate(`/adminPanel`)
  }
  const handleApproval = (email: string) => {
    const data = { email: email }
    setEmailData(email)
    if (userEmail === email) {
      handleLogout()
      mutation.mutate(data)
    } else {
      mutation.mutate(data)
    }

  }




  useEffect(
    () => {
      if (usersMutation.data !== undefined) {
        if (unApproved) {
          const allUsers = usersMutation.data as fetchUsers

          const data = allUsers.users.filter(user => user.status == false)
          setUsers(data)
        } else if (search) {

          const allUsers = usersMutation?.data as fetchUsers
          const data = allUsers?.users?.filter(user => user.email.toLowerCase().includes(search.toLowerCase()))
          setUsers(data)
        } else {
          const allUsers = usersMutation?.data as fetchUsers
          const data = allUsers?.users
          setUsers(data)
        }
      }
    },
    [unApproved, search, usersMutation, auth, emailData]
  )




  if (usersMutation.isLoading) {
    <SpinningCircles fill={"#4f46e5"} stroke={"#4f46e5"} />
  }
  if (mutation.isLoading) {
    <SpinningCircles fill={"#4f46e5"} stroke={"#4f46e5"} />
  }


  return (
    <>
      <DeletionModal open={open} handleClose={handleClose} id={myid!} type='user' errors={errors!} setErrors={setErrors} />
      {errorClose &&
        <div className="flex h-[30px] p-2 gap-1 rounded bg-red-500 items-center justify-center font-semibold absolute top-[40%] right-[30%]">
          <p>Approval unsuccessful, try again</p>
          <button onClick={() => setErrorClose(false)} className="bg-transparent hover:bg-red-700 rounded-full p-1">x</button>

        </div>
      }
      {emailData &&
        <div className="flex  p-2 gap-1 rounded bg-green-500 items-center justify-center font-semibold absolute top-[40%] right-[30%]">
          <SpinningCircles />

        </div>
      }
      <div className='flex justify-center mt-4 p-1 md:p-2'>
        {(users === undefined || users && users.length === 0) && <div className={`${colorMode ? "text-slate-300" : ""} inline-flex mx-auto text-center text-lg `}> <strong>No users in this category</strong></div>}

        {users?.length > 0 && <table className='table-auto w-full  md:w-[80%] border-2 border-indigo-400  bg-indigo-400 '>
          <thead>
            <tr className="border-b-2 text-xs md:text-base  border-black ">
              <th className='text-center p-1 md:p-2 font-bold'>Id</th>
              <th className='text-center p-1 md:p-2 font-bold'>Email</th>
              <th className='text-center p-1 md:p-2 font-bold'>Role</th>
              <th className='text-center p-1 md:p-2 font-bold'>Status</th>

            </tr>
          </thead>
          <tbody>
            {users?.map((row: User, index) => (
              <tr key={row.id} className='odd:bg-indigo-200 even:bg-indigo-300 text-xs md:text-base'>
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
                <td className='text-center font-sans text-sm  '>
                  {row.email}

                </td>
                <td className='text-center font-sans text-sm  '>{row.role}</td>
                <td className={`text-center font-sans text-sm ${row.status ? "text-indigo-800 text-lg font-bold" : ""}`}>
                  <div className="flex items bg-center justify-center gap-2  ">
                    <p className="">{row.status ? "Approved" : "Pending"}</p>
                    {

                      row.status ?

                        <button onClick={() => {

                          handleApproval(row.email)
                        }} className="px-1  md:px-2 bg-red-500 text-black hover:bg-red-700 cursor-pointer rounded m-l-1">
                          Revoke
                        </button>
                        :

                        <button onClick={() => {

                          handleApproval(row.email)
                        }} className="px-1  md:px-2 bg-green-500  hover:bg-green-700 cursor-pointer text-black rounded m-l-1">
                          Approve
                        </button>

                    }

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        }
      </div>
    </>
  )
}