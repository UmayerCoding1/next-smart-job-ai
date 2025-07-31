"use client";
import { IJob } from "@/app/models/Job";
import GostButton from "@/components/button/GostButton";
import Filter from "@/components/ui/custom/Filter";
import Joblist from "@/components/ui/custom/Joblist";
import Search from "@/components/ui/custom/Search";
import useJobs from "@/hooks/useJobs";
import { ChevronLeft, ChevronRight, Grid2X2, Menu } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const HeaderBg = "/assets/jods-header.jpg";

const BrowseJobs = () => {
  const [listView, setListView] = useState<string>("grid");
  const [page, setPage] = useState<number>(1);
 const [filterQuery, setFilterQuery] = useState<string | null>(null);
  const searchUrl = useSearchParams();
  const category = searchUrl.get("category") || "";
  const title = searchUrl.get("title") || "";
  const jobType = searchUrl.get("jobType") || "";
  const location = searchUrl.get("location") || "";
  const { jobs, isLoading } = useJobs(category, '', title, jobType, location, filterQuery);
  const router = useRouter();

console.log(filterQuery)
  console.log(category);
  const clearSearch = () => {
    router.push("/browse-jobs");
  };

  return (
    <div className="bg-blue-50/70">
      <div className="relative h-[430px] lg:h-[370px]  w-full ">
        <Image
          src={HeaderBg}
          alt="Google"
          width={800}
          height={800}
          className="w-full h-full "
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className=" z-10 flex flex-col items-center justify-center h-full absolute inset-0">
          <h2 className=" text-2xl lg:text-4xl font-bold text-white">
            Find the job that shine your life
          </h2>
          <p className="font-medium text-white">500k jobs for you to explore</p>
          <div className="bg-white rounded-lg mt-10 w-full lg:w-auto ">
            <Search
              title={title}
              jobType={jobType}
              location={location}
              clearSearch={clearSearch}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 lg:p-16">
        <div className="w-[22%] hidden lg:block bg-white p-5 rounded-md">
          <Filter setFilterQuery={setFilterQuery}/>
        </div>

        {/* <div>
          <Filter/>
        </div> */}

        <div className="flex-1">
          <div className="bg-white rounded-md mb-2 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center  gap-3">
              <GostButton
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
                className={`${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ChevronLeft size={13} />
              </GostButton>
              <div className="flex items-center gap-2 ">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-sm font-medium ${
                      page === index + 1 ? "text-blue-500" : "text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>

              <GostButton
                onClick={() => {
                  if (page < 5) {
                    setPage(page + 1);
                  }
                }}
                className={`${
                  page === 5 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ChevronRight size={13} />
              </GostButton>
            </div>

            <p className="text-lg font-medium lg:hidden">
              Showing {jobs.length} Jobs
            </p>
            <div className="lg:flex items-center gap-4 hidden">
              <p className="text-lg font-medium">View :</p>
              <Grid2X2
                onClick={() => setListView("grid")}
                className={`${
                  listView === "grid" ? "text-blue-500" : "text-gray-400"
                } border rounded-sm  p-1`}
              />
              <Menu
                onClick={() => setListView("list")}
                className={`${
                  listView === "list" ? "text-blue-500" : "text-gray-400"
                } border  rounded-sm p-1`}
              />
            </div>
          </div>

          <div className=" rounded-md">
            {isLoading ? (
              <div className="flex items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 ${
                  listView === "list" ? "lg:grid-cols-1" : "lg:grid-cols-4"
                } gap-4 p-4 max-h-screen overflow-auto scrollbar-hide`}
              >
                {jobs.map((job: IJob) => (
                  <Joblist key={job._id?.toString()} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;
