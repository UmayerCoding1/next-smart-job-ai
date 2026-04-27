"use client";
import React from "react";

import { IJob } from "@/app/models/Job";

import { ChevronRight } from "lucide-react";

import Link from "next/link";

import useJobs from "@/hooks/useJobs";


import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Search from "../custom/Search";
import Joblist from "./job-card";
import PrimaryButton from "@/components/button/PrimaryButton";
import JobCard from "./job-card";
import { Button } from "../button";
import { motion } from "motion/react";
const Jobs = () => {
  const searchQuery = useSelector((state: RootState) => state.searchR.search);

  console.log("home jobs ", searchQuery);
  const { jobs } = useJobs("", "", "", "", "", "");



  return (
    <div>
      <section className="mt-16 ">
        <div className="">
          <div className="mb-10 flex flex-col lg:items-center lg:justify-center">
            <h2 className="text-3xl font-bold">Featured jobs</h2>
            <p className="text-sm mt-1 max-w-lg text-left lg:text-center ">
              Discover top opportunities tailored to your skills and start building a career that matches your lifestyle and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {jobs?.length > 0 ? (
              jobs
                .slice(0, 8)
                .map((job: IJob, inx: number) => (
                  <JobCard key={job._id?.toString()} job={job} delay={inx} />
                ))
            ) : (
              <>
                {Array.from({ length: 8 }).map((_, inx) => (
                  <div className="w-full h-80 bg-neutral-200/70 rounded-xl overflow-hidden relative">
                    <div className="flex gap-3 w-full h-full">
                      <motion.div className="w-8 h-[200%] bg-neutral-200/70 opacity-30 "
                        initial={{ opacity: 0.6, x: 0, y: 0 }}
                        animate={{ opacity: 0.6, x: 300, y: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: inx * 0.1 }}
                      />
                      <motion.div className="w-8 h-[200%] bg-neutral-200/70 opacity-30 "
                        initial={{ opacity: 0.6, x: 0, y: 0 }}
                        animate={{ opacity: 0.6, x: 300, y: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: inx * 0.1 }}
                      /></div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="flex items-center justify-center mt-2">
            <Link href={`/browse-jobs?page=1`}>
              <Button
                className=" px-10 py-3 mt-5 bg-green-500 hover:bg-green-600 text-white"

              >
                <span>View all jobs</span>
                <ChevronRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
