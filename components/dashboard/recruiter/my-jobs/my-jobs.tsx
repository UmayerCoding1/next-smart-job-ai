"use client";
import { Briefcase, FilePenLine, FolderOpenDot, Lock } from "lucide-react";
import React from "react";
import AllJobs from "./all-jobs";
import OpenJobs from "./open-jobs";
import ClosedJobs from "./closed-jobs";
import DraftJobs from "./draft-jobs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MyJobPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentTab = searchParams.get("tab") || "All Jobs";
  const TabList = [
    { label: "All Jobs", icon: <Briefcase size={13} /> },
    { label: "Open Jobs", icon: <FolderOpenDot size={13} /> },
    { label: "Closed Jobs", icon: <Lock size={13} /> },
    { label: "Draft Jobs", icon: <FilePenLine size={13} /> },
  ];

  

  const handleTabClick = (tabLabel: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tabLabel);
    router.push(`${pathname}?${params.toString()}`);
  };


  return (
    <div className=" ">
      <div className="mb-5 px-2">
        <h1 className="text-4xl font-bold text-neutral-800">My Jobs</h1>
        <p className="text-muted-foreground">
          Manage and track all your job postings
        </p>
      </div>

      <div className="flex border-t border-neutral-300  ">
        <div className="w-[180px] border-r border-neutral-300 bg-neutral-50 transition-all duration-200 flex flex-col gap-2">
          {TabList.map((tab, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(tab.label)}
              data-active={currentTab === tab.label}
              className={`relative w-full flex items-center gap-2 cursor-pointer select-none rounded-md px-3 py-2 mb-1 transition-all duration-150 
        ${
          currentTab === tab.label
            ? "text-blue-500 font-semibold bg-white border border-neutral-300 shadow-sm"
            : "text-neutral-700 hover:bg-neutral-100"
        }`}
            >
              <span className="flex items-center justify-center">
                {tab.icon}
              </span>
              <p className="text-sm tracking-wide font-medium">{tab.label}</p>

              {currentTab === tab.label && (
                <div className="absolute right-0 top-0 w-[3px] h-full bg-blue-500 rounded-l-md"></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex-1  min-h-[450px]">
          {currentTab === "All Jobs" && <AllJobs tab={currentTab} />}
          {currentTab === "Open Jobs" && <OpenJobs tab={currentTab} />}
          {currentTab === "Closed Jobs" && <ClosedJobs tab={currentTab}/>}
          {currentTab === "Draft Jobs" && <DraftJobs tab={currentTab}/>}
        </div>
      </div>
    </div>
  );
};

export default MyJobPage;
