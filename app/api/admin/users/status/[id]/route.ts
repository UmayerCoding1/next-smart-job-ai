import { Status, User } from "@/app/models/User";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const body = await req.json();
        const { status } = body;

        const auth = await withAuth(req, { allowedRoles: "admin" });
        if (!auth.ok) return auth.response;

        if (!Object.values(Status).includes(status as Status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        };


        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        user.status = status;
        await user.save();



        return NextResponse.json({ message: "User status updated successfully", success: true }, { status: 200 });

    } catch (error) {
        console.error("Error updating user status:", error);
        return NextResponse.json({ error: "Failed to update user status", success: false }, { status: 500 });
    }
}