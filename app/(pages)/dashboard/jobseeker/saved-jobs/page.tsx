import SavedJobsPage from "@/components/dashboard/jobseeker/SavedJobsPage";

import React from "react";

export const metadata = {
  title: "Saved Jobs | Smart Job AI ",
  description: "Dashboard page of Smart Job AI AI-powered job platform.",
};

const page = () => {
  return (
    <div>
      <SavedJobsPage />
    </div>
  );
};

export default page;
