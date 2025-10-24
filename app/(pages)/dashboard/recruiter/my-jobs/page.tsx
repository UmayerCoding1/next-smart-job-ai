import MyJobPage from "@/components/dashboard/recruiter/my-jobs/my-jobs";
import React, { Suspense } from "react";

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
