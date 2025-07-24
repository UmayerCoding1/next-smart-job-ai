import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Job } from "@/app/models/Job";
import { Company } from "@/app/models/Company";
import { Types } from "mongoose";
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
   
     if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const job = await Job.findById(id).populate("company");

    if (!job) {
      return NextResponse.json(
        { message: "Job not found", success: false },
        { status: 404 }
      );
    }
   console.log(Company);
   
    return NextResponse.json({ job, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { message: "Internal server error", error, success: false },
      { status: 500 }
    );
  }
}
