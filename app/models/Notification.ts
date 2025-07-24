import mongoose, { Schema, model, models } from "mongoose";

export interface INotification{
    userId: mongoose.Types.ObjectId;
    message: string;
    isRead: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export const NotificationSchema = new Schema<INotification>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  }, {timestamps: true});
  
  export const Notification = models?.Notification || model<INotification>("Notification", NotificationSchema);