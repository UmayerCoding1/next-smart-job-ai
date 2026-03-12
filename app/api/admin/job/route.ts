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

        const statusOrder = ["active", "paused", "draft", "closed"];

        const jobs = await Job.aggregate([
            {
                $addFields: {
                    statusPriority: {
                        $indexOfArray: [statusOrder, "$status"]
                    }
                }
            },
            { $sort: { statusPriority: 1, createdAt: -1 } }, // 1 → smallest index first
            {
                $lookup: {
                    from: "companies",
                    localField: "company",
                    foreignField: "_id",
                    as: "company"
                }
            },
            { $unwind: "$company" },
            {
                $project: {
                    title: 1,
                    company: { name: 1, email: 1, logo: 1 },
                    category: 1,
                    createdAt: 1,
                    dedline: 1,
                    location: 1,
                    salaryrange: 1,
                    status: 1,
                    appliedjobs: 1,
                    jobtype: 1
                }
            }
        ]);
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


export async function DELETE(req: NextRequest) {
    try {
        await connectToDatabase();
        const auth = await withAuth(req, { allowedRoles: "admin" });
        if (!auth.ok) return auth.response;

        const { id } = await req.json();
        if (!id) return NextResponse.json({ success: false, message: 'No job id found' }, { status: 400 });

        const job = await Job.findByIdAndDelete(id);
        if (!job) return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });

        return NextResponse.json({ success: true, message: 'Job deleted successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        throw error
    }
}