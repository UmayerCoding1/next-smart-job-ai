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
    const page = searchQuery.get("page") || 1;
    const limit = parseInt(searchQuery.get("limit") || "10");
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

const filter: FilterQuery<IJob> = { applicant: id };

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
    path: "job",
    select:
      "-applicationsQuestions -appliedjobs -benefits -description -education -experience -holidayPolicy -requirements -skills -workTime -__v -updatedAt ",
    populate: {
      path: "company", 
      select: "name logo", 
    },
  }).limit(Number(limit)).skip((Number(page) - 1) * Number(limit));


  const totalPages = Math.ceil(await Application.countDocuments(filter) / Number(limit));
  console.log(totalPages);

  console.log('call api jobseeker applications');

    return NextResponse.json({ applications,pagination:{totalPages} , success: true }, { status: 200 });
  } catch (error) {
    console.log("jobseeker applications error", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
