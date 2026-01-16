import { Application } from "@/app/models/Application";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const verifiedUser = await withAuth(req, { allowedRoles: "recruiter" });
    if (!verifiedUser.ok) return verifiedUser.response;

    const query = new URL(req.url).searchParams;
    const format = query.get("format");
    const applicationStatus = query.get("applicationStatus");
console.log(format,applicationStatus)
    if (!format || !applicationStatus)
      return NextResponse.json({
        message: "Format and applicationStatus is required  ",
        status: 400,
      });

    const applications = await Application.find({
      recruiter: verifiedUser.userId,
      status: applicationStatus,
    }).populate({
        path: "job",
        select: "title category dedline salaryrange status",
      }).select('status coverLetter expectedSalary matchScore name email phone resumeLink matchScore ');

    if (!applications)
      return NextResponse.json({
        message: "Applications not found",
        status: 404,
        success: false,
      });

    
      if(applications.length == 0) return NextResponse.json({
        message: "Applications not found",
        status: 404,
      });

    return NextResponse.json({
      message: "Successfully export applications data",
    applications,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
  }
}
