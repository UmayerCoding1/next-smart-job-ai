
import CustomBreadcrumb from "@/components/ui/custom/CustomBreadcrumb";
import JobDetails from "@/components/ui/job/JobDetails";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: { title?: string };
};

export const generateMetadata = async ({
  params,
  searchParams
}: Props): Promise<Metadata> => {
  const jobTitle = (await searchParams).title;
  console.log(jobTitle);
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${jobTitle} | Applied Job Details `);
    }, 100);
  });

  return {
    title: `${title} | Smart Job AI`,
  };
};

const BASE_URL = "https://next-smart-job-ai.vercel.app";

const getJob = async (jobId: string) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${jobId}`);
  const data = await res.json();

  return data.job;
};

const page = async ({ params }: Props) => {
  const jobId = (await params).id;
  if (!jobId) return null;

  const job = await getJob(jobId);
  if (!job) return <div>
    Loading . . . 
  </div>
  return (
    <>
    <CustomBreadcrumb link={[{ href: "/dashboard/jobseeker/applied-jobs", label: "Applied Jobs" }]} currentPage={job.title} />
      <JobDetails job={job} />
    </>
  );
};

export default page;
