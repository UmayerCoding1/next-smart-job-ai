
import PolicyPage from "@/components/ui/policy/PolicyPage";
import React from "react";

export const metadata = {
  title: 'Policy | Smart Job AI',
  description: 'Policy page of Smart Job AI AI-powered job platform.',
}

const page = () => {
  return (
    <div className="max-w-7xl mx-auto h-screen p-2 lg:p-0">
     <PolicyPage/>
    </div>
  );
};

export default page;
