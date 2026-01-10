import { Application } from "@/app/models/Application";
import { SendMessageForApplicant } from "@/app/models/SendMessage";
import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { sendEmailWithNodemailer } from "@/service/nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest
) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { applicant,appicationId,email,job_title,company_name,interview } = body;

    if(!applicant || !appicationId ||!email || !job_title || !company_name ||!interview)
      return NextResponse.json(
        { message: "Bad request body , missing required fields", success: false },
        { status: 400 }
      );

    const appication = await Application.findById(appicationId);
    if (!appication)
      return NextResponse.json(
        { message: "Application not found", success: false },
        { status: 500 }
      );

      const user = await User.findById(applicant);
      if(!user)
        return NextResponse.json(
          { message: "User not found", success: false },
          { status: 404 }
        );


       await SendMessageForApplicant.create({
          recruiter: appication.recruiter,
          applicant: applicant,
          appicationId: appicationId    
      });


      const emailTemplate = `
Hello ${user.name},<br/><br/>

Thank you for applying for the position of
<strong>${job_title}</strong> at <strong>${company_name}</strong> through
<strong>SmartJod AI</strong>.<br/><br/>

We are pleased to inform you that your application has been
<strong>reviewed and shortlisted</strong>. Based on your profile, we would like
to invite you to attend an interview.<br/><br/>

<strong>📅 Interview Details</strong><br/>
• <strong>Date:</strong> ${interview.date}<br/>
• <strong>Time:</strong> ${interview.time}<br/>
• <strong>Mode:</strong> ${interview.mode}<br/>
• <strong>Location / Meeting Link:</strong>
<a href="${interview.link}">${interview.link}</a><br/><br/>

Please make sure to be available at the scheduled time.
If you are unable to attend, feel free to reply to this email so we can
reschedule accordingly.<br/><br/>

We wish you the best of luck and look forward to speaking with you soon.<br/><br/>

Best regards,<br/>
<strong>Umayer</strong><br/>
SmartJod AI Team<br/>
📧 <a href="mailto:support@smartjod.ai">support@smartjod.ai</a><br/>
🌐 <a href="https://smartjod.ai">https://smartjod.ai</a>
`;


      const sendMessage = await sendEmailWithNodemailer(email,'SmartJobAI Application Message',emailTemplate);

      if (!sendMessage.success) {
      return NextResponse.json(
        { message: "Failed to send OTP", success: false },
        { status: 500 }
      );
    }




    return NextResponse.json(
      { message: "Application message sent", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
