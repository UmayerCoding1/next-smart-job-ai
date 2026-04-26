"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Brain, FileText, Search, Zap } from "lucide-react";
import FadeRight from "../animations/FadeRight";
import FadeLeft from "../animations/FadeLeft";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from 'motion/react';

const Capabilities = () => {
  const items = Array.from({ length: 100 }, (_, i) => i);
  return (
    <div className="mt-20 overflow-hidden min-h-screen">
      <section className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">Powerful Solutions for Every User</h1>
        <p className="text-sm text-gray-600 max-w-2xl text-center">
          From job searching to hiring and platform management — everything you need, <br /> powered by smart technology.
        </p>
      </section>

      <section className="w-full  mt-10">
        <div className="w-full flex gap-4 ">
          {/* left */}
          <div className="flex-1 ">
            <div className="flex gap-4 flex-col">
              {/* top */}
              <div className="flex gap-4">
                <Box>
                  <div className="flex-1  relative p-2 flex items-center justify-center">
                    {/* glow-1 */}
                    <div className="w-full h-80  absolute top-0 right-0 z-10 bg-linear-to-bl bg-green-500 mask-b-from-1.5 mask-l-from-1"></div>
                    <div className="w-[99%] h-[230px] absolute top-0 right-0 rounded-bl-[230px] rounded-tl-[10px] bg-linear-to-br from-yellow-400 via-yellow-100 to-transparent  blur-3xl" />

                    <div className="w-full h-full z-20 absolute inset-0
bg-[radial-gradient(#d1d5db_1px,transparent_1px)]
bg-[size:10px_10px] mask-b-from-1.5"/>

                    {/* content */}
                    <div className="z-20 w-[80%] h-[200px]  bg-white rounded-2xl overflow-hidden shadow-2xl">
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
                  <div className="flex-1  h-[400px]">top-2</div>
                </Box>
              </div>
              {/* bottom */}

              <div className="w-full bg-orange-50 h-[200px]">bottom</div>
            </div>
          </div>
          {/* right */}
          <div className="w-[350px] bg-green-50">right</div>
        </div >
      </section >

    </div >
  );
};

export default Capabilities;



const Box = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("flex-1 h-[400px] flex flex-col rounded-2xl overflow-hidden bg-linear-to-t from-transparent  to-neutral-200", className)}>
      {children}
    </div>
  )
}
