import { Job } from "@/app/models/Job";
import Jobs from "@/components/ui/job/Jobs";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        // const auth = await withAuth(req, { allowedRoles: "admin" });
        // if (!auth.ok) return auth.response;

        const jobs = await Job.find().select('title company category createdAt dedline location salaryrange status appliedjobs jobtype').populate({
            path: 'company',
            select: 'name email logo'
        });
        if (!jobs) {
            NextResponse.json({
                success: false,
                message: 'Jobs not found'
            })
        }
        return NextResponse.json({
            success: true,
            jobs,
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        throw error
    }
}