"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {  Inbox } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MessageList from "./MessageList";

export type InboxLinkType = {
  name: string;
  icon: React.ElementType;
  href: string;
};

const InboxSideBar = () => {
  const inboxLink: InboxLinkType[] = [
    {
      name: "Inbox",
      icon: Inbox,
      href: "/dashboard/recruiter/inbox",
    },
    // {
    //   name: "Drafts",
    //   icon: File,
    //   href: "/dashboard/recruiter/inbox/drafts",
    // },
    // {
    //   name: "Sent",
    //   icon: Send,
    //   href: "/dashboard/recruiter/inbox/sent",
    // },
    // {
    //   name: "Junks",
    //   icon: ArchiveX,
    //   href: "/dashboard/recruiter/inbox/junks",
    // },
    // {
    //   name: "Trash",
    //   icon: Trash,
    //   href: "/dashboard/recruiter/inbox/trash",
    // },
  ];

  const pathname = usePathname();

  return (
    <div className="w-[350px] bg-gray-100 max-h-screen   flex ">
      <div className=" p-2 border-r border-gray-300 flex flex-col gap-3">
        {inboxLink.map((link, index) => {
          const Icon = link.icon;
          const isActive =
            link.href === "/dashboard/recruiter/inbox"
              ? pathname === "/dashboard/recruiter/inbox"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={index}
              href={link.href}
              className={`flex items-center gap-2 p-2 rounded-md ${
                isActive ? "bg-black text-white" : "text-gray-600"
              }`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Icon size={15} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            </Link>
          );
        })}
      </div>
      <div className="flex-1 p-2 overflow-y-scroll scrollbar-hide">
        <MessageList/>
      </div>
    </div>
  );
};

export default InboxSideBar;
