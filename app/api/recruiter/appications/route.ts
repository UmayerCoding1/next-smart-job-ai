import { Application } from "@/app/models/Application";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";
import "@/app/models/Job";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const verifiedUser = await withAuth(req, { allowedRoles: "recruiter" });

    if (!verifiedUser.ok) return verifiedUser.response;

    const query = new URL(req.url).searchParams;
    const searchQuery = query.get("search") || "";
    const page = query.get("page") || 1;
    const limit = query.get("limit") || 10;

    const totalApplications = await Application.find({
      recruiter: verifiedUser.userId,
    }).countDocuments();
  
    const applications = await Application.find({
      recruiter: verifiedUser.userId,
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    }).populate({
        path: "job",
        select: "title category dedline salaryrange createdAt",
      })
      .populate({
        path: "applicant",
        select: "fullname avatar",
      })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    if (!applications) {
      return NextResponse.json(
        { message: "No applications found", success: false },
        { status: 404 }
      );
    }

    const counts = {
      all: applications.length,
      accepted: applications.filter((app) => app.status === "accepted").length,
      rejected: applications.filter((app) => app.status === "rejected").length,
      new: applications.filter((app) => app.status === "new").length,
      pending: applications.filter((app) => app.status === "pending").length,
      interview: applications.filter((app) => app.status === "interview")
        .length,
      reviewed: applications.filter((app) => app.status === "reviewed").length,
    };

    const paginationCount = {
      totalApplications: totalApplications,
      totalPages: Math.ceil(totalApplications / Number(limit)),
      currentPage: Number(page),
    }
    

    return NextResponse.json(
      {
        message: "Job updated successfully",
        applications,
        counts,
        paginationCount,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}


