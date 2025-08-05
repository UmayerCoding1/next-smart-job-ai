import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        
    } catch (error) {
        console.log('Resume upload error', error);
        return NextResponse.json({ message: "Resume upload error", success: false }, { status: 500 });
    }
}