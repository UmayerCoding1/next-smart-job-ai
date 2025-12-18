import JobDetails from "@/components/ui/job/JobDetails";
import React, { Suspense } from "react";

import { Metadata } from "next";
import JobDetailsLoading from "@/app/(pages)/job-details/[id]/loading";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const jobId = (await params).id;
  const res = await fetch(`${BASE_URL}/api/jobs/${jobId}`, {
    cache: "force-cache",
  });
  const data = await res.json();

  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(` ${data.job.title}`);
    }, 100);
  });

  return {
    title: `${title} | Smart Job AI`,
  };
};

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://next-smart-job-ai.vercel.app";

const getJob = async (jobId: string) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${jobId}`, {
    cache: "force-cache",
  });
  const data = await res.json();

  return data.job;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const job = await getJob(id);
  console.log(await params);

  console.log("job  id", id);

  if (!job) return <JobDetailsLoading />;
  return (
    <Suspense fallback={<JobDetailsLoading />}>
      <JobDetails job={job} />
    </Suspense>
  );
};

export default page;
