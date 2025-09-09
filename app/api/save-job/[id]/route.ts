import { SaveJob } from "@/app/models/SaveJob";
import { User } from "@/app/models/User";
import { verifyToken } from "@/lib/verifyToken";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { Company } from "@/app/models/Company";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = new URL(request.url).searchParams;

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    //  Validate userId
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid userId", success: false },
        { status: 400 }
      );
    }
    const userObjectId = new Types.ObjectId(id);

    //  Aggregation for saved jobs
    const savedJobs = await SaveJob.aggregate([
      // Match only the logged-in user's saved jobs
      {
        $match: { userId: userObjectId },
      },

      // Lookup job details
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: { path: "$job", preserveNullAndEmptyArrays: false } },

      // Optional search filter on job title
      ...(search
        ? [
            {
              $match: {
                "job.title": { $regex: search, $options: "i" },
              },
            },
          ]
        : []),

      // Lookup company details using job.company (ObjectId)

      // Sort by save date (or createdAt from SaveJob)
      { $sort: { createdAt: -1 } },

      // Pagination
      { $skip: skip },
      { $limit: limit },

      // Project only needed fields
      {
        $project: {
          _id: 1, // SaveJob _id
          userId: 1,
          jobId: 1,
          createdAt: 1,
          updatedAt: 1,
          job: {
            _id: "$job._id",
            title: "$job.title",
            jobtype: "$job.jobtype",
            salaryrange: "$job.salaryrange",
            company: "$job.company",
            dedline: "$job.dedline",
            appliedjobs: "$job.appliedjobs",
          },
        },
      },
    ]);

    // Count total for pagination
    const totalCountAgg = await SaveJob.aggregate([
      { $match: { userId: userObjectId } },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
      ...(search
        ? [
            {
              $match: {
                "job.title": { $regex: search, $options: "i" },
              },
            },
          ]
        : []),
      { $count: "total" },
    ]);

    const company = await Company.findById(savedJobs[0]?.job?.company).select(
      "name _id logo"
    );


    const total = totalCountAgg[0]?.total || 0;

    const saveJobsDataFormat = savedJobs.map((saveJob) => ({
      ...saveJob,
      company: saveJob.job.company ? company : null,
    }));

    return NextResponse.json(
      {
        savedJobs: saveJobsDataFormat,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error getting save job:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("id", id);

    const token = (await cookies()).get("token")?.value as unknown as string;
    const verifyId = verifyToken(token);
    if (!verifyId)
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );

    const user = await User.findById(verifyId.id);

    if (!user)
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );

      console.log("user", user._id);
    const existingSaveJob = await SaveJob.findByIdAndDelete(id);
    if (!existingSaveJob) {
      return NextResponse.json(
        { message: "Save job not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Job deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting job:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
