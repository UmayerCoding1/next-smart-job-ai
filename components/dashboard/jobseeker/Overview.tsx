"use client";
import BarChartFilter from "@/components/shared/dashboard/chart/BarChart";
import Slider from "@/components/shared/dashboard/Slider";
import { ISliderData } from "@/lib/types";
import {
  Bookmark,
  Bot,
  BotMessageSquare,
  BriefcaseBusiness,
  Calendar as CalendarIcon,
  Eye,
  Sparkles,
} from "lucide-react";
import Calender from "@/components/shared/dashboard/Calendar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import SuccessRatePieChart from "@/components/shared/dashboard/chart/PieChart";
import RecentActivities from "./RecentActivities";
import { Button } from "@/components/ui/button";

const Overview = () => {
  const user = useSelector((state: RootState) => state.authR.user);
  const isOpen = useSelector((state: RootState) => state.dashboardR.isOpen);
  const [greeting, setGreeting] = useState<string>("");
  const now = new Date();
  const hours = now.getHours();

  useEffect(() => {
    const timeGreeting = () => {
      if (hours >= 4 && hours < 12) {
        setGreeting("Good Morning");
      } else if (hours >= 12 && hours < 16) {
        setGreeting("Good Afternoon");
      } else if (hours >= 16 && hours < 20) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
    };

    timeGreeting();
  }, [hours]);

  const sliderData: ISliderData = {
    totalCards: 6,
    sliderItems: [
      {
        id: 1,
        title: "Total Applications",
        value: 58,
        subtitle: "+5 this week",
        icon: BriefcaseBusiness,
        color: "#3B82F6",
        trend: "up", // 'up' | 'down' | 'neutral'
      },
      {
        id: 2,
        title: "Profile Views",
        value: 1245,
        subtitle: "+15% compared to last week",
        icon: Eye,
        color: "#22C55E", // green for growth
        trend: "up",
      },
      {
        id: 3,
        title: "Saved Jobs",
        value: 23,
        subtitle: "3 expiring soon",
        icon: Bookmark,
        color: "#F59E0B", // yellow
        trend: "neutral",
      },
      {
        id: 4,
        title: "Interview Invites",
        value: 4,
        subtitle: "Next: Aug 20, 2025",
        icon: CalendarIcon,
        color: "#A855F7", // purple
        trend: "up",
      },
      {
        id: 5,
        title: "AI Job Suggestions",
        value: 12,
        subtitle: "3 new today",
        icon: Sparkles,
        color: "#EC4899", // pink
        trend: "up",
      },
      {
        id: 6,
        title: "AI Job Suggestions",
        value: 12,
        subtitle: "3 new today",
        icon: BriefcaseBusiness,
        color: "#EC4899", // pink
        trend: "up",
      },
    ],
  };

  return (
    <div className="lg:flex gap-2  max-h-screen my-2">
      <section className="flex-1 max-h-screen overflow-auto scrollbar-hide mb-2 lg:mb-0">
        <div className="w-full h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg p-4 text-white relative">
          <h2 className="text-2xl font-medium">
            {greeting}, {user?.fullname}
          </h2>

          <div className="mt-5">
            <div className="flex items-center gap-2">
              <Bot />
              <h2 className="text-2xl font-semibold">AI Career Assistant</h2>
            </div>
              <p className="text-sm text-white/80">
                Your AI has analyzed 1,247 jobs and found 8 perfect matches.
                Ready to accelerate your career?
              </p>

              <Button variant={"ghost"} className={" border active:scale-105 mt-2"}>
                <BotMessageSquare/>
                <span>Chat with AI</span>
              </Button>
          </div>

          <div className="w-40 h-40 bg-white/10 absolute -top-20 -right-[65px] rounded-full"></div>
        </div>
        <Slider sliderData={sliderData} />

        <div className="flex gap-2 my-5">
          <RecentActivities />
          <RecentActivities />
        </div>

        {/* <ApplicationLineChart /> */}
        <div className="lg:flex gap-5  mt-5 w-full ">
          <div className={`${isOpen ? "w-[55%]" : "flex-1"}`}>
            <BarChartFilter />
          </div>

          <div
            className={`${
              isOpen ? "w-[50%]" : "w-[38%]"
            } bg-white p-3 rounded-lg`}
          >
            <SuccessRatePieChart />
          </div>
        </div>

        <div className="h-screen"></div>
      </section>

      {/* Right Section */}
      <section className="lg:w-[296px]  px-4 bg-white shadow max-h-screen ">
        <Calender />
      </section>
    </div>
  );
};

export default Overview;
