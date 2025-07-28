import { Company } from "@/app/models/Company";
import { connectToDatabase } from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    
   try {
    await connectToDatabase();

    const { id } = await params;
   
    const company = await Company.findOne({recruiter: id});
    if (!company) {
      return NextResponse.json({ message: "Company not found", success: false }, { status: 404 });
    }
    return NextResponse.json({ company, success: true }, { status: 200 });
   } catch (error) {
    console.log('Company find by id error', error);
   }
}