// import { Company } from "@/app/models/Company";
import { Company } from "@/app/models/Company";
import { IJob, Job } from "@/app/models/Job";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

// shift,vacancies,isRemoteAvailable

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body: IJob = await request.json();
    const {
      title,
      description,
      company,
      reqruiter,
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
    } = body;

    const auth = await withAuth(request, { allowedRoles: "recruiter" });
    if (!auth.ok) return auth.response;

    if (
      !title ||
      !description ||
      !company ||
      !reqruiter ||
      !location ||
      !salaryrange ||
      !jobtype ||
      !skills ||
      !education ||
      !experience ||
      !experienceLevel ||
      !requirements ||
      !dedline ||
      !category ||
      !holidayPolicy ||
      !workTime
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

    const job = await Job.create({
      title,
      description,
      company,
      reqruiter,
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
    console.log("Job post error", error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    const existingJodId = searchParams.get("existingJodId");
    const filter: Record<string, string> = {};
    searchParams.forEach((value: string, key: string) => {
      if(!key || !value) return;
      if (key === "existingJodId") return;
      filter[key] = value;
    });

    const jobs = await Job.find(filter).populate("company");
    const filteredJobs = jobs.filter((job) => job._id.toString() !==  existingJodId);
    // console.log('filteredJobs',typeof existingJodId);

    
    return NextResponse.json({ jobs: existingJodId ? filteredJobs : jobs }, { status: 200 });
  } catch (error) {
    console.log("Job get error", error);
    throw error;
  }
}
