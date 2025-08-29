import { IJob } from "@/app/models/Job";
import { CircleDollarSign, MapPin, Timer } from "lucide-react";
import Image from "next/image";
import React from "react";



import Link from "next/link";

import useDebouncedPrefetch from "@/hooks/useDebouncedPrefetch";
import { getJob } from "@/service/api";
import FadeRight from "@/components/animations/FadeRight";


const CompanyDefaultLogo = "/assets/companu-default-logo.png";

// todo 1 : add company information to add next time , because company data in not available all job data;
const Joblist = ({ job }: { job: IJob }) => {
  const { title, location, jobtype, salaryrange, company } = job;

  const jobId = job._id?.toString();
  const { handleMouseEnter, handleMouseLeave, handleClick } =
    useDebouncedPrefetch({
      queryKeyBuilder: () => ["job", job._id?.toString()],
      fetchFn: (id) => getJob(id),
      routeBuilder: (id) => `/job-details/${id}`,
    });
  return (
    <>
      <FadeRight>
        <Link
          href={`/job-details/${job._id}?title=${title}`}
          onMouseEnter={() => handleMouseEnter(jobId!)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(jobId!)}
          className={
            "flex flex-col justify-between gap-3 shadow-md px-5 py-7 rounded-lg border bg-white border-gray-300 transition-all duration-200 w-full min-h-[230px] hover:bg-blue-50/50 hover:scale-105 "
          }
        >
          <div className="flex items-center justify-between w-full ">
            <div className="flex items-center gap-2">
              {jobtype.map((jobtype: string, index: number) => (
                <button
                  key={index}
                  className="bg-blue-100 text-blue-500 px-2 py-1 text-sm font-medium rounded-lg "
                >
                  {jobtype}
                </button>
              ))}
            </div>

            
          </div>

          <div>
            <h1 className="text-2xl font-bold lg:font-semibold">{title}</h1>

            <div className="flex items-center gap-2 mt-5">
              <div className="flex items-center gap-1 text-blue-600">
                <Timer size={13} />
                <span className="text-sm font-medium ">5 day ago</span>
              </div>
              <div className="flex items-center gap-1  text-blue-600">
                <CircleDollarSign size={13} />
                <p className="flex items-center font-semibold text-sm">
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
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-7 mt-3">
            <div className="flex items-center gap-3">
              <Image
                src={
                  typeof company === "object" && "logo" in company
                    ? company?.logo
                    : CompanyDefaultLogo
                }
                alt="Google"
                width={100}
                height={100}
                className="w-12 h-12"
              />
              <div className="">
                <span className="font-semibold text">
                  {typeof company === "object" && "name" in company
                    ? company.name
                    : "N/A"}
                </span>

                <p className="text-sm flex items-center gap-1 text-gray-500">
                  <MapPin size={13} />
                  <span>{location}</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      </FadeRight>
    </>
  );
};

export default Joblist;
