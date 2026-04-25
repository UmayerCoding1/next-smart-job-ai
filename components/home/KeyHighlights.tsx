import { Star, Trophy, Users, Rocket, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import PrimaryButton from "../button/PrimaryButton";
import { Button } from "../ui/button";
import DropAnimation from "../animations/DropAnimation";
import FadeLeft from "../animations/FadeLeft";
import FadeRight from "../animations/FadeRight";

const ManHoldinFileImage = "/assets/man-holding-files.jpg";
const GrilStudent = "/assets/gril-student.jpg";
const HappyMan = "/assets/happy-man.jpg";
const KeyHighlights = () => {
  return (
    <div className=" flex justify-between flex-col md:flex-row lg:flex-row gap-4 lg:p-20 overflow-hidden">
      <FadeLeft className="w-full md:w-[350px] lg:w-[350px]  transition-all duration-200  overflow-hidden flex flex-col gap-4">
        
          <div className="shadow-md border border-gray-200 rounded-lg p-2 overflow-hidden">
            <Image
              src={ManHoldinFileImage}
              alt=""
              width={800}
              height={800}
              className=" w-full hover:scale-105 transition-all duration-200"
            />
          </div>

          <div className="p-6 shadow-xl w-full h-64 md:w-[350px] lg:w-[350px] border border-white/50 rounded-2xl bg-white/80 backdrop-blur-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Trophy className="w-20 h-20 text-green-600" />
            </div>
            <h2 className="text-6xl font-bold text-[#5c940d]">82%</h2>

            <div>
              <h2 className="text-2xl font-bold text-neutral-800">Successful Contracts</h2>
              <p className="text-sm font-medium text-neutral-600 mt-2">
                Our platform maintains a high success rate in matching digital talent with their ideal remote teams.
              </p>
            </div>
          </div>
    
      </FadeLeft>

      <DropAnimation
        delay={0.7}
        className="w-full md:w-1/2 lg:w-1/2 relative group overflow-hidden rounded-3xl shadow-2xl"
      >
        <Image
          src={GrilStudent}
          alt="Top Rated"
          width={800}
          height={800}
          className="w-full h-[600px] object-cover group-hover:scale-105 transition-all duration-700"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent text-white flex flex-col justify-end p-10">
          <div className="flex space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 bg-[#93FE9C] rounded-full flex items-center justify-center"
              >
                <Star className="text-black w-3.5 h-3.5 fill-black" />
              </div>
            ))}
            <span className="ml-2 text-sm font-bold tracking-widest uppercase">Premium Quality</span>
          </div>

          <h1 className="text-4xl font-bold mt-2">Top-rated Companies</h1>
          <p className="text-base font-medium my-4 opacity-90 max-w-md">
            Join the elite circle of digital teams. We partner with industry leaders to provide you with the best career opportunities.
          </p>

          <div className="flex items-center gap-4">
            <PrimaryButton className="bg-[#93FE9C] text-black border-none hover:bg-[#82C526] flex items-center gap-2">
              GET FREE CONSULTATION <ArrowUpRight className="w-4 h-4" />
            </PrimaryButton>
          </div>
        </div>
      </DropAnimation>

      <FadeRight className="w-full md:w-[350px] lg:w-[350px]  transition-all duration-200  overflow-hidden flex flex-col justify-between gap-4 rounded-lg">
        
          <div className="p-6 shadow-xl w-full lg:h-80 md:w-[350px] lg:w-[350px] border border-white/50 rounded-2xl bg-[#82C526] text-black flex gap-3 flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Rocket className="w-20 h-20 text-white" />
            </div>
            <div>
              <h2 className="text-6xl font-bold">1-30</h2>
              <p className="font-bold uppercase tracking-wider text-sm opacity-80">Days time to hire</p>
            </div>

            <div className="z-10">
              <h2 className="text-2xl font-bold leading-tight">
                Streamline Your Hiring with our AI-Powered ATS
              </h2>

              <Button className="mt-6 bg-white text-[#5c940d] font-bold rounded-full hover:bg-neutral-100 px-6">
                POST VACANCY
              </Button>
            </div>
          </div>

          <div className="shadow-md border border-gray-200 rounded-lg p-2 overflow-hidden">
            <Image
              src={HappyMan}
              alt=""
              width={800}
              height={800}
              className=" w-full hover:scale-105 transition-all duration-200"
            />
          </div>
        
      </FadeRight>
    </div>
  );
};

export default KeyHighlights;
