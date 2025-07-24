import useJobs from "@/hooks/useJobs";
import React from "react";

type Props = {
  category: string;
  existingJodId: string
};
const SimilarJob = ({ category,existingJodId }: Props) => {
  const { jobs } = useJobs(category,existingJodId);
  console.log(jobs.length);
  return <div></div>;
};

export default SimilarJob;
