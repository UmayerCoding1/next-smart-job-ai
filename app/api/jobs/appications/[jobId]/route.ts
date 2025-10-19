
import { Application } from "@/app/models/Application";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,params: { params: Promise<{ jobId: string }> }) {
    try {
        await connectToDatabase();
        const  {jobId}  = await params.params;
        

        const appications = await Application.find({ job: jobId }).populate({
          path: "job",
          select: "title appliedjobs dedline",
        }).populate({
          path: "applicant",
          select: "fullname email avatar phone status",
        });
        

        return NextResponse.json({appications, message: jobId, success: true }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", success: false }, { status: 500 });
    }
}