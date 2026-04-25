// import { Company } from "@/app/models/Company";
import { Company } from "@/app/models/Company";
import { IJob, Job, JobStatus } from "@/app/models/Job";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { FilterQuery } from "mongoose";

// Define the POST method to create a new job posting
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
      experienceLevel,
      requirements,
      workTime,
      applicationsQuestions,
      ...(body.shift && { shift: body.shift }),
      ...(body.vacancies && { vacancies: body.vacancies }),
      ...(body.isRemoteAvailable && {
        isRemoteAvailable: body.isRemoteAvailable,
      }),
      status: "paused",
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

// Define the GET method to retrieve job postings
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = new URL(request.url).searchParams;
    const catehory = searchParams.get("category");
    const jobtitle = searchParams.get("title");
    const singleJobType = searchParams.get("jobType");
    const location = searchParams.get("location");
    const filterString = searchParams.getAll("filter");


    const rawFilter = filterString[0];
    const parsedFilter = rawFilter ? JSON.parse(rawFilter) : null;
    let normalizedJobType: string[] = [];

    if (normalizedJobType?.length > 0) {
      normalizedJobType = [singleJobType || ""];
    } else if (parsedFilter?.JobType?.length) {
      normalizedJobType = parsedFilter.JobType;
    }

    const experienceLevel = parsedFilter?.ExperienceLavel;
    const datePosted = parsedFilter?.DatePosted;


    const filter: FilterQuery<IJob> = {
      status: JobStatus.ACTIVE,
      // this is a prectice project so i am not using this line 
      // but it is a good way to filter jobs by deadline
      // $expr: {
      //   $gte: [
      //     { $toDate: "$dedline" },
      //     new Date()
      //   ]
      // }

    };

    if (jobtitle) {
      filter.title = {
        $regex: jobtitle,
        $options: "i",
      };
    }
    if (normalizedJobType?.length > 0) {
      filter.jobtype = { $in: normalizedJobType };
    }
    if (location) {
      filter.location = location;
    }
    if (catehory) {
      filter.category = catehory;
    }

    if (experienceLevel?.length > 0) {
      filter.experienceLevel = { $in: experienceLevel };
    }

    if (datePosted) {
      const now = new Date();

      let startDate: Date | null = null;

      if (datePosted === "last 24 hours") {
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      }

      if (datePosted === "last 7 days") {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      }
      if (datePosted === 'last 30 days') {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }
      if (datePosted === 'last 60 days') {
        startDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
      }
      if (datePosted === 'last 90 days') {
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      }


      if (startDate) {
        filter.createdAt = {
          $gte: startDate,
        };
      }
    }

    const jobs = await Job.find(filter).populate("company");

    return NextResponse.json({ jobs, success: true }, { status: 200 });
  } catch (error) {
    console.log("Job get error", error);
    throw error;
  }
}
