export type tenantValidationErrors = {
    firstName?: string,
    lastName?:string,
    phone?:string,
    unitNumber?:string,

}
export type unitValidationErrors = {
    unitNumber?: string;
    plotName?: string;
    tag?: string;
    rent?: string;
};
export type UtilityValidationErrors={
    unitNumber?:string
};