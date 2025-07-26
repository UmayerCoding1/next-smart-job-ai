import { User } from "@/app/models/User";
import { sendOtpWithNodemailer } from "@/service/nodemailer";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
       const {email} = await request.json();

    if (!email) {
        return NextResponse.json({ message: "Email is required", success: false }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }
 
    

     
     const OTPSend = await sendOtpWithNodemailer(email,'SmartJobAI verify OTP', user.otp.code);

     if (!OTPSend.success) {
        return NextResponse.json({ message: "Failed to send OTP", success: false }, { status: 500 });
    }
   
       return NextResponse.json({ message: "OTP sent successfully", success: true }, { status: 200 });
       
    } catch (error) {
        console.log("OTP verification error", error);
        throw error;
    }
}