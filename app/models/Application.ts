import mongoose, { Schema, model, models } from "mongoose";

export interface IApply {
  _id?: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  name: string;
  email: string;
  applicant: mongoose.Types.ObjectId;
  resumeLink: string;
  countryCode: string;
  phone: string;
  status: string;
  appliedAt: Date;
  expectedSalary: number;
  coverLetter: string;
  jobRelatedQuestions?: {
    question: string;
    answer: string;
  }[];
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const application = new Schema<IApply>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  resumeLink: { type: String, required: true },
  expectedSalary: { type: Number, required: true },
  countryCode: { type: String, required: true },
  phone: { type: String, required: true },
  jobRelatedQuestions: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
  coverLetter: { type: String , required: true },
  isRead: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "reviewed", "interview", "rejected", "accepted"],
    default: "pending",
  },
  appliedAt: { type: Date, default: Date.now },
});


export const Application = models.Application || model<IApply>("Application", application);

