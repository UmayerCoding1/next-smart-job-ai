import { SaveJob } from "@/app/models/SaveJob";
import { User } from "@/app/models/User";
import { verifyToken } from "@/lib/verifyToken";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body)
      return NextResponse.json(
        { message: "Bad request", success: false },
        { status: 400 }
      );
    const token = (await cookies()).get("token")?.value as unknown as string;
    const verifyId = verifyToken(token);
    if (!verifyId)
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );

    const user = await User.findById(verifyId.id);

    if (!user)
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );

    const existingSaveJob = await SaveJob.findOne({
      userId: user._id,
      jobId: body.jobId,
    });

    if (existingSaveJob) {
      return NextResponse.json(
        { message: "Job already saved", success: false },
        { status: 400 }
      );
    }

    const newSaveJob = await SaveJob.create({
      userId: user._id,
      jobId: body.jobId,
    });

    return NextResponse.json(
      {
        message: "Job saved successfully",
        success: true,
        savedJobId: newSaveJob._id,
      },
      { status: 200 }
    );
  } catch  {
    // console.log("Job save error", error);
    return NextResponse.json(
      { message: "Job save error", success: false },
      { status: 500 }
    );
  }
}


