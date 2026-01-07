import Heading from "@/components/heading";
import Hr from "@/components/hr-tag";
import { Badge } from "@/components/ui/badge";
import { getTimeAgo } from "@/lib/getTimeAgo";
import { Application } from "@/lib/mock-data";
import { Briefcase, Clock, ExternalLink, FileText } from "lucide-react";
import Image from "next/image";
import { AIMatchScore } from "./application-card";
import CoverLatterPdf from "./cover-latter-pdf";

const Details = ({ appication }: { appication: Application | null }) => {
 const downloadPdf =async (url: string, fileName = "document.pdf") => {
   try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch file");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

  return (
    <div className="flex-1 max-h-full overflow-scroll overflow-x-hidden w-full p-2">
      <Heading>Appication Details</Heading>
      <Badge className="bg-blue-500 text-white dark:bg-blue-600">
        {appication?.status}
      </Badge>

      <div className="w-full border border-neutral-300  p-4  mt-3 rounded-lg  flex  gap-3">
        <Image
          src={appication?.applicant.avatar || ""}
          alt="applicant avatar"
          width={100}
          height={100}
          className="w-20 h-20 rounded-full object-cover border-4 border-white"
        />

        <div className="flex-1 flex  items-center justify-between">
            <div>
                <p className="text-3xl font-semibold  tracking-tight">
                    {appication?.name}
                </p>
                <p className="text-sm font-semibold text-neutral-500 tracking-tight">
                    {appication?.email}
                </p>
                <p className="text-sm font-semibold text-neutral-500 tracking-tight">
                    {appication?.phone}
                </p>
                <p className="text-sm font-semibold text-neutral-500 tracking-tight">
                    {getTimeAgo(appication?.appliedAt || "")}
                </p>
                <p className="text-sm font-semibold text-neutral-500 tracking-tight">
                    Expected Salary: <span className="text-black">{appication?.expectedSalary}$</span>
                </p>
            </div>

            <div className="bg-white p-2 rounded-md">
                <AIMatchScore score={appication?.matchScore || 0}/>
            </div>
        </div>
      </div>

<Hr/>

{/* jon informations */}
      <div>
       
        <Heading>
            <Briefcase className="" size={18} />
            Job Information
        </Heading>
      
      <div className="flex items-center justify-evenly gap-2 mt-2">
        <div className="bg-neutral-300/20 border border-neutral-300 rounded-lg  p-2 w-[150px]">
            <p className="text-sm text-neutral-500 font-medium my-2">Title</p>
            <p className="text-2xl font-semibold tracking-tight">{appication?.job.title}</p>
        </div>
        <div className="bg-neutral-300/20 border border-neutral-300 rounded-lg  p-2 w-[150px]">
            <p className="text-sm text-neutral-500 font-medium my-2">Department</p>
            <p className="text-2xl font-semibold tracking-tight">{appication?.job.category}</p>
        </div>
        <div className="bg-neutral-300/20 border border-neutral-300 rounded-lg  p-2 w-[150px]">
            <p className="text-sm text-neutral-500 font-medium my-2">Applied Date</p>
            <p className="text-2xl font-semibold tracking-tight">{getTimeAgo(appication?.appliedAt || "")}</p>
        </div>
        
        
      </div>
      </div>

      <Hr/>

      {/* Documents */}
      <div>
        <Heading>
            <FileText  size={18}/>
            Documents
        </Heading>

        <div className="flex items-center gap-2">
            <div onClick={() =>
    downloadPdf(
      appication?.resumeLink || "",
      `${appication?.name}.pdf`
    )
  } className="border border-neutral-300 p-3 rounded-lg  items-center flex w-full cursor-pointer ">
                <div  className="flex items-center gap-2">
                    <div className="rounded-md p-3 bg-blue-100 inline-block gap-2">
                    <FileText size={13} className="text-blue-500"/>
                </div>
                <div>
                        <p className="text-lg font-semibold tracking-tight">Resume.pdf</p>
                        <p className="text-sm font-medium text-neutral-500">PDF Documents</p>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-end">
                    <ExternalLink size={13}/>
                </div>
            </div>
           <CoverLatterPdf coverLetter={appication?.coverLetter || ""} jobTitle={appication?.job.title || ""} name={appication?.name || ""} email={appication?.email || ""} phone={appication?.phone || ""} imageUrl={appication?.applicant.avatar || ""}/>
        </div>
      </div>


      <Hr/>

      {/* cover latter */}
      <div>
        <Heading>Cover Letter</Heading>
        <p className="bg-neutral-100 p-4 rounded-md">{appication?.coverLetter}</p>
      </div>


    <Hr/>
      {/* Question Answers */}
       <div>
        <Heading>Question Answers</Heading>
        <div>
          {appication?.jobRelatedQuestions?.map((question) => (
            <div key={question.questionNumber} className="my-4 bg-neutral-100/50 p-4 rounded-md border border-neutral-300">
              <p className="text-md font-medium tracking-tight">{question.question}</p>
              <p className="text-[10px]">{question.answer}</p>
            </div>
          ))}
        </div>
       </div>

  <Hr/>

  {/* Time line */}

  <div>
    <Heading><Clock size={13}/> Time Line</Heading>
    <div className="flex gap-2 flex-col">
      <div className="flex items-center justify-between border border-neutral-200 hover:bg-neutral-100 p-3 rounded-md cursor-pointer">
        <div className="flex items-center gap-2">
          <Clock size={13}/>
          <p className="text-lg font-semibold tracking-tight">Job Publish</p>
        </div>
        <p className="text-sm text-neutral-500">{getTimeAgo(appication?.job.createdAt || "")}</p>
      </div>
      <div className="flex items-center justify-between border border-neutral-200 hover:bg-neutral-100 p-3 rounded-md cursor-pointer">
        <div className="flex items-center gap-2">
          <Clock size={13}/>
          <p className="text-lg font-semibold tracking-tight">Application Submitted</p>
        </div>
        <p className="text-sm text-neutral-500">{getTimeAgo(appication?.appliedAt|| "")}</p>
      </div>
    </div>
  </div>



    </div>
  );
};

export default Details;