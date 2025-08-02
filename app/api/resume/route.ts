import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    try {
        const formData = await request.formData();
        const resume = formData.get('resume');
        // const user = await User.findById();

        return NextResponse.json({ message: "Resume uploaded successfully", success: true }, { status: 200 });
    } catch (error) {
        console.log('Resume upload error', error);
        return NextResponse.json({ message: "Resume upload error", success: false }, { status: 500 });
    }
}