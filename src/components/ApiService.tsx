import axios from "axios"
import { SignupFormdata } from "../pages/Signup"
import { ChangePasswordFormdata, LoginFormdata, RegisterUtilityFormData, StatusUpdateReqDto, TenantReqType } from "../types/TypesDefinitions"
import { RegisterFormData } from "./units/RegisterUnit"
import { UpdateResponse } from "./units/UpdateStatus"
import { ApprovalData } from "../pages/UserApproval"

const jwt = localStorage.getItem("key")
const apiClient = axios.create({
    baseURL: "http://localhost:5173/v1/",
    headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${jwt ? jwt : ""}`
    }
})

const signUp = async (data: SignupFormdata) => {
    const res = await axios.post("http://localhost:5173/v1/signup", data)
    return res.data;
}
const logUser = async (data: LoginFormdata) => {
    const res = await axios.post("http://localhost:5173/v1/auth/login", data)
    return res.data;
}
const approveUser = async (data: ApprovalData) => {
    const res = await axios.post("auth/approveUser", data)
    return res.data;
}
const changePassword = async (data: ChangePasswordFormdata) => {
    const res = await apiClient.post("auth/changePassword", data)
    return res.data;
}
const fetchUsers = async () => {
    const res = await apiClient.get("auth")
    return res.data;
}
const deleteUserById = async (id: number) => {
    const res = await apiClient.delete(`auth/deleteUser/${id}`)
    return res.data;
}

//units
const fetchAllUnits = async () => {
    const res = await apiClient.get("units")
    return res.data;
}
const registerUnit = async (data: RegisterFormData) => {
    const res = await apiClient.post("units", data)
    return res.data;
}

const updateUnitStatus = async (data: UpdateResponse) => {
    const res = await apiClient.get("units/updateUnitStatus/" + data.message)
    return res.data;
}
const deleteUnitById = async (id: number) => {
    const res = await apiClient.delete(`units/deleteUnit/${id}`)
    return res.data;
}

//tenants
const fetchAllTenants = async () => {
    const res = await apiClient.get("tenants")
    return res.data;
}
const registerTenant = async (data: TenantReqType) => {
    const res = await apiClient.post("tenants", data)
    return res.data;
}

const updateTenantPaymentStatus = async (data: StatusUpdateReqDto) => {
    const res = await apiClient.post("tenants/updatePaymentStatus" + data)
    return res.data;
}
const deleteTenantById = async (id: number) => {
    const res = await apiClient.delete(`tenants/deleteTenant/${id}`)
    return res.data;
}

//utilities

const fetchAllUtilities = async () => {
    const res = await apiClient.get("utilities")
    return res.data;
}
const registerUtility = async (data: RegisterUtilityFormData) => {
    const res = await apiClient.post("utilities", data)
    return res.data;
}


const deleteUtilityById = async (id: number) => {
    const res = await apiClient.post(`utilities/deleteUtilities/${id}`)
    return res.data;
}


export default {
    signUp, logUser, changePassword, fetchUsers, deleteUserById, approveUser,
    registerUnit, deleteUnitById, fetchAllUnits, updateUnitStatus,
    registerTenant, deleteTenantById, updateTenantPaymentStatus, fetchAllTenants,
    deleteUtilityById, fetchAllUtilities, registerUtility
}