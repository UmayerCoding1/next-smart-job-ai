import { Application } from "@/app/models/Application";
import mongoose, { FilterQuery } from "mongoose";
import { NextResponse } from "next/server";
import "@/app/models/Job";
import "@/app/models/Company";
import { connectToDatabase } from "@/lib/db";
import { IJob } from "@/app/models/Job";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const searchQuery = new URL(request.url).searchParams;
    const search = searchQuery.get("search") || "";
    const filterStatus = searchQuery.get("status") || "";
    // const 

    const searchTrimed = search.trim();

    // console.log(mongoose.modelNames());
let jobIds: mongoose.Types.ObjectId[] = [];

// Search by job title
if (searchTrimed) {
  const jobs = await mongoose.model("Job").find({
    title: { $regex: searchTrimed, $options: "i" },
  }).select("_id");

  jobIds = jobs.map(j => j._id);
}

const filter: any = { applicant: id };

// If we have jobIds from search, add them
if (searchTrimed && jobIds.length > 0) {
  filter.job = { $in: jobIds };
}

// ✅ Status belongs to Application, not Job
if (filterStatus) {
  filter.status = filterStatus;
}


  const applications = await Application.find(filter)
  .select("-jobRelatedQuestions -countryCode -__v")
  .populate({
    path: "job", // populate job
    select:
      "-applicationsQuestions -appliedjobs -benefits -description -education -experience -holidayPolicy -requirements -skills -workTime -__v -updatedAt ",
    populate: {
      path: "company", // populate job.company
      select: "name logo", // select only name and logo from company
    },
  });


  console.log('call api jobseeker applications');

    return NextResponse.json({ applications, success: true }, { status: 200 });
  } catch (error) {
    console.log("jobseeker applications error", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
