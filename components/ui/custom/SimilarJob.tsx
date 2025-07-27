import { IJob } from "@/app/models/Job";
import useJobs from "@/hooks/useJobs";
import React from "react";

import Joblist from "./Joblist";

type Props = {
  category: string;
  existingJodId: string;
};
const SimilarJob = ({ category, existingJodId }: Props) => {
  const { jobs } = useJobs(category, existingJodId);
  console.log(jobs.length);
  return (
    <div className="w-full lg:mt-5 p-3 flex flex-col gap-2">
      {jobs.length > 0 ? (
        jobs
          .slice(0, 5)
          .map((job: IJob) => <Joblist key={job._id?.toString()} job={job} />)
      ) : (
        <p className="text-sm text-gray-500">No similar jobs found.</p>
      )}
    </div>
  );
};

export default SimilarJob;
