"use client";
import React from "react";
import Search from "../Search";
import { IJob } from "@/app/models/Job";
import Joblist from "../Joblist";

import { ChevronRight } from "lucide-react";

import Link from "next/link";
import PrimaryButton from "../button/PrimaryButton";
import useJobs from "@/hooks/useJobs";
const Jobs = () => {
 

const {jobs} = useJobs('','')
console.log(jobs);
  const handleSearch = (search: {
    jobTitle: string;
    location: string;
    jobType: string;
  }) => {
    console.log(search);
  };

  return (
    <div>
      <section className="mt-16 ">
        <div>
          <div className="mb-5">
            <h2 className="text-3xl font-bold">Featured jobs</h2>
            <p className="text-sm ">
              Know your worth and find the job that qualify your life
            </p>
          </div>
          <Search onSearch={handleSearch} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {jobs?.length > 0 ? (
              jobs
                .slice(0, 8)
                .map((job: IJob) => (
                  <Joblist key={job._id?.toString()} job={job} />
                ))
            ) : (
              <p>No jobs found</p>
            )}
          </div>

          <div className="flex items-center justify-center mt-2">
            <Link href={`/browse-jobs?page=1`}>
              <PrimaryButton
                className=" px-10 py-2 mt-5"
                Icon={ChevronRight}
                iconSize={20}
                iconPosition="right"
              >
                <span>View all jobs</span>
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
