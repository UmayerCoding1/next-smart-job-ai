"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";
import PrimaryButton from "../button/PrimaryButton";

const SearchImg = "/assets/search-frame-1.png";
const DotImg = "/assets/dot-frame.png";

const Hero = () => {
  const [isJobsMetched, setIsJobsMatched] = useState(false);
  const [isAccuracy, setIsAccuracy] = useState(false);
  const [isHappyUsers, setIsHappyUsers] = useState(false);

  useEffect(() => {
    let step = 0;

    const interval = setInterval(() => {
      switch (step) {
        case 0:
          setIsJobsMatched(true);
          setIsAccuracy(false);
          setIsHappyUsers(false);
          break;
        case 1:
          setIsJobsMatched(false);
          setIsAccuracy(true);
          setIsHappyUsers(false);
          break;
        case 2:
          setIsJobsMatched(false);
          setIsAccuracy(false);
          setIsHappyUsers(true);
          break;
        default:
          break;
      }

      step = (step + 1) % 3; // cycle through 0 → 1 → 2 → 0 ...
    }, 3000); // You can customize the duration here

    return () => clearInterval(interval);
  }, []);

  //   console.log(isJobsMetched, isAccuracy, isHappyUsers);

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] md:h-[50vh] lg:h-[85vh] bg-gradient-to-br from-[#e0e7ff] via-[#f3f4f6] to-[#c2dafb] relative">
      <p className="bg-[#C2DAFA] py-1 px-10 rounded-2xl text-sm font-semibold">
        🚀 AI-Powered Job Matching
      </p>
      <div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl  font-bold   lg:font-semibold mt-5 text-center">
          <span>Find Jobs that Match You</span> <br />
          <span className="text-[#2563EB]">Instantly</span>
        </h2>

        <p className="text-sm md:text-lg lg:text-lg mt-5 lg:text-center p-1 lg:p-0">
          Our AI analyzes your resume, extracts skills, and matches you with
          perfect job <br />
          opportunities. Get personalized job recommendations with instant
          compatibility scores.
        </p>
      </div>

      <div className="flex items-center gap-2 mt-5">

        <PrimaryButton Icon={Upload}>Upload Resume</PrimaryButton>
        

        <Button
          variant={"outline"}
          className="py-6 border border-[#2563EB] bg-transparent hover:bg-[#c2dafa9a]  cursor-pointer"
        >
          <span className="text-blue-500 font-semibold"> Find Jobs</span>
        </Button>
      </div>

      <div>
        <div className=" absolute top-20 left-40  bg-white/50 animate-bounce shadow-md rounded-md  hidden md:flex  lg:flex items-center justify-center gap-2 p-3">
          <span className="text-2xl text-blue-500 font-bold">50K+</span>
          <span>Jobs Matched</span>
        </div>
        <div className=" absolute bottom-20 left-24  bg-white/50 animate-bounce shadow-md rounded-md  hidden md:flex  lg:flex items-center justify-center gap-2 p-3">
          <span className="text-2xl text-blue-500 font-bold">90%</span>
          <span>Match Accuracy</span>
        </div>
        <div className=" absolute bottom-20 right-24  bg-white/50 animate-bounce shadow-md rounded-md  hidden md:flex  lg:flex items-center justify-center gap-2 p-3">
          <span className="text-2xl text-blue-500 font-bold">100K+</span>
          <span>Happy Users</span>
        </div>
      </div>

      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 md:hidden lg:hidden">
        <div className="relative h-[50px] w-[230px] ">
          <div
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              isJobsMetched
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10 pointer-events-none"
            } bg-white/20 shadow-xl rounded-2xl flex gap-2 items-center justify-center   px-2 border border-gray-200`}
          >
            <span className="text-2xl text-blue-500 font-extrabold">50K+</span>
            <span className="text-base font-medium text-gray-700">
              Jobs Matched
            </span>
          </div>
          <div
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              isAccuracy
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10 pointer-events-none"
            } bg-white/20 shadow-xl rounded-2xl flex gap-2 items-center justify-center  px-2 border border-gray-200`}
          >
            <span className="text-2xl text-blue-500 font-extrabold">90%</span>
            <span className="text-base font-medium text-gray-700">
              Match Accuracy
            </span>
          </div>
          <div
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              isHappyUsers
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10 pointer-events-none"
            } bg-white/20 shadow-xl rounded-2xl flex gap-2 items-center justify-center  px-2 border border-gray-200`}
          >
            <span className="text-2xl text-blue-500 font-extrabold">100K+</span>
            <span className="text-base font-medium text-gray-700">
              Happy Users
            </span>
          </div>
        </div>
      </div>

      {/* Frame add more modren design */}
      <div>
        <Image
          src={SearchImg}
          alt="Search"
          width={50}
          height={50}
          className="absolute top-2 left-5  object-cover lg:block hidden"
        />

        <div>
          <Image
            src={DotImg}
            alt="Dotimg"
            width={100}
            height={100}
            className="absolute right-10 top-32 z-0  object-cover lg:block hidden"
          />
          <Image
            src={DotImg}
            alt="Dotimg"
            width={100}
            height={100}
            className="absolute right-60 top-5  object-cover lg:block hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
