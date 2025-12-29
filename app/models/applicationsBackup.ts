import { model, models, Schema } from "mongoose";

interface IApplicationBackup {
    originalApplicationId: Schema.Types.ObjectId;
    data: object;
    deleteBy: Schema.Types.ObjectId;
    recoveryUntil: Date
}

const ApplicationBackupSchema = new Schema<IApplicationBackup>({
    originalApplicationId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    data:{
        type: Object,
        required: true
    },
    deleteBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    recoveryUntil: {
          type: Date,
      required: true,
      index: true,
    }
},{timestamps: true});


export const ApplicationBackup = models?.ApplicationBackup || model<IApplicationBackup>("ApplicationBackup", ApplicationBackupSchema);