import { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { UseQueryResult, useQuery } from "react-query"
import { Data } from "../components/units/UnitsList"
import apis from "../components/ApiService"
import { createContext } from "react"
import { fetchTenants, fetchUsers, fetchUtilities } from "../types/TypesDefinitions"



type Children = {
    children: ReactNode
}
type ContextType = {
    unitsMutation: UseQueryResult,
    tenantsMutation: UseQueryResult,
    utilitiesMutation: UseQueryResult,
    usersMutation: UseQueryResult,
    availability: boolean,
    setAvailability: Dispatch<SetStateAction<boolean>>,
    arrears: boolean,
    setArrears: Dispatch<SetStateAction<boolean>>,
    unpaidUtils: boolean,
    setUnpaidUtlis: Dispatch<SetStateAction<boolean>>,
    setSearch: Dispatch<SetStateAction<string>>,
    search: string,
    colorMode: boolean,
    setColorMode: Dispatch<SetStateAction<boolean>>,
    unApproved: boolean,
    setUnApproved: Dispatch<SetStateAction<boolean>>,
    auth: boolean,
    setAuth: Dispatch<SetStateAction<boolean>>,
    handleLogout: () => void

}

const MyContext = createContext<ContextType | undefined>(undefined)

export const useAppContext = () => {
    const context = useContext(MyContext)
    if (context == undefined) {
        throw new Error("context must be defined")
    }
    return context

}

export default function MyAppContextProvider({ children }: Children) {

    const [colorMode, setColorMode] = useState(false)
    const [auth, setAuth] = useState(localStorage.getItem("key") ? true : false)
    const unitsMutation = useQuery<Data, Error>("fetchedUnits", apis.fetchAllUnits)
    const tenantsMutation = useQuery<fetchTenants, Error>("fetchedTenants", apis.fetchAllTenants)
    const utilitiesMutation = useQuery<fetchUtilities, Error>("fetchedUtilities", apis.fetchAllUtilities)
    const usersMutation = useQuery<fetchUsers, Error>("fetchedUsers", apis.fetchUsers)
    const [availability, setAvailability] = useState(false)
    const [arrears, setArrears] = useState(false)
    const [search, setSearch] = useState("")
    const [unpaidUtils, setUnpaidUtlis] = useState(false)
    const [unApproved, setUnApproved] = useState(false)
    

    
    function handleLogout() {
        localStorage.clear();
        setAuth(false);
    }


    const contextValue = {
        unitsMutation, tenantsMutation, utilitiesMutation, usersMutation, availability, setAvailability, arrears, setArrears,
        unpaidUtils, setUnpaidUtlis, setSearch, search, colorMode, setColorMode, unApproved, setUnApproved, auth, setAuth,
        handleLogout
    }
    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    )

}