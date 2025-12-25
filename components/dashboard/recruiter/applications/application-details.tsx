import { Badge } from "@/components/ui/badge";
import { getTimeAgo } from "@/lib/getTimeAgo";
import { Application } from "@/lib/mock-data";
import Image from "next/image";
import React from "react";
import { AIMatchScore } from "./application-card";
import { cn } from "@/lib/utils";
import { Briefcase, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isOpenApplicationDetais: boolean;
  setIsOpenApplicationDetais: React.Dispatch<React.SetStateAction<boolean>>;
  applicationData: Application | null;
}

const ApplicationDetails = ({
  isOpenApplicationDetais,
  setIsOpenApplicationDetais,
  applicationData,
}: Props) => {
 
  return (
    <div className="min-w-7xl mx-auto max-h-[500px] overflow-hidden  bg-white rounded-md border border-neutral-300 flex p-4">
      <Details appication={applicationData} />

      <div className="w-[300px]">action</div>
    </div>
  );
};

export default ApplicationDetails;

const Details = ({ appication }: { appication: Application | null }) => {
  return (
    <div className="flex-1 max-h-full overflow-scroll overflow-x-hidden">
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
            <div className="border border-neutral-300 p-3 rounded-lg  items-center flex w-full">
                <div className="flex items-center gap-2">
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
            <div className="border border-neutral-300 p-3 rounded-lg  items-center flex w-full">
                <div className="flex items-center gap-2">
                    <div className="rounded-md p-3 bg-violet-100 inline-block gap-2">
                    <FileText size={13} className="text-violet-500"/>
                </div>
                <div>
                        <p className="text-lg font-semibold tracking-tight">Cover Latter.pdf</p>
                        <p className="text-sm font-medium text-neutral-500">PDF Documents</p>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-end">
                    <ExternalLink size={13}/>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};


const Heading = ({children, className} : {children: React.ReactNode, className?: string}) => {
    return (
        <h1 className={cn("text-xl font-semibold tracking-tight flex items-center gap-2 my-2", className)}>
        {children}
      </h1>
    )
}


const Hr = () => {
    return (
        <hr  className="mt-4 mb-8 border border-neutral-300 rounded-2xl"/>
    )
}