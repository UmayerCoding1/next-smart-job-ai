import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { verifyEmail } from "@/lib/utils";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { fullname, email, password, confirmPassword, role, loginMethod,username } =
      await request.json();
  console.log({ fullname, email, password, confirmPassword, role, loginMethod,username });
  
    if (!fullname || !email || !password || !role || !loginMethod || !username) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    const emailVerify = await verifyEmail(email);
    
    
    if (!emailVerify) {
      return NextResponse.json(
        { message: "Invalid email", success: false },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match", success: false },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ email });
     
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 400 }
      );
    }

    const usernameExists = await User.findOne({ username });
     
    if (usernameExists) {
      return NextResponse.json(
        { message: "Username already exists", success: false },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    
    
    const user = await User.create({
      fullname,
      email,
      password,
      username,
      role,
      loginMethod,
      otp : {
        code: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      }
    });

    console.log(user);
    

    return NextResponse.json(
      { message: "User registered successfully", success: true, user },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "User reginter failed", success: false },
      { status: 500 }
    );
  }
}
