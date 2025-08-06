import { Resume } from "@/app/models/Resume";
import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { updateResumeCacheForUser } from "@/utils/updatecache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
      await connectToDatabase();

    const { user, resumeLink, filename, size } = await request.json();

    if (!user || !resumeLink || !filename || !size) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

       const existingUser = await User.findById(user);

       if(!existingUser) {
        return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
       }


     const newResume =   await Resume.create({ user, resumeLink, filename, size });

     if (newResume) {
      existingUser.resume = newResume._id;
      await existingUser.save({validateBeforeSave: false});

     updateResumeCacheForUser(existingUser._id.toString());
     }

    return NextResponse.json(
      { message: "Resume uploaded successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Resume upload error", error);
    return NextResponse.json(
      { message: "Resume upload error", success: false },
      { status: 500 }
    );
  }
}





