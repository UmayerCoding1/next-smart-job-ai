import { Job } from "@/app/models/Job";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
 try {
   await connectToDatabase();
  const {id} = await context.params;
  const {status} = await request.json();

  
  const job = await Job.findOneAndUpdate({ _id: id }, { status }, { new: true });

  if(!job) {
    return NextResponse.json({ message: "Job not found", success: false }, { status: 404 });
  }

  return NextResponse.json({ message: "Job updated successfully", success: true }, { status: 200 });
 } catch (error) {
  console.log(error)
  return NextResponse.json({ message: "Error", success: false,error }, { status: 500 });
 }
 
}