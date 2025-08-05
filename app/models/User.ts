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

export enum SOCIAL_MEDIA {
  FACEBOOK = "facebook",
  TWITTER = "twitter",
  LINKEDIN = "linkedin",
  INSTAGRAM = "instagram",
  GITHUB = "github",
}

export interface IEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface IAppliedJob {
  jod: mongoose.Types.ObjectId;
  appliedAt: Date;
  status: string;
}

export interface IUser {
  _id?: mongoose.Types.ObjectId | string;
  fullname: string;
  email: string;
  password: string;
  username: string;
  role: string;
  about?: string;
  avatar?: string;
  coverImage?: string;
  resume?: string;
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
  appliedjobs?: mongoose.Types.ObjectId[] | IAppliedJob[];
  company?: mongoose.Types.ObjectId;
  postJobs?: mongoose.Types.ObjectId[];
  profileComplete: number;
  isVerified: string;
  socialLinks?: [
    {
      platform: string;
      link: string;
  }]
  profileView: {
    count: number;
  };
  subscription?: {
    plan: string;
    duration: string;
    startDate: Date;
    expiresAt: Date;
    isActive: boolean;
    paymentId?: string;
  }
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
    username: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: ROLE.JOBSEEKER,
      enum: Object.values(ROLE),
    },
    about: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    resume: {
      type: String,
      default: "",
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
      expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 5 * 60 * 1000),
      },
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: String },
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
        apply: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Apply",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      }
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
    socialLinks: [
      {
        platform: {
          type: String,
          enum: Object.values(SOCIAL_MEDIA),
        },
        link: {
          type: String,
        },
      }
    ],
    profileView: {
      count: {
        type: Number,
        default: 0,
      },
    },
    subscription: {
      plan: {
        type: String,
        enum: ["free", "growth", "professional"],
        default: "free",
      },
      duration: {
        type: String,
        enum: ["monthly", "yearly"],
        default: "monthly",
      },
      startedAt: {
        type: Date,
      },
      expiresAt: {
        type: Date,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      paymentId: {
        type: String, // optional: store Stripe/SSLCommerz transaction ID
      },
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

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};
