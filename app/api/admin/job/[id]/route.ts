import { Job } from "@/app/models/Job";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const auth = await withAuth(req, { allowedRoles: "admin" });
        if (!auth.ok) return auth.response;

        const { id } = await context.params;
        if (!id) return NextResponse.json({ success: false, message: 'No job id found' }, { status: 400 });

        console.log(id);

        const job = await Job.findByIdAndDelete(id);
        if (!job) return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });

        return NextResponse.json({ success: true, message: 'Job deleted successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        throw error
    }
}