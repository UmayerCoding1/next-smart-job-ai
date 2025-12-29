import { Application } from "@/app/models/Application";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
   try {
    await connectToDatabase();

    const verifiedUser = await withAuth(req, { allowedRoles: "recruiter" });

    if (!verifiedUser.ok) return verifiedUser.response;
    console.log(verifiedUser.userId)


    const applications = await Application.updateMany({recruiter: verifiedUser.userId}, {status: 'reviewed',isRead: true});

    if(!applications) return NextResponse.json({ message: "Application not found", success: false }, { status: 500 });

    return NextResponse.json({ message: "All applications marked as read", success: true }, { status: 200 });


   } catch (error) {
    console.log(error);
   }
}