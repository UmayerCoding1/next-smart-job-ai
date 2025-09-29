import PostForm from "@/components/dashboard/recruiter/post-job/post-form";

import React from "react";

export const metadata = {
  title: "Post a Job | Smart Job AI ",
  description: "Dashboard page of Smart Job AI AI-powered job platform.",
};

const Page = () => {
  return (
    <div className=" max-w-5xl mx-auto overflow-auto bg-red-200 scrollbar-hide mb-20 ">
      <PostForm />
    </div>
  );
};

export default Page;
