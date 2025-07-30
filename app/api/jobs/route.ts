// import { Company } from "@/app/models/Company";
import { Company } from "@/app/models/Company";
import { IJob, Job } from "@/app/models/Job";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { FilterQuery } from "mongoose";

// shift,vacancies,isRemoteAvailable

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body: IJob = await request.json();
    const {
      title,
      description,
      company,
      recruiter,
      location,
      salaryrange,
      jobtype,
      skills,
      education,
      experience,
      experienceLevel,
      dedline,
      category,
      holidayPolicy,
      requirements,
      workTime,
      applicationsQuestions,
    } = body;

    const auth = await withAuth(request, { allowedRoles: "recruiter" });
    if (!auth.ok) return auth.response;

    if (
      !title ||
      !description ||
      !company ||
      !recruiter ||
      !location ||
      !salaryrange ||
      !jobtype ||
      !skills.length ||
      !education ||
      !experience ||
      !experienceLevel ||
      !requirements ||
      !dedline ||
      !category ||
      !holidayPolicy ||
      !workTime ||
      !applicationsQuestions
    ) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    const existingCompany = await Company.findById(company);

    if (!existingCompany) {
      return NextResponse.json(
        { message: "Company not found", success: false },
        { status: 404 }
      );
    }

    await Job.create({
      title,
      description,
      company,
      recruiter,
      location,
      salaryrange,
      jobtype,
      skills,
      education,
      experience,
      dedline,
      category,
      holidayPolicy,
      experienceLevel,
      requirements,
      workTime,
      applicationsQuestions,
      ...(body.shift && { shift: body.shift }),
      ...(body.vacancies && { vacancies: body.vacancies }),
      ...(body.isRemoteAvailable && {
        isRemoteAvailable: body.isRemoteAvailable,
      }),
    });

    return NextResponse.json(
      { message: "Job posted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Job post error", error);
    return NextResponse.json(
      { message: "Failed to post job", success: false },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    const existingJobId = searchParams.get("existingJodId");
    const jobtitle = searchParams.get("title");
    const jobType = searchParams.get("jobType");
    const location = searchParams.get("location");

    if (existingJobId && !mongoose.Types.ObjectId.isValid(existingJobId)) {
      return NextResponse.json(
        { message: "Invalid job ID", success: false },
        { status: 400 }
      );
    }

    const filter: FilterQuery<IJob> = {};
    if (existingJobId) filter._id = existingJobId;
    if (jobtitle) {
      filter.title = {
        $regex: new RegExp(jobtitle, "i"),
      };
    }
    if (jobType) {
      filter.jobtype = {
        $elemMatch: { $regex: new RegExp(jobType, "i") },
      };
    }
    if (location) {
      filter.location = {
        $regex: new RegExp(location, "i"),
      };
    }

    console.log(filter);
    
    const jobs = await Job.find(filter).populate("company");

    return NextResponse.json({ jobs, success: true }, { status: 200 });
  } catch (error) {
    console.log("Job get error", error);
    throw error;
  }
}
