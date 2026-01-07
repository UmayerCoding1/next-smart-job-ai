import { Application } from "@/app/models/Application";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const appicationId = (await params).id;
    const body = await req.json();
    const { status } = body;

    const appication = await Application.findById(appicationId);
    if (!appication)
      return NextResponse.json(
        { message: "Application not found", success: false },
        { status: 500 }
      );

    appication.status = status;
    await appication.save();
    return NextResponse.json(
      { message: "Application status updated", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
