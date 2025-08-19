import JobDetails from "@/components/ui/job/JobDetails";
import React, { Suspense } from "react";
import JobDetailsLoading from "./loading";
import { Metadata } from "next";


type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const jobId = (await params).id;
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Job Details ${jobId}`);
    }, 100);
  });

  return {
    title: `${title} | Smart Job AI`,
  }
};

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://next-smart-job-ai.vercel.app";

const getJob = async (jobId: string) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${jobId}`);
  const data = await res.json();

  return data.job;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) return <JobDetailsLoading />;
  return (
    <Suspense fallback={<JobDetailsLoading />}>
      <JobDetails job={job} />
    </Suspense>
  );
};

export default page;
