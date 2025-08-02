import mongoose, { Schema, model, models } from "mongoose";

export interface IResume {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  resumeLink: string;
  createdAt: Date;
  updatedAt: Date;
}
