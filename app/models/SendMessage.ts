import mongoose, { Schema, model, models } from "mongoose";

interface ISendMessageForApplicant {
  _id?: Schema.Types.ObjectId;
  recruiter: mongoose.Types.ObjectId;
  applicant: mongoose.Types.ObjectId;
  appicationId: mongoose.Types.ObjectId;
  email: string;
  emailSendDate: Date;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const sendMessageForApplicant = new Schema<ISendMessageForApplicant>(
  {
    recruiter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
    appicationId: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    email: { type: String, required: true },
    emailSendDate: { type: Date, default: Date.now, required: true },
    expiresAt: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true }
);

export const SendMessageForApplicant =
  models?.SendMessageForApplicant ||
  model<ISendMessageForApplicant>(
    "SendMessageForApplicant",
    sendMessageForApplicant
  );
