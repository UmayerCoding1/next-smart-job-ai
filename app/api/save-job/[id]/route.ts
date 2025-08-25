import { SaveJob } from "@/app/models/SaveJob";
import { User } from "@/app/models/User";
import { verifyToken } from "@/lib/verifyToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

         const token = (await cookies()).get("token")?.value as unknown as string;
            const verifyId = verifyToken(token);
            if (!verifyId)
              return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
              );
        
            const user = await User.findById(verifyId.id);
        
            if (!user)
              return NextResponse.json(
                { message: "User not found", success: false },
                { status: 404 }
              );

            const existingSaveJob = await SaveJob.findOneAndDelete({ userId: user._id, jobId: id });
        
           if (!existingSaveJob) {
             return NextResponse.json({ message: "Save job not found", success: false }, { status: 404 });
           }
      
        return NextResponse.json({ message: "Job deleted successfully", success: true }, { status: 200 });
    } catch (error) {
        console.log("Error deleting job:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}