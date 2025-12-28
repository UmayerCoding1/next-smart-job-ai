import { Application } from "@/app/models/Application";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";
import '@/app/models/Job';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectToDatabase();

    const verifiedUser = await withAuth(req, { allowedRoles: "recruiter" });

    if (!verifiedUser.ok) return verifiedUser.response;

    const query = new URL(req.url).searchParams;
    const searchQuery = query.get("search") || "";

    const applications = await Application.find({recruiter: verifiedUser.userId,}).populate({path: "job", select: "title category dedline createdAt"}).populate({path: "applicant", select: "fullname  avatar"}); 

    if (!applications) {
      return NextResponse.json(
        { message: "No applications found", success: false },
        { status: 404 }
      );
    }




        const counts = {
      all: applications.length,
      accepted: applications.filter(app => app.status === "accepted").length,
      rejected: applications.filter(app => app.status === "rejected").length,
      new: applications.filter(app => app.status === "new").length,
      pending: applications.filter(app => app.status === "pending").length,
      interview: applications.filter(app => app.status === "interview").length,
      reviewed: applications.filter(app => app.status === "reviewed").length,
    };

    console.log(counts);

    return NextResponse.json(
      { message: "Job updated successfully", applications,counts, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
