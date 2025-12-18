import { Application, IApply } from "@/app/models/Application";
import { Job } from "@/app/models/Job";
import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { resumeToText } from "@/service/getPdfData";
import { savePdfToFile } from "@/service/savePDfToFile";
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

    const existingApply = await Application.findOne({
      job: job,
      applicant: applicant,
    });

    if (existingApply) {
      return NextResponse.json(
        { message: "You have already applied for this job", success: false },
        { status: 400 }
      );
    }

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
      matchScore: 0,
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

    // AI integration here to check to match the resume with the job description

    try {
      const matchScore = await getMatchScore(
        resumeLink,
        newApply.job.toString()
      );

      console.log("score type", typeof matchScore);
      // important: allow 0 score
      if (matchScore !== undefined && matchScore !== null) {
        // const updatedApply = await Application.findById(newApply._id);
        newApply.matchScore = matchScore;
        await newApply.save();
      }
    } catch (error) {
      console.log(error);
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

export async function getMatchScore(resumeLink: string, jobId: string) {
  try {
    if (!resumeLink) return 0;
    const pdf = await savePdfToFile(resumeLink);
    if (!pdf) {
      return 0;
    }

    const pdfData = await resumeToText(pdf, jobId);

    if (!pdfData) return 0;

    return pdfData;
  } catch (error) {
    console.log(error);
  }
}
