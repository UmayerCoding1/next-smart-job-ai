'use client';
import React from 'react';
import {  BriefcaseBusiness, Command, FileText, LayoutDashboard, SquarePlus, UserRoundCog } from "lucide-react";
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
      icon: FileText,
    },
    {
      name: "Interview Management",
      url: "/dashboard/recruiter/interview-management",
      component: true,
      icon: UserRoundCog,
    }
  ];
    return (
        <>
            <Sidebar navItem={navItem} />
        </>
    );
};

export default RecruiterSildbar;


