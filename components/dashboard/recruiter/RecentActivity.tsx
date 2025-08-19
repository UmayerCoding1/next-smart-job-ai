'use client';
import { Award, Briefcase, Calendar, Eye, FileText } from "lucide-react";
import React from "react";

const RecentActivity = () => {
  const activityData = [
    {
      category: "New Application Received",
      jobTitle: "Senior Software Engineer",
      time: "2 hours ago",
      sectionIcon: FileText,
    },
    {
      category: "Interview scheduled",
      jobTitle: "Product Manager",
      time: "4 hours ago",
      sectionIcon: Calendar,
    },
    {
      category: "Job posted",
      jobTitle: "UX Designer",
      time: "1 hours ago",
      sectionIcon: Briefcase,
    },
    {
      category: "Candidate hired",
      jobTitle: "Marketing Specialist",
      time: "2 day ago",
      sectionIcon: Award,
    },
    {
      category: "Application reviewed",
      jobTitle: "Data Analyst",
      time: "3 day ago",
      sectionIcon: Eye,
    },
  ];
  return (
    <div>
      {activityData.map((activity, index) => {
        const Icon = activity.sectionIcon; // Capitalize the component
        return (
          <div
            key={index}
            className="flex p-2 space-x-2 shadow my-5 border border-gray-200 rounded-lg"
          >
            <Icon size={13} className="mt-1" />
            <div>
              <h2 className="font-semibold">{activity.category}</h2>
              <p className="text-sm text-gray-500 font-medium">
                {activity.jobTitle}
              </p>
              <p>{activity.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivity;
