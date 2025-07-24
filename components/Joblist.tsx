"use client";
import { IJob } from "@/app/models/Job";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
// import PrimaryButton from "./button/PrimaryButton";
import FadeRight from "./animations/FadeRight";

import PrimaryButton from "./button/PrimaryButton";
import Link from "next/link";
import SaveButton from "./button/SaveButton";
import mongoose from "mongoose";
const CompanyDefaultLogo = "/assets/companu-default-logo.png";

// todo 1 : add company information to add next time , because company data in not available all job data;
const Joblist = ({ job }: { job: IJob }) => {
  const { title, location, experience, jobtype, shift, salaryrange, company } =
    job;
  console.log(job);
  return (
    <>
      <FadeRight>
        <div className="flex flex-col justify-between gap-3 shadow-md px-5 py-7 rounded-lg border bg-white border-gray-300 transition-all duration-200 w-full hover:bg-blue-50 hover:scale-105">
          <div className="flex items-center justify-between w-full">
            <Image
              src={
                typeof company === "object" && "logo" in company
                  ? company.logo
                  : CompanyDefaultLogo
              }
              alt="Google"
              width={100}
              height={100}
              className="w-12 h-12"
            />

            <div>
              <SaveButton
                className="w-20"
                jobId={(job!._id as mongoose.Types.ObjectId).toString()}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text">
              {typeof company === "object" && "name" in company
                ? company.name
                : "N/A"}
            </span>
            <span className="text-xs font-medium text-gray-500">5 day ago</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold lg:font-semibold">{title}</h1>

            <div className="flex items-center gap-2">
              <button className="bg-gray-100 px-2 py-1 text-sm font-medium rounded-lg mt-2 border border-gray-300">
                {jobtype}
              </button>
              <button className="bg-gray-100 px-2 py-1 text-sm font-medium rounded-lg mt-2 border border-gray-300">
                {experience}
              </button>
              <button className="bg-gray-100 px-2 py-1 text-sm font-medium rounded-lg mt-2 border border-gray-300">
                {shift}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-7 mt-3">
            <div>
              <p className="flex items-center font-semibold">
                {salaryrange?.min ? `$${salaryrange.min}` : "Negotiable"}
                {salaryrange?.max ? `$${salaryrange.max}` : ""}
              </p>
              <p className="text-sm flex items-center gap-1 text-gray-500">
                <MapPin size={13} />
                <span>{location}</span>
              </p>
            </div>

            <Link href={`/jobdetails/${job._id}`}>
              <PrimaryButton className="px-10 py-2">Apply</PrimaryButton>
            </Link>
          </div>
        </div>
      </FadeRight>
    </>
  );
};

export default Joblist;
