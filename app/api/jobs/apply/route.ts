import { Apply, IApply } from "@/app/models/Apply";
import { Job } from "@/app/models/Job";
import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const {
      name,
      email,
      applicant,
      resumeLink,
      expectedSalary,
      countryCode,
      phone,
      jobRelatedQuestions,
      job,
      coverLetter,
    }: IApply = await request.json();

    if (
      !name ||
      !email ||
      !applicant ||
      !resumeLink ||
      !expectedSalary ||
      !countryCode ||
      !phone ||
      !jobRelatedQuestions ||
      !job ||
      !coverLetter
    ) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    const applicantUser = await User.findById(applicant);

    if (!applicantUser) {
      return NextResponse.json(
        { message: "Applicant user not found", success: false },
        { status: 404 }
      );
    }

    const applyedJob = await Job.findById(job);

    if (!applyedJob) {
      return NextResponse.json(
        { message: "Job not found", success: false },
        { status: 404 }
      );
    }

    if (applyedJob.appliedjobs.includes(applicant)) {
      return NextResponse.json(
        { message: "You have already applied for this job", success: false },
        { status: 400 }
      );
    }

    const existingApply = await Apply.findOne({
      job: job,
      applicant: applicant,
    });

    if (existingApply) {
      return NextResponse.json(
        { message: "You have already applied for this job", success: false },
        { status: 400 }
      );
    }

    const newApply = await Apply.create({
      job,
      name,
      email,
      resumeLink,
      countryCode,
      applicant,
      phone,
      jobRelatedQuestions,
      coverLetter,
      expectedSalary,
    });

    const applicantId = new Types.ObjectId(applicant);
    if (applyedJob.appliedjobs.includes(applicantId)) {
      return NextResponse.json(
        { message: "You have already applied for this job", success: false },
        { status: 400 }
      );
    } else {
      applyedJob.appliedjobs.push(applicantId);
      await applyedJob.save({ validateBeforeSave: false });
    }


    if (applicantUser.appliedjobs.includes(applicantId)) {
      return NextResponse.json(
        { message: "You have already applied for this job", success: false },
        { status: 400 }
      );
    } else {
      applicantUser.appliedjobs.push(applicantId);
      await applyedJob.save({ validateBeforeSave: false });
    }

   
    return NextResponse.json(
      { message: "Job applied successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("job apply error", error);
    return NextResponse.json(
      { message: "Job apply error", success: false },
      { status: 500 }
    );
  }
}
