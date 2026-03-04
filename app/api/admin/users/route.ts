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

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "5");
        const skip = (page - 1) * limit;

        const totalUsers = await User.countDocuments({});
        const users = await User.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const totalPages = Math.ceil(totalUsers / limit);

        return NextResponse.json(
            {
                success: true,
                users,
                pagination: {
                    totalUsers,
                    totalPages,
                    currentPage: page,
                    limit
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Fetch users error", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch users" },
            { status: 500 }
        );
    }
}
