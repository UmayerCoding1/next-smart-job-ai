import mongoose,{Schema,model, models} from "mongoose";


export enum ActiveStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLACKLISTED = "blacklisted",
}
export interface ICompany {
    _id?: mongoose.Types.ObjectId | string
    name: string
    email: string
    description: string
    website: string
    logo: string
    location: string
    industry: string
    activeStatus: string
    recoveryLastDate?: Date
    recruiter: mongoose.Types.ObjectId
}
 

 const companySchema = new Schema<ICompany>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String, required: true },
    location: { type: String, required: true },
    industry: { type: String, required: true },
    activeStatus: { type: String, default: ActiveStatus.ACTIVE, enum: Object.values(ActiveStatus) },
    recoveryLastDate: { type: Date },
    recruiter: { type: Schema.Types.ObjectId, ref: "User", required: true },
  }, {timestamps: true});
  
  export const Company = models?.Company || model<ICompany>("Company", companySchema);