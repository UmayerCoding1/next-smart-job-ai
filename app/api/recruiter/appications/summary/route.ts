import { Application } from "@/app/models/Application";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const verifiedUser = await withAuth(req, { allowedRoles: "recruiter" });

    if (!verifiedUser.ok) return verifiedUser.response;

    const applications = await Application.find({
      recruiter: verifiedUser.userId,
    });

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

    return NextResponse.json(
      { message: "Success", success: true, counts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", success: false },
      { status: 500 }
    );
  }
}
