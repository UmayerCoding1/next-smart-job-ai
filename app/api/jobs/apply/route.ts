import { Application, IApply } from "@/app/models/Application";
import { Job } from "@/app/models/Job";
import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const {
      name,
      email,
      applicant,
      resumeLink,
      expectedSalary,
      phone,
      job,
      coverLetter,
    }: IApply = body;
console.log(body);
    if (
      !name ||
      !email ||
      !applicant ||
      !resumeLink ||
      !expectedSalary ||
      
      !phone ||
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

    // const existingApply = await Application.findOne({
    //   job: job,
    //   applicant: applicant,
    // });

    // if (existingApply) {
    //   return NextResponse.json(
    //     { message: "You have already applied for this job", success: false },
    //     { status: 400 }
    //   );
    // }

    const newApply = await Application.create({
      job,
      name,
      email,
      resumeLink,
      countryCode: body.countryCode || "+880",
      applicant,
      phone,
      jobRelatedQuestions: body.jobRelatedQuestions || [],
      coverLetter,
      expectedSalary,
    });

    if (applyedJob.appliedjobs.includes(newApply.applicant)) {
      return NextResponse.json(
        { message: "You have already applied for this job33", success: false },
        { status: 400 }
      );
    } else {
      applyedJob.appliedjobs.push(newApply.applicant);
      await applyedJob.save({ validateBeforeSave: false });
    }

    if (applicantUser.appliedjobs.includes(newApply._id)) {
      return NextResponse.json(
        { message: "You have already applied for this job", success: false },
        { status: 400 }
      );
    } else {
      applicantUser.appliedjobs.push(newApply._id);
      await applicantUser.save({ validateBeforeSave: false });
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
