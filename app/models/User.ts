import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";


export const ROLE = {
  JOBSEEKER: "jobseeker",
  RECRUITER: "recruiter",
  ADMIN: "admin",
} as const;

export const VERIFIED = {
  UNVERIFIED: "unverified",
  VERIFIED: "verified",
} as const;

export const LOGIN_METHOD = {
  CUSTOM: "custom",
  GOOGLE: "google",
  FACEBOOK: "facebook",
} as const;

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLACKLISTED = "blacklisted",
}

export interface IEducation {
  degree: string;
  institution: string;
  year: number;
}

export interface IAppliedJob {
  jodId: mongoose.Types.ObjectId;
  appliedAt: Date;
  status: string;
}

export interface IUser {
  _id?: mongoose.Types.ObjectId | string;
  fullname: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  loginMethod: string;
  googleId?: string;
  facebookId?: string;
  countryCode?: string;
  phone?: string;
  otp?: {
    code: number;
    expiresAt: Date;
  };
  isOtpVerified: boolean;
  education: IEducation[];
  savejobs?: mongoose.Types.ObjectId[];
  appliedjobs?: IAppliedJob[];
  company?: mongoose.Types.ObjectId;
  postJobs?: mongoose.Types.ObjectId[];
  profileComplete: number;
  isVerified: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: ROLE.JOBSEEKER,
      enum: Object.values(ROLE),
    },
    countryCode: {
      type: String,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
      default: "", // or a default avatar URL
    },
    loginMethod: {
      type: String,
      required: true,
      enum: Object.values(LOGIN_METHOD),
    },
    googleId: {
      type: String,
      default: null,
    },
    facebookId: {
      type: String,
      default: null,
    },
    otp: {
      code: { type: Number },
      expiresAt: { type: Date,  default: () => new Date(Date.now() + 5 * 60 * 1000)},
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    education: [
      {
        degree: { type: String, required: false },
        institution: { type: String, required: false },
        year: { type: Number, required: false },
      },
    ],
    savejobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    appliedjobs: [
      {
        jodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          default: "pending",
        },
      },
    ],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    postJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    profileComplete: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: String,
      default: VERIFIED.UNVERIFIED,
      enum: Object.values(VERIFIED),
    },
    status: {
      type: String,
      default: Status.ACTIVE,
      enum: Object.values(Status),
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = models.User || model<IUser>("User", userSchema);
