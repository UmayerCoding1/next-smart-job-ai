import mongoose, { Schema, model, models } from "mongoose";

// if user send a resume to save first in database .then same user will send another resume to delete previous resume  ;

export interface IResumeAnalysis {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  keywords: string[];
  summary: string;
  jobTitle: string;
  skills: string[];
  educationLavel: string[];
  yearsOfExperience: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const resumeAnalysisSchema = new Schema<IResumeAnalysis>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  keywords: { type: [String] },
  summary: { type: String },
  jobTitle: { type: String, required: true },
  skills: { type: [String], required: true },
  educationLavel: { type: [String] },
  yearsOfExperience: { type: Number },
});


export const ResumeAnalysis = models?.ResumeAnalysis || model<IResumeAnalysis>("ResumeAnalysis", resumeAnalysisSchema);