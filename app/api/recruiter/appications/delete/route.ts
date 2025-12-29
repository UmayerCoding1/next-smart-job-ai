import { Application } from "@/app/models/Application";
import { ApplicationBackup } from "@/app/models/applicationsBackup";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE (req:NextRequest)  {
  try {
    await connectToDatabase();

    const verifiedUser = await withAuth(req, { allowedRoles: "recruiter" });
    
        if (!verifiedUser.ok) return verifiedUser.response;

        
    const recoveryUntil = new Date();

    // find application
    const application = await Application.find({recruiter: verifiedUser.userId});
    


    // backup applications data 
    const backup = application.map((app) => ({
         originalApplicationId: app._id,
      data: app.toObject(),
      deletedBy: app.recruiter,
      recoveryUntil,
    }))

    await ApplicationBackup.insertMany(backup);


    // delete applications
  await Application.deleteMany({
      _id: { $in: verifiedUser.userId },
    });

     return NextResponse.json({
      success: true,
      message: "Applications deleted & backed up successfully",
    });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}