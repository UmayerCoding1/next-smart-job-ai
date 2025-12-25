import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTimeAgo } from "@/lib/getTimeAgo";
import { Application } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  BriefcaseBusiness,
  CircleCheck,
  CircleX,
  Clock,
  EllipsisVertical,
  Eye,
  FileText,
  Mail,
  Phone,
  Sparkles,
  SquareArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  application: Application;
  setIsOpenApplicationDetais: React.Dispatch<React.SetStateAction<boolean>>;
  setApplication: React.Dispatch<React.SetStateAction<Application | null>>
}

const ApplicationCard = ({ application,setIsOpenApplicationDetais,setApplication }: Props) => {
  console.log(typeof application.appliedAt, "application.appliedAt");
  return (
    <>
      <div className="w-full h-[120px] border border-neutral-300 rounded-lg px-6 py-4">
        <div className=" w-full flex gap-2 ">
          <Image
            src={application.applicant.avatar}
            alt="applicant avatar"
            width={100}
            height={100}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div className=" flex-1 flex  flex-col justify-between h-[80px]">
            <div className="w-full flex justify-between">
              <div>
                <div className="flex gap-2 items-center">
                  <p className="text-xl font-semibold tracking-tight">
                    {application.name}{" "}
                  </p>
                  <Badge className="bg-blue-500">{application.status}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <p className="flex items-center gap-1 text-sm font-normal text-neutral-500">
                    <Mail size={9} className="text-neutral-500" />{" "}
                    {application.email}
                  </p>
                  <p className="flex items-center gap-1 text-sm font-normal text-neutral-500">
                    <Phone size={9} className="text-neutral-500" />{" "}
                    {application.phone}
                  </p>

                  <AppicationSubmitTime time={application?.appliedAt} />
                </div>
              </div>

              <div className="flex items-center gap-5">
                <AIMatchScore score={application?.matchScore} />
                <ApplicationActions />
              </div>
            </div>

            <div className="bg-neutral-200/30 rounded-lg p-3 flex  items-center justify-between">
              <p className="flex items-center gap-1">
                <BriefcaseBusiness size={12} />
                <p className="text-lg font-semibold tracking-tight">
                  {application?.job?.category}
                </p>
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant={"outline"}
                  className="border-neutral-300"
                  onClick={() => window.open(application?.resumeLink, "_blank")}
                >
                  <FileText />
                  Resume
                </Button>
                <Button onClick={() => {
                  setIsOpenApplicationDetais(true)
                  setApplication(application)
                }}>
                  View Details
                  <SquareArrowUpRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <span className="w-2 h-2 rounded-full block bg-green-500 absolute top-0 left-0"></span>
      </div>
    </>
  );
};

export default ApplicationCard;

export const AIMatchScore = ({ score }: { score: number }) => {
  if (typeof score !== "number") {
    return (
      <p className="text-sm text-neutral-400 flex items-center gap-1">
        <Sparkles size={14} />
        AI Match: Pending
      </p>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <p className="flex items-center gap-1 text-sm font-semibold text-neutral-500">
        <Sparkles size={16} />
        AI Match
      </p>
      <p>
        <span className={cn("text-4xl font-semibold text-green-600")}>
          {score.toFixed(0)}%
        </span>
      </p>
    </div>
  );
};

export const ApplicationActions = () => {
  const bulkActionLable: { title: string; Icon: React.ElementType }[] = [
    {
      title: "Mark as Unread",
      Icon: Eye,
    },

    {
      title: "Reject ",
      Icon: CircleX,
    },
    {
      title: "Accept",
      Icon: CircleCheck,
    },
  ];
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical size={14} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            {bulkActionLable.map((item, index) => (
              <DropdownMenuItem key={index}>
                <item.Icon />
                <span className="">{item.title}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

type AppicationSubmitTimeProps = {
  time: Date;
};

export const AppicationSubmitTime = ({ time }: AppicationSubmitTimeProps) => {
  return (
    <p className="flex items-center gap-1 text-sm font-normal text-neutral-500">
      <Clock size={9} className="text-neutral-500" /> {getTimeAgo(time)}
    </p>
  );
};
