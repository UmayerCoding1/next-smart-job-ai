"use client";

import { IJob } from "@/app/models/Job";
import JobCard from "@/components/shared/job-card";
import { Button } from "@/components/ui/button";
import useMyJobs from "@/hooks/useMyJobs";

import React, { useState } from "react";

const AllJobs = ({ tab }: { tab: string }) => {
    const [showApplications, setShowApplications] = useState(false);
  const [page, setPage] = useState(1);

  const { jobs, isLoading } = useMyJobs({ page: page, status: tab });
 console.log(jobs);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(jobs);

  return (
    <div className="flex transition-all duration-150">

        <div className={`grid ${showApplications ? 'grid-cols-1 md:grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-8 mt-4 `}>
     {
      jobs?.map((job: IJob,inx: number) => (
        <JobCard key={inx} job={job} setShowApplications={setShowApplications}/>
      ))
     }
     {
      jobs?.map((job: IJob,inx: number) => (
        <JobCard key={inx} job={job} setShowApplications={setShowApplications}/>
      ))
     }
    </div>

   {showApplications &&  <div className="bg-emerald-400  w-[650px]">
       all application

       <Button onClick={() => setShowApplications(false)} variant={"destructive"}>Close</Button>
    </div>}
    </div>
  );
};

export default AllJobs;
