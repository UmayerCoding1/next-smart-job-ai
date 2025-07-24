import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request: NextRequest) {
    try {
        await connectToDatabase();
      const {otp,email} = await request.json();
     console.log(typeof otp, email, otp);
     
      if (!otp) {
        return NextResponse.json({ message: "OTP is required", success: false }, { status: 400 });
      }

      const user = await User.findOne({email});
    
     
      if (!user) {
        return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
      }

      if (user.otp.code !== Number(otp)) {
        return NextResponse.json({ message: "Invalid OTP", success: false }, { status: 400 });
      }

     
       
      if (user.otp.expiresAt < new Date()) {
        return NextResponse.json({ message: "OTP has expired", success: false }, { status: 400 });
      }
      



     
      user.isOtpVerified = true;
      await user.save();
       console.log('finished verified');
      return NextResponse.json({ message: "OTP verified successfully", success: true }, { status: 200 });
     


    } catch (error) {
        console.log('OTP verification error', error);
        
    }
}