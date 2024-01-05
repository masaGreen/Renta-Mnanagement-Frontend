import axios from "axios"
import { SignupFormdata } from "../pages/Signup"
import { ChangePasswordFormdata, LoginFormdata, RegisterUtilityFormData, StatusUpdateReqDto, TenantReqType } from "../types/TypesDefinitions"
import { RegisterFormData } from "./units/RegisterUnit"
import { UpdateResponse } from "./units/UpdateStatus"
import { ApprovalData } from "../pages/UserApproval"

// const BASE_URL = "http://localhost:8080/v1/"
 const BASE_URL = "https://rental-back-end.onrender.com/v1/"
const apiClient = axios.create({
    baseURL: BASE_URL
})

const signUp = async (data: SignupFormdata) => {
    const res = await axios.post(BASE_URL+"auth/signup", data,
    {
        headers: {
            "Content-Type": "Application/json",
            
        }
    })
    return res.data;
}
const logUser = async (data: LoginFormdata) => {
    const res = await axios.post(BASE_URL+"auth/login", data, {
        headers: {
            "Content-Type": "application/json",
           
        }
    })
    return res.data;
}
const approveUser = async (data: ApprovalData) => {
    console.log(data.email)
    console.log(localStorage.getItem("key"))
    const res = await apiClient.post("auth/approveUser", data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}
const changePassword = async (data: ChangePasswordFormdata) => {
    const res = await apiClient.post("auth/changePassword", data,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}
const fetchUsers = async () => {
    const res = await apiClient.get("auth/all-users",{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}
const deleteUserById = async (id: number) => {
    const res = await apiClient.delete(`auth/deleteUser/${id}`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}

//units
const fetchAllUnits = async () => {
    const res = await apiClient.get("units",{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}
const registerUnit = async (data: RegisterFormData) => {
    const res = await apiClient.post("units", data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}

const updateUnitStatus = async (data: UpdateResponse) => {
    const res = await apiClient.get("units/updateUnitStatus/" + data.message, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })

    return res.data;
}
const deleteUnitById = async (id: number) => {
    const res = await apiClient.delete(`units/deleteUnit/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}

//tenants
const fetchAllTenants = async () => {
    const res = await apiClient.get("tenants", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}
const registerTenant = async (data: TenantReqType) => {
    const res = await apiClient.post("tenants", data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}

const updateTenantPaymentStatus = async (data: StatusUpdateReqDto) => {
    const res = await apiClient.post("tenants/updatePaymentStatus" ,data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}
const deleteTenantById = async (id: number) => {
    const res = await apiClient.delete(`tenants/deleteTenant/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}

//utilities

const fetchAllUtilities = async () => {
    const res = await apiClient.get("utilities", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}
const registerUtility = async (data: RegisterUtilityFormData) => {
    const res = await apiClient.post("utilities", data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    }
    )
    return res.data;
}


const deleteUtilityById = async (id: number) => {
    const res = await apiClient.post(`utilities/deleteUtilities/${id}`, {
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`
        }
    })
    return res.data;
}


export default {
    signUp, logUser, changePassword, fetchUsers, deleteUserById, approveUser,
    registerUnit, deleteUnitById, fetchAllUnits, updateUnitStatus,
    registerTenant, deleteTenantById, updateTenantPaymentStatus, fetchAllTenants,
    deleteUtilityById, fetchAllUtilities, registerUtility
}
