import { Job } from "@/app/models/Job";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    await connectToDatabase();
    // const { id } = await context.params;
    const { status, id, ids } = await request.json();
    const auth = await withAuth(request, { allowedRoles: "admin" });
    if (!auth.ok) return auth.response;


    const allowedStatus = ["active", "paused", "draft", "closed"];
    if (!status || !allowedStatus.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    let result;
    // Single update
    if (id) {
      if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { success: false, message: "Invalid Job ID" },
          { status: 400 }
        );
      }

      result = await Job.updateOne({ _id: id }, { $set: { status } });
    }
    else if (Array.isArray(ids) && ids.length > 0) {
      result = await Job.updateMany(
        { _id: { $in: ids } },
        { $set: { status } }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "No job id provided" },
        { status: 400 }
      );
    }

    if (!result) {
      return NextResponse.json({ message: "Job not found", success: false }, { status: 404 });
    }

    return NextResponse.json({ message: "Job updated successfully", success: true }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error", success: false, error }, { status: 500 });
  }

}