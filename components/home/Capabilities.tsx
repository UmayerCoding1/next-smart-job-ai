"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Brain, BriefcaseBusiness, FileText, Search, Send, User, Users, Zap } from "lucide-react";
import FadeRight from "../animations/FadeRight";
import FadeLeft from "../animations/FadeLeft";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from 'motion/react';

interface Message {
  index: number;
  role: 'jobseeker' | 'reqruiter';
}

const baseMessages: Message[] = [
  { index: 1, role: "jobseeker" },
  { index: 2, role: "reqruiter" },
  { index: 3, role: "jobseeker" },
];

const jobsData = [
  {
    id: 1,
    title: 'Front-end Engineer',
    applications: 12,
    status: 'active',
    context: <div className="w-3 h-3 bg-green-600 rounded-full" />,
    color: 'green'
  },
  {
    id: 2,
    title: 'Senior Python Developer',
    applications: 28,
    status: 'pending',
    context: <div className="w-3 h-3 bg-yellow-600 rounded-full" />,
    color: 'yellow'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    applications: 8,
    status: 'closed',
    context: <div className="w-3 h-3 bg-red-600 rounded-full" />,
    color: 'red'
  }
]

const appicationsData = [
  {
    id: 1,
    name: 'David Johnson',
    position: 'Senior Python Developer',
    status: 'Active',
    context: <div className="w-3 h-3 bg-green-600 rounded-full" />,
    color: 'green'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    position: 'Senior Python Developer',
    status: 'Shortlisted',
    context: <div className="w-3 h-3 bg-yellow-600 rounded-full" />,
    color: 'yellow'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Senior Python Developer',
    status: 'Not Interested',
    context: <div className="w-3 h-3 bg-red-600 rounded-full" />,
    color: 'red'
  }
]
const Capabilities = () => {
  const items = Array.from({ length: 100 }, (_, i) => i);
  const [messages, setMessages] = useState<Message[]>(baseMessages);
  const [chat, setChat] = useState('');
  const [manageParts, setManageParts] = useState<'jobs' | 'application'>('jobs');

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages([]);
      setTimeout(() => {
        setMessages(baseMessages);
      }, 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mt-20 overflow-hidden min-h-screen">
      <section className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">Powerful Solutions for Every User</h1>
        <p className="text-sm text-gray-600 max-w-2xl text-center">
          From job searching to hiring and platform management — everything you need, <br /> powered by smart technology.
        </p>
      </section>

      <section className="w-full  mt-10">
        <div className="w-full flex flex-col lg:flex-row gap-4 ">
          {/* left */}
          <div className="flex-1 ">
            <div className="flex gap-10 md:gap-4 flex-col">
              {/* top */}
              <div className="flex flex-col lg:flex-row gap-10 md:gap-4">
                <Box>
                  <div className="flex-1  relative p-2 flex items-center justify-center">
                    {/* glow-1 */}
                    <div className="w-full h-80  absolute top-0 right-0 z-10 bg-linear-to-bl bg-green-500 mask-b-from-1.5 mask-l-from-1"></div>
                    <div className="w-[99%] h-[230px] absolute top-0 right-0 rounded-bl-[230px] rounded-tl-[10px] bg-linear-to-br from-yellow-400 via-yellow-100 to-transparent  blur-3xl" />

                    <div className="w-full h-full z-20 absolute inset-0
bg-[radial-gradient(#d1d5db_1px,transparent_1px)]
bg-[size:10px_10px] mask-b-from-1.5"/>

                    {/* content */}
                    <div className="z-20 w-[80%] h-[220px] md:h-[200px] bg-white rounded-2xl overflow-hidden shadow-2xl">
                      <div className="bg-black w-full h-12 flex items-center p-2 font-semibold text-white">
                        <p className="text-[11px]">AI job matching</p>
                      </div>

                      <div className="h-full  ">
                        <div className="flex items-center justify-start w-full h-9 border-b pl-2"><p className="font-semibold text-neutral-500 text-sm">Jobs</p> </div>

                        <div className="max-h-[135px] overflow-hidden relative mt-1">
                          <motion.div
                            animate={{ y: ["0%", "-50%"] }}
                            transition={{
                              duration: 10,
                              ease: "linear",
                              repeat: Infinity,
                            }}
                            className="max-h-full p-2">
                            {items.map((_, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 my-2">
                                <Image
                                  src={'/assets/avatar2.webp'}
                                  width={100}
                                  height={100}
                                  alt="avatar"
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <div className="flex items-center gap-3">
                                  <span className="block h-2 w-20 bg-neutral-200 rounded-md"></span>
                                  <span className="block h-2 w-20 bg-neutral-200 rounded-md"></span>
                                  <span className="block h-2 w-20 bg-neutral-200 rounded-md"></span>

                                </div>
                              </div>
                            ))}
                          </motion.div>

                          <div className="w-full h-full bg-black/20 absolute inset-0 flex items-center justify-end">
                            <motion.div
                              initial={{ x: 0, y: 0 }}
                              animate={{
                                x: [-200, 0, -200, -200],
                                y: [50, 0, -50, 50],
                              }}
                              transition={{
                                duration: 4,
                                ease: "linear",
                                repeat: Infinity,
                              }}
                            >
                              <Search size={30} className="text-green-500" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="h-1/3 px-10">
                    <p className="bg-neutral-100 inline-block px-5 py-1 rounded-full text-sm font-medium shadow-md">Jobseeker</p>
                    <p className="mt-4 text-lg  text-neutral-600 ">
                      <span className="font-semibold text-black">AI job match : </span>
                      Intelligent job recommendations based on your profile and preferences — updated automatically.
                    </p>
                  </div>
                </Box>
                <Box>
                  <div className="flex-1  relative p-2 flex items-center justify-center">

                    {/* content */}
                    <div className="z-20 w-[80%] h-[220px] md:h-[200px]  bg-white rounded-2xl overflow-hidden shadow-2xl">
                      <div className="bg-black w-full h-12 flex items-center p-2 font-semibold text-white">
                        <p className="text-[11px]">Inbox & Message</p>
                      </div>

                      <div className="px-4 my-3 flex flex-col justify-between h-[148px]">
                        <div>
                          {messages.map((item) => (
                            <div key={item?.index} className="  mb-2">
                              <div className={cn(
                                "flex items-center gap-2",
                                item.role === 'reqruiter' && "flex-row-reverse"
                              )}>
                                <motion.div className="w-8 h-8 bg-neutral-300 rounded-full"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: item.index * 0.6,
                                  }} />
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: 140 }}
                                  transition={{
                                    duration: 0.6,
                                    delay: item.index * 0.6,
                                  }}
                                  className={`w-[140px] h-5 rounded-lg bg-linear-to-r ${item.role === 'reqruiter' ? 'from-neutral-200 to-neutral-100' : 'from-neutral-100 to-neutral-200'}`}></motion.div>
                              </div>

                            </div>

                          ))}
                        </div>

                        <div className="w-full h-10 border border-neutral-300 rounded-lg overflow-hidden bg-neutral-100  pl-2 relative">
                          <input type="text" value={chat} onChange={(e) => setChat(e.target.value)} className='w-full h-full outline-none text-sm text-neutral-600 placeholder:text-sm' placeholder='Type your message...' />
                          <div onClick={() => { setChat("") }} className="absolute right-2 top-2 w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-neutral-300 transition-all duration-300">
                            <Send size={12} className="text-black/70 mt-0.5" />
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                  <div className="h-1/3 px-10">
                    <p className="bg-neutral-100 inline-block px-5 py-1 rounded-full text-sm font-medium shadow-md">Jobseeker + Recruiter</p>
                    <p className="mt-4 text-lg  text-neutral-600 ">
                      <span className="font-semibold text-black">Inbox & messaging : </span>
                      Direct communication between jobseekers and recruiters — stay connected through every stage.
                    </p>
                  </div>
                </Box>


              </div>
              {/* bottom */}

              <div className="w-full bg-neutral-100 h-auto  md:h-[250px] flex flex-col md:flex-row gap-4 md:gap-0 overflow-hidden rounded-2xl relative">
                <div className='flex-1 h-full flex flex-col justify-start px-6 mt-12'>
                  <p className="bg-neutral-100 w-fit px-5 py-1 rounded-full text-sm font-medium shadow-md">Recruiter</p>
                  <p className="mt-4 text-3xl md:text-4xl  font-semibold">{manageParts === "jobs" ? "Job management — post & track" : "Application management"}</p>
                  <p className="mt-2 text-lg  text-neutral-600 ">
                    {manageParts === "jobs" ? "Post new listings, manage active jobs, and monitor applicant counts — all in one place." : "Review and track all candidate applications received for each job posting — filter by status and move candidates through your pipeline."}
                  </p>
                </div>
                <div className="flex-1 h-full flex items-center justify-center relative">
                  <div className='w-full h-full bg-radial from-green-200 from-40% to-green-100 to-70% blur-3xl absolute top-0 right-0  z-10' />
                  <div className="z-20 w-full h-full">
                    <div className="w-full h-14 bg-black rounded-lg flex items-center p-[3px] gap-2 ">
                      <div className={cn(" h-full  px-4 py-2 flex items-center justify-center  font-semibold rounded-2xl text-white cursor-pointer", manageParts === 'jobs' && "bg-white text-black")} onClick={() => setManageParts('jobs')}>My Jobs</div>
                      <div className={cn("h-full px-4 py-2 flex items-center justify-center  font-semibold rounded-2xl text-white cursor-pointer", manageParts === 'application' && "bg-white text-black")} onClick={() => setManageParts('application')}>Application management</div>
                    </div>

                    <div className="w-full p-4 ">
                      {manageParts === 'jobs' ? <div key={manageParts} className="w-full h-full  rounded-lg flex flex-col gap-4">
                        {jobsData.map((job) => {
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.6,
                                delay: job.id * 0.2,
                              }}
                              key={job.id} className="bg-white/70 px-2 py-1 backdrop:blur-2xl flex items-center justify-center w-full rounded-lg">
                              <div className="flex items-center gap-2  pb-2 mb-2 w-full h-full">
                                {job.context}
                                <div className="flex items-center justify-between flex-1">
                                  <div>
                                    <h2 className="text-lg font-semibold">{job.title}</h2>
                                    <p className="text-sm text-gray-600">{job.applications} Applications</p>
                                  </div>
                                  <p className={`text-[10px] font-medium bg-${job.color}-500 text-white px-4 py-1 rounded-full`}>{job.status}</p>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div> : <div key={manageParts} className="w-full h-full  rounded-lg flex flex-col gap-4">
                        {appicationsData.map((job) => {
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.6,
                                delay: job.id * 0.2,
                              }}
                              key={job.id} className="bg-white/70 px-2 py-1 backdrop:blur-2xl flex items-center justify-center w-full rounded-lg">
                              <div className="flex items-center gap-2  pb-2 mb-2 w-full h-full">
                                {job.context}
                                <div className="flex items-center justify-between flex-1">
                                  <div>
                                    <h2 className="text-lg font-semibold">{job.name}</h2>
                                    <p className="text-sm text-gray-600">{job.position} Applications</p>
                                  </div>
                                  <p className={`text-[10px] font-medium bg-${job.color}-500 text-white px-4 py-1 rounded-full`}>{job.status}</p>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>}
                    </div>

                  </div>
                </div>


              </div>
            </div>
          </div>
          {/* right */}
          <Box className="w-full md:w-[350px] h-[750px] md:h-auto shadow-md mb-1  relative overflow-hidden">
            <div className="w-80 h-64 bg-green-300 blur-3xl opacity-50 absolute top-0 right-0 z-0 rounded-2xl" />

            <div className="z-10 px-4 py-2 flex flex-col w-full h-full gap-10">
              <div>
                <p className="bg-neutral-100 w-fit px-5 py-1 rounded-full text-sm font-medium shadow-md">Admin</p>
                <h2 className="text-3xl font-bold mt-4">Platform overview</h2>
                <p className="text-neutral-600 mt-4 font-medium">
                  Monitor all users, jobs, and system health from a single admin dashboard.
                </p>
              </div>

              <div className="flex-1 flex justify-end relative items-center flex-col mb-10">
                <div
                  className="w-40 h-40 bg-yellow-100 bg-gradient-to-t from-green-100/50 via-green-500 to-green-100/70 rounded-2xl relative flex items-center justify-center"
                  style={{
                    boxShadow: '0 12px 0 0 #166534, 0 13px 0 0 rgba(22,101,52,0.3)',
                    transform: 'perspective(1000px) rotateX(48deg) rotateY(2deg)',
                  }}
                >
                  <User color="#fff" size={60} /> <span className="absolute bottom-4 left-4 text-black font-semibold">Admin Dashboard</span>




                </div>


                <div className="w-60 h-28 bg-white shadow-lg absolute top-20 z-30 rounded-lg flex flex-col items-center justify-center p-4 gap-2">
                  <p className="text-lg uppercase tracking-tight font-playfair font-medium relative flex items-center gap-2"><span className="block w-3 h-3 bg-green-500 rounded-full z-20"></span>
                    System Health</p>
                  <p className="text-2xl font-bold text-black">100% Uptime</p>
                  <p className="text-xs font-medium text-green-600">All services operational</p>
                </div>
                <svg width={50} height={250} className=" absolute top-[130px] z-20">
                  <motion.line x1={25} y1={0} x2={25} y2={250} stroke="gray" strokeWidth={2} strokeDasharray="5 8"
                    animate={{ strokeDashoffset: [0, -13] }}
                    transition={{
                      duration: 0.6,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />
                </svg>


                <div className="w-40 md:w-52 h-28 bg-white shadow-lg absolute left-0 top-[40%]  z-10 rounded-lg flex flex-col  justify-center p-2  gap-1">
                  <Users className="text-green-500" />
                  <p className="text-sm font-semibold">Active Users</p>
                  <p className="text-2xl font-bold text-black">25.00K</p>
                </div>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-[35%] top-[200px] -rotate-12 "
                  width="32"
                  height="250"
                  viewBox="0 0 32 118"
                  fill="none"
                >
                  <motion.path
                    d="M31.5 117L8.61905 98.8672L0.5 76.8487V46.1956V20.7232V0"
                    stroke="gray"
                    strokeWidth={2}
                    strokeDasharray="5 8"

                    animate={{ strokeDashoffset: [0, -13] }}
                    transition={{
                      duration: 0.8,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />
                </motion.svg>



                <div className="w-40 md:w-52 h-28 bg-white shadow-lg absolute right-0 top-[40%]  z-10 rounded-lg flex flex-col  justify-center p-2  gap-1">
                  <BriefcaseBusiness className="text-orange-400" />
                  <p className="text-sm font-semibold">Active Jobs</p>
                  <p className="text-2xl font-bold text-black">10.00K</p>
                </div>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-[36%] top-[200px] rotate-12"
                  width="32"
                  height="250"
                  viewBox="0 0 32 118"
                  fill="none"
                >
                  <motion.path
                    d="M0.310547 117L23.1915 98.8672L31.3105 76.8487V46.1956V20.7232V0"
                    stroke="gray"
                    strokeWidth={2}
                    strokeDasharray="5 8"

                    animate={{ strokeDashoffset: [0, -13] }}
                    transition={{
                      duration: 0.8,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />
                </motion.svg>

              </div>
            </div>
          </Box>
        </div >
      </section >

    </div >
  );
};

export default Capabilities;



const Box = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn(" h-[400px] flex flex-col rounded-2xl overflow-hidden bg-linear-to-t from-transparent  to-neutral-200", className)}>
      {children}
    </div>
  )
}
