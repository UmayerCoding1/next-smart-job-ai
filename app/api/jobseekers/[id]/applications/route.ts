import { Application } from "@/app/models/Application";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import "@/app/models/Job";
import "@/app/models/Company";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log(mongoose.modelNames());

  const applications = await Application.find({ applicant: id })
  .select("-jobRelatedQuestions -countryCode -__v")
  .populate({
    path: "job", // populate job
    select:
      "-applicationsQuestions -appliedjobs -benefits -description -education -experience -holidayPolicy -requirements -skills -workTime -__v -updatedAt -createdAt",
    populate: {
      path: "company", // populate job.company
      select: "name logo", // select only name and logo from company
    },
  });

    console.log("applications", applications);

    return NextResponse.json({ applications, success: true }, { status: 200 });
  } catch (error) {
    console.log("jobseeker applications error", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
