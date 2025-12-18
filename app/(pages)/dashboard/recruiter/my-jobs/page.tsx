import MyJobPage from "@/components/dashboard/recruiter/my-jobs/my-jobs";
import React, { Suspense } from "react";

export const metadata = {
    title: 'My Jobs | Smart Job AI ',
    description: 'Dashboard page of Smart Job AI AI-powered job platform.',
}

const MyJobs = () => {

  return (
    <div>
      <Suspense fallback={<p>Loading your jobs...</p>}>
        <MyJobPage />
      </Suspense>
    </div>
  );
};

export default MyJobs;
