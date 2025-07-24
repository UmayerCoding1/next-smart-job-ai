
import mongoose, { Schema, model, models } from "mongoose";

export interface IJobMatchScore {
    userId: mongoose.Types.ObjectId;
    jobId: mongoose.Types.ObjectId;
    score: number
}
const jobMatchScoreSchema = new Schema<IJobMatchScore>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
  },
  score: {type: Number},
});


export const JobMatchScore = models?.JobMatchScore || model<IJobMatchScore>("JobMatchScore", jobMatchScoreSchema);