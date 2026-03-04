import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        // Verify admin role
        const auth = await withAuth(request, { allowedRoles: "admin" });
        if (!auth.ok) return auth.response;

        // Fetch all users for export (without pagination)
        const users = await User.find({}).sort({ createdAt: -1 }).lean();

        return NextResponse.json(
            { success: true, users },
            { status: 200 }
        );
    } catch (error) {
        console.error("Export users error", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch users for export" },
            { status: 500 }
        );
    }
}
