import mongoose, { Schema, model, models } from "mongoose";
import { ICompany } from "./Company";

export interface ISalary {
  negotiable?: boolean;
  min?: number;
  max?: number;
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
  dedline: string;
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
      enum: [
        "full-time",
        "part-time",
        "remote",
        "hybrid",
        "freelance",
        "internship",
        "contract",
      ],
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
        enum: ["internship", "entry", "mid", "senior", "lead"], 
      }
    ],

    dedline: { type: String, required: true },
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
        enum: ["day", "night", "flexible"],
      default: ["day"],
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
      default: "active",
      enum: ["active", "closed", "paused", "draft"], 
    },
  },
  { timestamps: true }
);

JobSchema.index({ company: 1, title: 1 });
JobSchema.index({ jobtype: 1, status: 1 });
JobSchema.index({ location: 1, status: 1 });
JobSchema.index({ title: "text" });

export const Job = models.Job || model<IJob>("Job", JobSchema);
