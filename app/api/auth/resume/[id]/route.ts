import { Resume } from "@/app/models/Resume";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { resumeCache } from "@/lib/cache";
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
   

    // check cache resume
    const cacheResume = resumeCache.get(id);
    if (cacheResume) {
      return NextResponse.json(
        { resume: cacheResume, success: true },
        { status: 200 }
      );
    }
    const resume = await Resume.find({ user: new mongoose.Types.ObjectId(id) })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("-__v -resumeLink -updatedAt");

    if (!resume) {
      return NextResponse.json(
        { message: "Resume not found", success: false },
        { status: 404 }
      );
    }

    // set to cache resume
    resumeCache.set(id, resume);
    return NextResponse.json({ resume, success: true }, { status: 200 });
  } catch (error) {
    console.log("Resume find by id error", error);
    return NextResponse.json(
      { message: "Resume not found", success: false },
      { status: 404 }
    );
  }
}
