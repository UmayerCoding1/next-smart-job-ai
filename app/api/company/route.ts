import { Company, ICompany } from "@/app/models/Company";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const isRecruiter = await withAuth(request, { allowedRoles: "recruiter" });
    if (!isRecruiter.ok) return isRecruiter.response;




    const {
      name,
      email,
      description,
      website,
      logo,
      coverImage,
      location,
      industry,
      recruiter
    }: ICompany = await request.json();
    
 console.log(industry);

    if (
      !name ||
      !email ||
      !description ||
      !website ||
      !logo ||
      !coverImage ||
      !location ||
      !industry || 
      !recruiter
    ) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    const companyExists = await Company.findOne({ $or: [{ name }, { email }] });

    if (companyExists) {
      return NextResponse.json(
        { message: "Company already exists", success: false },
        { status: 400 }
      );
    } else {
      await Company.create({
        name,
        email,
        description,
        website,
        logo,
        coverImage,
        location,
        industry,
        recruiter
      });
      return NextResponse.json(
        { message: "Company created successfully", success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Company post error", error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const isAdmin = await withAuth(request, { allowedRoles: "admin" });
    if (!isAdmin.ok) return isAdmin.response;

    const companies = await Company.find();
    return NextResponse.json({ companies }, { status: 200 });
  } catch (error) {
    console.log("Companys get error", error);
    throw error;
  }
}
