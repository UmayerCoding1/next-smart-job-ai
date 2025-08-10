import { User } from "@/app/models/User";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import {  NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import "@/app/models/Resume";

export async function GET() {
  try {
    await connectToDatabase();

    const token = (await cookies()).get("token")?.value as unknown as string;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await User.findById(decoded.id)
      .populate({
        path: "resume",
        select: "filename size createdAt resumeLink",
      })
      .select("-password -otp");
    console.log("user", user.resume);

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ user, success: true }, { status: 200 });
  } catch (error) {
    console.log("logged user get error", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json(
      { message: errorMessage, success: false },
      { status: 500 }
    );
  }
}


