'use client';
import React from 'react';
import { BellRing, Bookmark, BriefcaseBusiness, Inbox, LayoutDashboard, Sparkles, User } from "lucide-react";
import Sidebar from '@/components/shared/dashboard/Sidebar';
const JobseekerSidebar = () => {
     const navItem = [
    {
      name: "Overview",
      url: "/dashboard/jobseeker",
      icon: LayoutDashboard,
    },
    {
      name: "Applied jobs",
      url: "/dashboard/jobseeker/applied-jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Saved jobs",
      url: "/dashboard/jobseeker/saved-jobs",
      icon: Bookmark,
    },
    {
      name: "Job Alerts",
      url: "/dashboard/jobseeker/job-alerts",
      icon: BellRing,
    },
    {
      name: "AI Fetures",
      url: "/dashboard/jobseeker/ai-features",
      icon: Sparkles,
    },
    {
      name: "Inbox",
      url: "/dashboard/jobseeker/inbox",
      icon: Inbox,
    },
  ];
    return (
        <>
          <Sidebar navItem={navItem}/>  
        </>
    );
};

export default JobseekerSidebar;