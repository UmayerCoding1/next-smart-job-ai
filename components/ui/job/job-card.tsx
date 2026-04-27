import { IJob } from "@/app/models/Job";
import { Bookmark, CircleDollarSign } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import useDebouncedPrefetch from "@/hooks/useDebouncedPrefetch";
import { getJob } from "@/service/api";
import { Button } from "../button";
import { motion } from 'motion/react';
import SaveButton from "@/components/button/SaveButton";
import mongoose from "mongoose";

const CompanyDefaultLogo = "/assets/companu-default-logo.png";

// todo 1 : add company information to add next time , because company data in not available all job data;
const JobCard = ({ job, delay }: { job: IJob, delay: number }) => {
  const { title, location, jobtype, salaryrange, company, createdAt } = job;

  const jobId = job._id?.toString();
  const { handleMouseEnter, handleMouseLeave, handleClick } =
    useDebouncedPrefetch({
      queryKeyBuilder: () => ["job", job._id?.toString()],
      fetchFn: (id) => getJob(id),
      routeBuilder: (id) => `/job-details/${id}`,
    });

  function timeAgo(date: Date | string) {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000); // seconds

    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
    return past.toLocaleDateString();

  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: delay * 0.2 }}
      viewport={{ once: true }}
      className="w-full md:h-[250px] shadow-lg border-t rounded-2xl p-4 relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between ">
            <Image
              width={500}
              height={500}
              className="w-14 h-14 object-cover p-1 rounded-full border"
              src={
                typeof company === "object" && "logo" in company
                  ? company?.logo
                  : CompanyDefaultLogo
              }
              alt="Google"
            />

            <SaveButton
              className="w-auto"
              jobId={(job!._id as mongoose.Types.ObjectId).toString()}
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{typeof company === "object" && "name" in company ? company?.name : "Company"}</h2>
              <p className="text-xs text-neutral-500 font-medium ">{timeAgo(createdAt || new Date())}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral-900 truncate">{title}</h2>

            <div className="flex items-center gap-2 mt-4">
              {jobtype.map((jobtype: string, index: number) => (
                <button
                  key={index}
                  className="bg-neutral-200/70 text-neutral-900 px-2 py-1.5 text-sm font-medium rounded-md "
                >
                  <span>{jobtype.charAt(0).toUpperCase() + jobtype.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full border-t pt-4 mt-4 flex items-center justify-between ">
          <div>
            <div className="flex items-center gap-1  text-neutral-800">
              <CircleDollarSign size={13} />
              <p className="flex items-center font-semibold text-md">
                <span>
                  {" "}
                  {salaryrange?.min
                    ? `$${salaryrange.min / 1000}k`
                    : "Negotiable"}
                </span>
                {salaryrange?.min && salaryrange?.max && <span>-</span>}
                <span>
                  {salaryrange?.max ? `$${salaryrange.max / 1000}k` : ""}
                </span>
              </p>
            </div>
            <p className="text-xs text-neutral-500 font-medium">{location}</p>
          </div>


          <Link href={`/job-details/${jobId}`}><Button className="bg-green-500 text-white hover:bg-green-600 group-hover:scale-105 transition-all duration-300">Apply Now</Button></Link>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
