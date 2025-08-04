import mongoose, { Schema, model, models } from "mongoose";

export interface IResume {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  resumeLink: string;
  createdAt: Date;
  updatedAt: Date;
}


const resumeSchema = new Schema<IResume>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  resumeLink: { type: String, required: true },
}, { timestamps: true });


export const Resume = models?.Resume || model<IResume>("Resume", resumeSchema);