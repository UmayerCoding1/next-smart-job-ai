import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const auth = await withAuth(request, { allowedRoles: "admin" });
        if (!auth.ok) return auth.response;

        const { id } = await context.params;
        console.log(id)
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Failed to delete user" },
            { status: 500 }
        );
    }
}