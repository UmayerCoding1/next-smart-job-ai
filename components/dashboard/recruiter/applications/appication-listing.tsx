"use client";
import useJobApplication from "@/hooks/useJobApplication";
import React, { useState } from "react";
import ApplicationCard from "./application-card";
import { Application } from "@/lib/mock-data";
import Loading from "@/components/shared/loading";
import ApplicationDetails from "./application-details";

const ApplicationListing = ({ searchQuery }: { searchQuery: string }) => {
  const [isOpenApplicationDetais, setIsOpenApplicationDetais] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);
  const { JobApplications, isLoading } = useJobApplication({ searchQuery });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loading color="gray" />
      </div>
    );
  }
  return (
    <>
      {JobApplications.length > 0 ? (
        <div className="flex flex-col gap-2">
          {JobApplications.map((application: Application) => (
           
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
        <div className="fixed inset-0 w-full h-screen bg-black/50 z-10 flex items-center justify-center">
            <ApplicationDetails isOpenApplicationDetais setIsOpenApplicationDetais={setIsOpenApplicationDetais} applicationData={application}/>
        </div>
      )}
    </>
  );
};

export default ApplicationListing;
