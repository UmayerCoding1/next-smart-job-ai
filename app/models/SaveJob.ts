import mongoose, { Schema, model, models } from "mongoose";

export interface ISaveJob {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const svaeJobSchema = new Schema<ISaveJob>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  },
  { timestamps: true }
);

export const SaveJob =
  models?.SaveJob || model<ISaveJob>("SaveJob", svaeJobSchema);
