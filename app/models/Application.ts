import mongoose, { Schema, model, models } from "mongoose";

export interface IApplication {
  _id?: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  applicant: mongoose.Types.ObjectId;
  resumeLink: string;
  status: string;
  appliedAt: Date;
  expectedSalary: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ApplicationSchema = new Schema<IApplication>({
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  resumeLink: { type: String, required: true },
  expectedSalary: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "reviewed", "interview", "rejected", "accepted"],
    default: "pending",
  },
  appliedAt: { type: Date, default: Date.now },
});


export const Application = models?.Application || model<IApplication>("Application", ApplicationSchema);