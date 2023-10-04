export type UnitType = {
    id: number,
    plotName: string,
    unitNumber: string,
    tag: string,
    status: boolean,
    rent: number
  }

export type TenantReqType = {
     firstName: string,
     lastName:string,
     phone:string,
     unitNumber:string,

}
export type fetchUnits = {
     units: UnitType[]
}
export type fetchTenants = {
     tenants: TenantType[]
}
export type StatusUpdateReqDto = {
     phone:string,
     payStatus:string,
}
export type TenantType = {
    

    id: number,
    firstName: string,
    lastName: string,
    phone: string,
    start: string,
    ended: string | null,
    payStatus: string,
    unit:UnitType
}

export type UtilityType = {
     id: number,
     date: string,
     waterBill: string,
     garbage: string,
     unitNumber: string,
     amountPaid: string,
     status: string,
     unit: UnitType
 }

export type fetchUtilities = {
     utilsPayments: UtilityType[]
}
export type RegisterUtilityFormData = {

     waterBill: string,
     garbage: string,
     amountPaid: string,
     unitNumber: string
 
 }

 export type ContextType ={
     search:string
   }
export type CommonResponseMsg = {
     message: string
}
export type User = {   

     id:number,
     email:string,
     status:boolean,
     message:string,
     token:string,
     role:string,
        
      }
export type fetchUsers = {
     users: User[]
}
export type LoginFormdata= {
     email: string,
     password: string
 }
 export type LoginRes = {
      id: number,
      email: string,
      status: boolean,
      message: string,
      token: string,
      role: string,
 }
export type ChangePasswordFormdata= {
     oldPassword: string,
     newPassword: string
 }