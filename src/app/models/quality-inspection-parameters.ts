// import params from "../config/constants"

export class QualityInspectionParameters {
    Line_Number?:string
    Timestamp!:number
    Model="Otto"
    Defect_ID?:string
    Product_Number?:string
    Surface_Name?:string
    Defect_Type?:string
    Authenticity="Mark"
    Status?:string
}
