"use client";

import { IJob } from "@/app/models/Job";
import PrimaryButton from "@/components/button/PrimaryButton";
import SaveButton from "@/components/button/SaveButton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import mongoose from "mongoose";


import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
// import SimilarJob from "./SimilarJob";

const book = "/assets/book-glass.jpg";
const CompanyDefaultLogo = "/assets/companu-default-logo.png";
const BgImage = "/assets/jods-details-header.jpg";

const JobDetails = ({ job }: { job: IJob }) => {
  const user = useSelector((state: RootState) => state.authR.user);
  if (!job) return <div>Job not found</div>;
  const {
    title,
    location,
    description,
    skills,
    education,
    holidayPolicy,
    vacancies,
    dedline,
    salaryrange,
    experience,
    requirements,
    benefits,
    jobtype,
    workTime,
    isRemoteAvailable,
    shift,
    appliedjobs
  } = job;
console.log(job);

const  company = job.company;
  const logoSrc =
    typeof company === "object" && "logo" in company && company.logo
      ? company.logo
      : CompanyDefaultLogo;

  const jobCetagoris = [
    "Web Development",
    "Graphic Design",
    "Database",
    "Business Management",
    "Accounting",
    "Creative Design",
    "IT Support",
    "Sales",
    "Customer Service",
    "Marketing",
    "Human Resources",
    "Legal",
    "Finance",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Transportation",
    "Retail",
    "Technology",
    "Energy",
    
  ];


  const handleApply = () => {
     sessionStorage.setItem("appliedAt", new Date().toISOString());
  }

 
  return (
    <div className="relative">
      <div className="relative">
        <Image
          src={BgImage}
          alt="job details header"
          width={800}
          height={800}
          className="w-full h-[250px] object-cover"
        />
        <div className="w-full h-[250px] bg-black/50 absolute top-0 left-0"></div>
      </div>

      <div className="max-w-7xl mx-auto p-2 lg:p-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="absolute top-[170px] lg:left-44 bg-white p-5 rounded-full shadow-2xl">
            <Image
              src={logoSrc}
              alt="company logo"
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-cover rounded-full "
            />
          </div>
          <div className="mt-16 lg:mt-20">
            <h2 className="text-4xl font-semibold">{title}</h2>
            <p className="text-lg font-medium ">
              {" "}
              {typeof company === "object" && "name" in company
                ? company.name
                : "N/A"}
            </p>
            <h2 className="text-lg font-semibold">
              <span>Salary : </span>
              <span>
                {salaryrange?.negotiable ? (
                  "Negotiable"
                ) : (
                  <span>
                    {salaryrange?.min}-{salaryrange?.max}
                    <span className="text-sm">
                      {salaryrange?.max?.toString().length === 5 && "K"}
                      {salaryrange?.max?.toString().length === 6 && "Lakh"}
                      {salaryrange?.max?.toString().length === 7 && "Lakhs"}
                    </span>
                  </span>
                )}
              </span>
            </h2>
            <p className="text-sm font-medium flex flex-col lg:flex-row lg:gap-4 text-gray-500">
              <span>{location}</span>
              <span>Post Date: 2 hours ago</span>

              <span>
                Deadline:{" "}
                {new Date(dedline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-5">
            <SaveButton
              jobId={(job!._id as mongoose.Types.ObjectId).toString()}
            />

{appliedjobs && user?._id  ? (
  appliedjobs.map(id => id.toString()).includes(user?._id.toString()) ? (
    // user has applied — show something
    <div>Already Applied</div>
  ) : (
   
   <Link
              href={
                user
                  ? `${
                      job!._id
                    }/apply?title=${job.title}`
                  : "/login"
              }
              onClick={handleApply}
              className="w-full lg:w-40"
            >
              <PrimaryButton className="w-full lg:w-40 h-9">
                Apply
              </PrimaryButton>
            </Link>
  )
) :    <Link
              href={
                user
                  ? `${
                      job!._id
                    }/apply`
                  : "/login"
              }
              onClick={handleApply}
              className="w-full lg:w-40"
            >
              <PrimaryButton className="w-full lg:w-40 h-9">
                Apply
              </PrimaryButton>
            </Link>}
            
          </div>
        </div>

        <div className="mt-10 lg:flex gap-5  ">
          <div className="lg:w-[73%] border border-gray-300 lg:p-2 rounded-md">
            <div className="bg-gray-50 p-3">
              <div>
                <h2 className="text-xl font-semibold">Job Description</h2>
                <p>{description}</p>
              </div>
              {/* responsibility */}
              <div className="mt-5">
                <h2 className="text-xl font-semibold"> Skills</h2>
                <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mt-2">
                  {skills?.map((skill) => (
                    <Button
                      key={skill}
                      variant={"ghost"}
                      className="border bg-gray-50"
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h2 className="text-xl font-semibold">Education</h2>
                <ul className=" mt-2">
                  {education?.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-5">
                <h2 className="text-xl font-semibold">Experience</h2>
                <ul className=" mt-2 flex items-center gap-2">
                  {experience?.map((option) => (
                    <li key={option} className="">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <h2 className="text-xl font-semibold">Requirements</h2>
                <ul className=" mt-2 ">
                  {requirements?.map((option) => (
                    <li key={option} className="">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <h2 className="text-xl font-semibold">Benefits</h2>
                <ul className=" mt-2 ">
                  {benefits?.map((option) => (
                    <li key={option} className="">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <h2 className="text-xl font-semibold">Job Type</h2>
                <ul className=" mt-2 ">
                  {jobtype?.map((option) => (
                    <li key={option} className="">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 bg-gray-100 p-2">
                <h2 className="text-xl font-semibold">
                  Responsibilities & Context
                </h2>
                <ul className="p-5">
                  <li className="list-disc">
                    <span className="text-lg font-medium">Office Time -</span>{" "}
                    <span>
                      {workTime?.start ?? "N/A"}-{workTime?.end ?? "N/A"}
                    </span>{" "}
                    <span className="text-sm text-gray-500 font-medium">
                      ({shift})
                    </span>{" "}
                  </li>
                  <li className="list-disc flex  flex-col">
                    <span className="text-lg font-medium">Workplace</span>{" "}
                    <span>
                      {isRemoteAvailable ? "Work from Home" : "Work at office"}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-5">
                <h2 className="text-xl font-semibold">Holiday Policy</h2>
                <ul>
                  <li>{holidayPolicy}</li>
                </ul>
              </div>

              <div className="mt-5">
                <p className="font-medium">
                  Total vacancies: {vacancies ?? "N/A"}
                </p>
              </div>
            </div>

             <div className="bg-gray-50 p-3 mt-4">
              <h2 className="text-2xl font-semibold">About Company</h2>

              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={logoSrc}
                      alt="company logo"
                      width={100}
                      height={100}
                      className="w-20 h-20"
                    />

                    <div>
                      <h1 className="text-2xl font-semibold">
                        {typeof company === "object" && "name" in company
                          ? company.name
                          : "N/A"}
                      </h1>
                      <p className="text-gray-500">10000 followers</p>
                      <Link
                        href={
                          typeof company === "object" && "website" in company
                            ? `${company.website}`
                            : "#"
                        }
                        target="_blank"
                        className="text-blue-500 text-sm font-medium border-b border-blue-500"
                      >
                        Website
                      </Link>
                    </div>
                  </div>

                  <Button className="cursor-pointer">
                    <Plus />
                    Follow
                  </Button>
                </div>

                <p className="my-5">
                  {typeof company === "object" && "description" in company
                    ? company.description
                    : "N/A"}
                </p>

                <div>
                  <Link href={"#"} className="flex flex-col lg:flex-row  gap-5">
                    <Image
                      src={book}
                      alt="book"
                      width={100}
                      height={100}
                      className="w-full lg:w-1/2 h-48 lg:h-40 rounded-md"
                    />

                    <div>
                      <h2 className="text-2xl font-semibold">
                        How do I cancel my reservation for a to stay?
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Cum exercitationem, at nulla voluptas praesentium
                        accusantium omnis odit? Pariatur provident corporis
                        quasi laudantium neque. Laudantium veritatis harum
                        fugiat sed ratione libero.
                      </p>
                      <span className="text-blue-500 text-sm font-medium">
                        Read more
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[27%] h-screen">
            <div>
              <h2 className="text-2xl font-semibold">
                Similar Jobs
                {/* <SimilarJob
                  category={job.category}
                  existingJodId={(
                    job!._id as mongoose.Types.ObjectId
                  ).toString()}
                /> */}
              </h2>

              <div>
                <h2 className="text-xl font-semibold mt-5">
                  Try Searching for
                </h2>
                <div>
                  {jobCetagoris.map((value, index) => (
                    <button
                      key={index}
                      className="bg-blue-50 mr-2 p-2 my-1 rounded-lg text-sm text-blue-500 font-medium hover:bg-blue-100 cursor-pointer"
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
