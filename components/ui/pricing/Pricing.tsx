'use client';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import JobseekerPlan from "./JobseekerPlan";
import RecruiterPlan from "./RecruiterPlan";
import FQA from "@/components/home/FQA";

const PricingPage = () => {
    const [selectedRole, setSelectedRole] = useState("jobseeker");
    const [isPlanType, setIsPlanType] = useState(false);
   console.log(isPlanType);
  return (
    <div className=" min-h-screen my-16">
      <div className="flex items-center justify-center flex-col gap-5">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Choose your plan</h2>
          <p className="text-sm font-medium"> SmartJobAi Pricing Plans</p>
        </div>

       <div className="flex items-center gap-4">
         <Select onValueChange={(e) => setSelectedRole(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Role</SelectLabel>
              <SelectItem value="jobseeker">Jobseeker</SelectItem>
              <SelectItem value="recruiter">recruiter</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Label htmlFor="airplane-mode">Monthly</Label>
          <Switch
        id="airplane-mode"
        checked={isPlanType}
        onCheckedChange={setIsPlanType}
      />
          <Label htmlFor="airplane-mode">Yearly</Label>
        </div>
       </div>
      </div>


      <div className="bg-gradient-to-b from-[#fff]  via-[#8f34e980] to-[#4371e68c] w-full  mt-20 p-5 lg:p-20">
          {selectedRole === "jobseeker" && (
           <JobseekerPlan isPlanType={isPlanType}/>
          )}
          {selectedRole === "recruiter" && (
            <RecruiterPlan isPlanType={isPlanType}/>
          )}
      </div>



     <div className="max-w-7xl mx-auto mt-20">
      <FQA/>
     </div>
    </div>
  );
};

export default PricingPage;
