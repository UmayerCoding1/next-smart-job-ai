import { IUser, User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { veridedPassword, verifyEmail } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { email, password }: IUser = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    // const emailVerify = await verifyEmail(email);
    // if (!emailVerify) {
    //   return NextResponse.json(
    //     { message: "Invalid email", success: false },
    //     { status: 400 }
    //   );
    // }

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    const isPasswordValid = await veridedPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password", success: false },
        { status: 400 }
      );
    }

    if (!user.isOtpVerified) {
      return NextResponse.json(
        {
          message: "Account not verified, please verify your account!",
          success: false,
        },
        { status: 400 }
      );
    }

    const token = jwt.sign({ id: user._id,role:user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    if (!token) {
      return NextResponse.json(
        { message: "Failed to generate token", success: false },
        { status: 500 }
      );
    }

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      
      maxAge: 2 * 24 * 60 * 60 * 1000, 
    });
    return NextResponse.json(
      { message: "Login successful", success: true, user },
      { status: 200 }
    );
  } catch (error) {
    console.log("User login error", error);
  }
}
