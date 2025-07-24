import mongoose, { Schema, model, models } from "mongoose";

export enum ReportType {
  JOB = "job",
  USER = "user",
}

export enum ReportStatus {
  PENDING = "pending",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export interface IReport {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  reason: string;
  type: string;
  reportExpiredAt?: Date;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ReportSchema = new Schema<IReport>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  reason: { type: String, required: true },
  type: { type: String, required: true, enum: Object.values(ReportType) },
  reportExpiredAt: { type: Date },
  status: {
    type: String,
    default: ReportStatus.PENDING,
    enum: Object.values(ReportStatus),
  },
});

export const Report = models?.Report || model<IReport>("Report", ReportSchema);
