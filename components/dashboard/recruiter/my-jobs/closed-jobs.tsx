import { IJob } from "@/app/models/Job";
import JobCard from "@/components/shared/job-card";
import useMyJobs from "@/hooks/useMyJobs";
import React, { useState } from "react";
import ViewAppication from "./view-appication";

const ClosedJobs = ({ tab }: { tab: string }) => {
  const [showApplications, setShowApplications] = useState(false);
  const [selectedJobAppilications, setSelectedJobApplications] = useState<{
    id: string;
    title: string;
    totalAppications: number;
  }>({
    id: "",
    title: "",
    totalAppications: 0,
  });
  const [page, setPage] = useState(1);
  const { jobs, isLoading } = useMyJobs({ page: page, status: tab });

  if (isLoading) return <div>Loading...</div>;
  console.log(jobs);
  return (
    <div>
      <div
        className={`grid 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 `}
      >
        {jobs?.map((job: IJob, inx: number) => (
          <JobCard
            key={inx}
            job={job}
            setShowApplications={setShowApplications}
            setSelectedJobApplications={setSelectedJobApplications}
          />
        ))}
      </div>

      {showApplications && (
        <div className=" bg-black/20  absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <ViewAppication
            setShowApplications={setShowApplications}
            selectedJobAppilications={selectedJobAppilications}
          />
        </div>
      )}
    </div>
  );
};

export default ClosedJobs;
