"use client";
import useJobApplication from "@/hooks/useJobApplication";
import React, { useEffect, useMemo, useState } from "react";
import ApplicationCard from "./application-card";
import { Application } from "@/lib/mock-data";
import Loading from "@/components/shared/loading";
import ApplicationDetails from "./application-details";
import { MoveLeft, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ApplicationListing = ({ searchQuery,statusFilter,sortBy }: { searchQuery: string,statusFilter: string, sortBy: string}) => {
  const [isOpenApplicationDetais, setIsOpenApplicationDetais] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);

    const [page, setPage] = useState(1);
    const limit = 10;
  const { JobApplications,paginationCounter, isLoading } = useJobApplication({ searchQuery,page,limit });

const applications = useMemo(() => {
  let data = [...JobApplications];

  // status filter
  if (statusFilter !== "all") {
    data = data.filter(
      (application: Application) =>
        application.status === statusFilter
    );
  }

  // sort by match score
  if (sortBy === "score") {
    data.sort((a, b) => b.matchScore - a.matchScore);
  }

  return data;
}, [JobApplications, statusFilter, sortBy]);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loading color="gray" />
      </div>
    );
  }


  // const applications = JobApplications.filter((application : Application) => statusFilter === "all"  ? true : application.status === statusFilter);

 

  return (
    <>
      {JobApplications.length > 0 ? (
        <div className="flex flex-col gap-2">
          {applications.map((application: Application) => (
           
            <div key={application._id} className="relative">
              <ApplicationCard application={application}  setIsOpenApplicationDetais={setIsOpenApplicationDetais} setApplication={setApplication}/>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            No applications found.
          </p>
        </div>
      )}

      {isOpenApplicationDetais && (
        <div onClick={() => setIsOpenApplicationDetais(false)} className="fixed inset-0 w-full h-screen bg-black/50 z-10 flex items-center justify-center">
            <ApplicationDetails isOpenApplicationDetais setIsOpenApplicationDetais={setIsOpenApplicationDetais} applicationData={application}/>
        </div>
      )}

      {applications.length > 0 && (
        <Pagination page={page} setPage={setPage} limit={limit} paginationCounter={paginationCounter} />
      )}
    </>
  );
};

export default ApplicationListing;



const Pagination = ({ page, setPage, limit,paginationCounter }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>>, limit: number, paginationCounter: {totalApplications: number,totalPages: number,currentPage: number} }) =>{
  return <div className="mt-10 mb-3 w-full flex items-center justify-center">
     <div className="flex items-center gap-2 bg-[#EEF0F1] border-2 border-neutral-200 px-1 py-1 rounded-full ">
         <MoveLeft onClick={() => setPage && setPage(page - 1)} className={cn( "bg-white px-2 py-1 rounded-full cursor-pointer" , page === 1 && "opacity-50 cursor-not-allowed pointer-events-none ") }  />
            {Array.from({ length: paginationCounter.totalPages }).map((_, index) => (
                <div
                    key={index}
                    className={cn("px-2 py-1 group cursor-pointer")}
                    onClick={() => setPage && setPage(index + 1)}
                >
                   <p className={cn("text-sm group-hover:text-blue-500 text-neutral-400/50 " , page === index + 1 && "text-blue-500 text-md font-medium")}>{index + 1  }</p>
                </div>
            ))}
         <MoveRight onClick={() => setPage && setPage(page + 1)} className={cn("bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-full cursor-pointer", page === paginationCounter.totalPages && "opacity-50 cursor-not-allowed pointer-events-none" )} />
     </div>
  </div>
}