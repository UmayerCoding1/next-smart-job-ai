import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, contex: {params: Promise<{username: string}>}) {
    try {
        const userName = await contex.params;
        

        const user = await User.findOne({username: userName.username});
        console.log('user', user);
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }
        return NextResponse.json({ user, success: true }, { status: 200 });
    } catch (error) {
        console.log('User find by username error', error);
    }
}


export async function PUT(request: NextRequest, context : {params: Promise<{username: string}>}) {
    try {
        await connectToDatabase();

        const userName = await context.params;
        console.log(userName);
        const body = await request.json();
        // console.log(body);

        const user = await User.findOneAndUpdate({username: userName.username}, body, {new: true});
        
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        return NextResponse.json({ message: "User updated successfully", success: true }, { status: 200 });
    } catch (error) {
        console.log('User update error', error);
        return NextResponse.json({ message: "User update error", success: false }, { status: 500 });
    }
}