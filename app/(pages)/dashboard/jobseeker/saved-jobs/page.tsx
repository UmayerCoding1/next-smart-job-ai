import SavedJobsPage from "@/components/dashboard/jobseeker/SavedJobsPage";
import { getCookieInServer } from "@/hooks/getCookie";
import { cookies } from "next/headers";
// import { getCookieInClient } from "@/hooks/getCookieInClient";

import React from "react";

export const metadata = {
  title: "Saved Jobs | Smart Job AI ",
  description: "Dashboard page of Smart Job AI AI-powered job platform.",
};



const page = async () => {
  // const cookies = getCookieInClient('token');
  const token =await getCookieInServer('token');
  console.log(token);


  return (
    <div>
      <SavedJobsPage />
    </div>
  );
};

export default page;
