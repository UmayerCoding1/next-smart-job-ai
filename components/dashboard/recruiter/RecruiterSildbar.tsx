'use client';
import React from 'react';
import {  Bookmark, BriefcaseBusiness, Command, LayoutDashboard, Sparkles, SquarePlus } from "lucide-react";
import Sidebar from '@/components/shared/dashboard/Sidebar';
const RecruiterSildbar = () => {
     const navItem = [
    {
      name: "Overview",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      name: "Inbox",
      url: "/dashboard/recruiter/inbox",
      icon: Command,
    },
    {
      name: "Post a Job",
      url: "/dashboard/recruiter/post-job",
      icon: SquarePlus,
    },
    {
      name: "My Jobs",
      url: "/dashboard/recruiter/my-jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: BriefcaseBusiness,
    },
    {
      name: "Save Employees",
      url: "/dashboard/recruiter/saved-employees",
      icon: Bookmark,
    },
    
    {
      name: "AI Fetures",
      url: "/dashboard/jobseeker/ai-features",
      icon: Sparkles,
    }
  ];
    return (
        <>
            <Sidebar navItem={navItem} />
        </>
    );
};

export default RecruiterSildbar;