"use client";
import { RootState } from "@/app/redux/store";
import AppTable from "@/components/shared/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Award, Bot, BotMessageSquare, Briefcase, Calendar, Clock, FileText, SquarePlus, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecentActivity from "./RecentActivity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export interface JobRow {
  job: string;
  applied: number;
  totalApplications: number;
  shortlisted: number;
  test: number;
  interview: number;
  hired: number;
  bgColor: string;
}
const Overview = () => {
  const user = useSelector((state: RootState) => state.authR.user);
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

  const jobData: JobRow[] = [
    {
      job: "Frontend Developer",
      totalApplications: 20,
      applied: 12,
      shortlisted: 5,
      test: 3,
      interview: 2,
      hired: 1,
      bgColor: "bg-blue-200",
    },
    {
      job: "Backend Developer",
      totalApplications: 20,
      applied: 20,
      shortlisted: 10,
      test: 7,
      interview: 4,
      hired: 2,
       bgColor: "bg-orange-200",
    },
    
    {
      job: "UI/UX Designer",
      totalApplications: 20,
      applied: 15,
      shortlisted: 6,
      test: 0,
      interview: 0,
      hired: 0,
       bgColor: "bg-pink-200",
    },
    {
      job: "UI/UX Designer",
      totalApplications: 20,
      applied: 15,
      shortlisted: 6,
      test: 4,
      interview: 3,
      hired: 0,
       bgColor: "bg-purple-200",
    },
  ];
  return (
    <div>
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
            Your AI has analyzed 1,247 jobs and found 8 perfect matches. Ready
            to accelerate your career?
          </p>

          <Button variant={"ghost"} className={" border active:scale-105 mt-2"}>
            <BotMessageSquare />
            <span>Chat with AI</span>
          </Button>
        </div>

        <div className="w-40 h-40 bg-white/10 absolute -top-20 -right-[65px] rounded-full"></div>
      </div>

      <section className="flex gap-4 my-5">
        <div className=" gap-4 w-full lg:w-1/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="w-full">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 mb-2 p-4 border shadow rounded bg-white h-28 w-full"
              >
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-lg font-semibold">Active Jobs</h2>
                  <Briefcase size={15} className="text-black/70" />
                </div>

                <div>
                  <p className="text-2xl font-semibold">12</p>
                  <p className="text-[#00A63E] text-xs">+2 this week</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 mb-2 p-4 border shadow rounded bg-white h-28 w-full"
              >
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-lg font-semibold">Active Jobs</h2>
                  <Briefcase size={15} className="text-black/70" />
                </div>

                <div>
                  <p className="text-2xl font-semibold">12</p>
                  <p className="text-[#00A63E] text-xs">+2 this week</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white p-4 shadow rounded">
          <AppTable
            headers={[
              "Jobs",
              "New Applied",
              "Shortlisted",
              "Test",
              "Interview",
              "Hired",
            ]}
          >
            {jobData.map((row, index) => (
              <TableRow key={index} className="">
                <TableCell>
                  <h2 className="text-lg font-semibold">{row.job}</h2>
                  <p className="text-sm font-medium text-black/70">
                    {" "}
                    Total Application: {row.totalApplications}
                  </p>
                </TableCell>
                <TableCell className={`${row.applied > 0 ? row.bgColor : 'bg-gray-300'} font-medium text-black/70`}>{row.applied >  0 && <span>{ row.applied} Candidates</span>} </TableCell>
                <TableCell className={`${row.shortlisted > 0 ? row.bgColor : 'bg-gray-300'} font-medium text-black/70`}>{row.shortlisted > 0 && <span>{ row.applied} Candidates</span>}</TableCell>
                <TableCell className={`${row.test > 0? row.bgColor : 'bg-gray-300'} font-medium text-black/70`}>{row.test > 0 && <span>{ row.applied} Candidates</span>} </TableCell>
                <TableCell className={`${row.interview > 0 ? row.bgColor : 'bg-gray-300'} font-medium text-black/70`}>{row.interview > 0 && <span>{ row.applied} Candidates</span>} </TableCell>
                <TableCell className={`${row.hired > 0 ? row.bgColor : 'bg-gray-300'} font-medium text-black/70`}>{row.hired > 0 && <span>{ row.applied} Candidates</span>} </TableCell>
              </TableRow>
            ))}
          </AppTable>
        </div>
      </section>


      <section className="flex gap-3 ">
          <div className="bg-white p-4 shadow rounded h-auto w-full lg:w-1/2">
              <div>
                <div className="flex items-center gap-2">
                  <Clock size={13}/>
                  <h2 className="text-lg font-semibold">Recent Activity</h2>
                </div>
                <p>Latest updates from your recruitment pipeline</p>
              </div>

              <RecentActivity/>
          </div>

          <Card className="w-full lg:w-1/2 h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common tasks to get you started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <SquarePlus className="h-4 w-4 mr-2" />
                    Post a New Job
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Review Applications
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Browse Candidates
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Interviews
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Award className="h-4 w-4 mr-2" />
                    Send Offers
                  </Button>
                </div>
              </CardContent>
            </Card>
      </section>

      <div className="h-20"></div>
    </div>
  );
};

export default Overview;
