import { Job } from "@/app/models/Job";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    let currentStatus;
    const searchParams = new URL(request.url).searchParams;
    const recruiterId = searchParams.get("recruiterId");
    const status = searchParams.get("status");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit") || 20);
    // const companyId = searchParams.get("company");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // set status
    switch (status) {
      case "Open Jobs":
        currentStatus = "Open";
        break;
      case "Closed Jobs":
        currentStatus = "Closed";
        break;

      default:
        currentStatus = "";
        break;
    }

    // get jobs by status
    switch (currentStatus) {
      // open jobs
      case "Open":
        const openJobs = await Job.find({
          reqruiter: recruiterId,
          dedline: { $gte: today.toISOString() },
        })
          .skip((page - 1) * limit)
          .limit(limit)
          .lean();

        return NextResponse.json(
          { jobs: openJobs, success: true },
          { status: 200 }
        );

      // closed jobs
      case "Closed":
        const closedJobs = await Job.find({
          reqruiter: recruiterId,
          dedline: { $lt: today.toISOString() },
        })
          .skip((page - 1) * limit)
          .limit(limit)
          .lean();
        console.log(closedJobs.length);
        return NextResponse.json(
          { jobs: closedJobs, success: true },
          { status: 200 }
        );

      default:
        const jobs = await Job.find({
          reqruiter: recruiterId,
        });

        return NextResponse.json({ jobs, success: true }, { status: 200 });
    }
  } catch (error) {
    console.log("Jobs get error", error);
    throw error;

  }
}
