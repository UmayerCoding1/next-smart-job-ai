import PostForm from "@/components/dashboard/recruiter/post-job/post-form";

import React from "react";

export const metadata = {
  title: "Post a Job | Smart Job AI ",
  description: "Dashboard page of Smart Job AI AI-powered job platform.",
};

const Page = () => {
  return (
    <div className=" max-w-5xl mx-auto ">
      <PostForm />
    </div>
  );
};

export default Page;
