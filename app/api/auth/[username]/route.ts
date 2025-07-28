import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, contex: {params: Promise<{username: string}>}) {
    try {
        const userName = await contex.params;
        console.log('api userName', userName);

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