import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Job } from "@/app/models/Job";
import mongoose, { Types } from "mongoose";
import '@/app/models/Company'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
   console.log("Models loaded:", mongoose.modelNames());
     if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }


    
 const job = await Job.findById(id)
      .select("-appliedjobs")
      .populate("company"); 



    if (!job) {
      return NextResponse.json(
        { message: "Job not found", success: false },
        { status: 404 }
      );
    }

   
    return NextResponse.json({ job, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { message: "Internal server error", error, success: false },
      { status: 500 }
    );
  }
}


export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
 try {
   await connectToDatabase();
  const {id} = await context.params;
  console.log(id);

  return NextResponse.json({ message: "Job updated successfully", success: true }, { status: 200 });
 } catch (error) {
  console.log(error)
  return NextResponse.json({ message: "Error", success: false,error }, { status: 500 });
 }
 
}