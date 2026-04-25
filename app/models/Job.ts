import mongoose, { Schema, model, models } from "mongoose";
import { ICompany } from "./Company";

export interface ISalary {
  negotiable?: boolean;
  min?: number;
  max?: number;
}

export enum JobTypes {
  FULLTILE = "full-time",
  PARTTIME = "part-time",
  REMOTE = "remote",
  HYBRID = "hybrid",
  FREELANCE = "freelance",
  INTERNSHIP = "internship",
  CONTRACT = "contract",
}

export enum ExperienceLevel {
  INTERNSHIP = "internship",
  ENTRY = "entry",
  MID = "mid",
  SENIOR = "senior",
  LEAD = "lead",
}

export enum JobShift {
  DAY = "day",
  NIGHT = "night",
  FLEXIBLE = "flexible",
}

export enum JobStatus {
  ACTIVE = "active",
  CLOSED = "closed",
  PAUSED = "paused",
  DRAFT = "draft",
}

export interface IJob {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  company: mongoose.Types.ObjectId | ICompany;
  recruiter: mongoose.Types.ObjectId;
  location: string;
  salaryrange?: ISalary;
  jobtype: string[];
  skills: string[];
  education?: string[];
  experience?: string[];
  experienceLevel: string[];
  dedline: Date;
  category: string;
  holidayPolicy?: string;
  workTime: {
    start: string;
    end: string;
  };
  requirements: string[];
  shift: string[];
  benefits: string[];
  vacancies: number;
  isRemoteAvailable: boolean;
  status: string;
  applicationsQuestions: string[];
  appliedjobs?: mongoose.Types.ObjectId[];
  totalApplications?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    recruiter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String, required: true },

    salaryrange: {
      negotiable: { type: Boolean, default: false },
      min: { type: Number },
      max: { type: Number },
    },

    jobtype: {
      type: [String],
      required: true,
      enum: Object.values(JobTypes),
    },

    skills: { type: [String], default: [], required: true },
    education: { type: [String], default: [], required: true },

    experience: {
      type: [String],
      required: true,

    },

    // 🟢 fixed
    experienceLevel: [
      {
        type: String,
        require: true,
        enum: Object.values(ExperienceLevel),
      }
    ],

    dedline: { type: Date, required: true },
    category: { type: String, required: true },

    holidayPolicy: {
      type: String,
      default: "Standard national holidays and company holidays apply.",
    },

    workTime: {
      start: { type: String, default: "09:00 AM" },
      end: { type: String, default: "05:00 PM" },
    },

    requirements: {
      type: [String],
      default: [],
    },

    // 🟢 fixed
    shift: [
      {
        type: String,
        enum: Object.values(JobShift),
        default: [JobShift.DAY],
      }
    ],

    benefits: { type: [String], default: ["Medical", "Festival Bonus"] },
    vacancies: { type: Number, default: 1 },
    isRemoteAvailable: { type: Boolean, default: false },

    applicationsQuestions: {
      type: [String],
      default: [],
    },

    appliedjobs: [{ type: Schema.Types.ObjectId, ref: "User" }],

    status: {
      type: String,
      default: JobStatus.PAUSED,
      enum: Object.values(JobStatus),
    },
  },
  { timestamps: true }
);

JobSchema.index({ company: 1, title: 1 });
JobSchema.index({ jobtype: 1, status: 1 });
JobSchema.index({ location: 1, status: 1 });
JobSchema.index({ title: "text" });

export const Job = models.Job || model<IJob>("Job", JobSchema);
