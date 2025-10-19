"use client";

import { IJob } from "@/app/models/Job";
import JobCard from "@/components/shared/job-card";
import { Button } from "@/components/ui/button";
import useMyJobs from "@/hooks/useMyJobs";
import { IDBDraftJobData } from "@/lib/types";
import { getAllDraftJobIDB } from "@/utils/indexedDB";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ViewAppication from "./view-appication";

const AllJobs = ({ tab }: { tab: string }) => {
    const [showApplications, setShowApplications] = useState(false);
    const [selectedJobAppilications, setSelectedJobApplications] = useState<{id:string, title:string, totalAppications: number}>({
      id: "",
      title: "",
      totalAppications: 0
    });
    const[draftJobs, setDraftJobs] = useState<IDBDraftJobData[]>([]);
  const [page, setPage] = useState(1);

  const { jobs, isLoading } = useMyJobs({ page: page, status: tab });

useEffect(() => {
   const handleGetAllDraftJobIDB = async () => {
    const draftJobs = await getAllDraftJobIDB();
    setDraftJobs(draftJobs);
   }

   handleGetAllDraftJobIDB();
  }, [tab]);

  // const draftJobs = getAllDraftJobIDB();
  if (isLoading) {
    return <div className="w-full h-full flex items-center justify-center">
      <Loader2 size={26} className="animate-spin"/>
    </div>;
  }

  const allJobs= [...jobs, ...draftJobs];

  

  

  return (
    <div className="flex transition-all duration-150">

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 `}>
     {
      allJobs?.map((job: IJob,inx: number) => (
        <JobCard key={inx} job={job} setShowApplications={setShowApplications} setSelectedJobApplications={setSelectedJobApplications}/>
      ))
     }
     
    </div>

   {showApplications &&  <div className=" bg-black/20  absolute top-0 left-0 w-full h-full flex items-center justify-center">
      
 

      <ViewAppication setShowApplications={setShowApplications} selectedJobAppilications={selectedJobAppilications}/>
      

    </div>}
    </div>
  );
};

export default AllJobs;
