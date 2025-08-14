"use client";
import BarChartFilter from "@/components/shared/dashboard/chart/BarChart";
import Slider from "@/components/shared/dashboard/Slider";
import { ISliderData,  } from "@/lib/types";
import { Bookmark, BriefcaseBusiness, Calendar as CalendarIcon, Eye, Sparkles } from "lucide-react";
import Calender from "@/components/shared/Calendar";
import React from "react";


const Overview = () => {
  const sliderData : ISliderData = {
   totalCards: 6,
    sliderItems: [
    {
    id: 1,
    title: "Total Applications",
    value: 58,
    subtitle: "+5 this week",
    icon: BriefcaseBusiness, 
    iconColor: "#3B82F6", 
    trend: "up", // 'up' | 'down' | 'neutral'
  },
  {
    id: 2,
    title: "Profile Views",
    value: 1245,
    subtitle: "+15% compared to last week",
    icon: Eye,
    iconColor: "#22C55E", // green for growth
    trend: "up",
  },
  {
    id: 3,
    title: "Saved Jobs",
    value: 23,
    subtitle: "3 expiring soon",
    icon: Bookmark,
    iconColor: "#F59E0B", // yellow
    trend: "neutral",
  },
  {
    id: 4,
    title: "Interview Invites",
    value: 4,
    subtitle: "Next: Aug 20, 2025",
    icon: CalendarIcon,
    iconColor: "#A855F7", // purple
    trend: "up",
  },
  {
    id: 5,
    title: "AI Job Suggestions",
    value: 12,
    subtitle: "3 new today",
    icon: Sparkles,
    iconColor: "#EC4899", // pink
    trend: "up",
  },
  {
    id: 6,
    title: "AI Job Suggestions",
    value: 12,
    subtitle: "3 new today",
    icon: BriefcaseBusiness,
    iconColor: "#EC4899", // pink
    trend: "up",
  }
   ] 
};



  return (
    <div className="lg:flex gap-2  min-h-screen ">
     
      <section className="flex-1 overflow-hidden mb-2 lg:mb-0">
        <Slider sliderData={sliderData}/>
        {/* <ApplicationLineChart /> */}
        <div className="lg:flex gap-2 mt-5 w-full bg-red-50">
            <div className="flex-1">
              <BarChartFilter/>
            </div>
           
           <div className="w-[38%]">

            <Calender/>
           </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="lg:w-[296px] bg-emerald-200 p-4 flex items-center justify-center">
        Sidebar
      </section>
    </div>
  );
};

export default Overview;
