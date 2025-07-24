import { Star } from "lucide-react";
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

          <div className="p-4 shadow-md w-full h-60  md:w-[350px] lg:w-[350px] border border-gray-200 rounded-lg bg-blue-50 flex flex-col justify-between">
            <h2 className="text-6xl font-bold">82%</h2>

            <div>
              <h2 className="text-2xl font-semibold">Successful Contracts</h2>
              <p className="text-sm font-medium">
                Maecenas dapibus libero elit, ac egestas purus egestas a. Duis
                venenatis element
              </p>
            </div>
          </div>
    
      </FadeLeft>

      <DropAnimation
        delay={0.7}
        className="w-full md:w-1/2 lg:w-1/2 relative group overflow-hidden"
      >
        <Image
          src={GrilStudent}
          alt=""
          width={800}
          height={800}
          className=" w-full h-full group-hover:scale-105 transition-all duration-200"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b form-[#000] to-[#000]  text-white flex flex-col  justify-end p-10">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <Star className="text-white w-4 h-4" />
              </div>
            ))}
          </div>

          <h1 className="text-3xl font-bold mt-4">Top-rated Companies</h1>
          <p className="text-sm font-medium  my-2">
            Top-rated Companies Maecenas dapibus libero elit, ac egestas purus
            egestas a. Duis venenatis elementum odio GET FREE CONSULTATION
          </p>

          <PrimaryButton className="mt-4">GET FREE CONSULTATION</PrimaryButton>
        </div>
      </DropAnimation>

      <FadeRight className="w-full md:w-[350px] lg:w-[350px]  transition-all duration-200  overflow-hidden flex flex-col justify-between gap-4 rounded-lg">
        
          <div className="p-4 shadow-md w-full lg:h-80  md:w-[350px] lg:w-[350px] border border-gray-200 rounded-lg bg-blue-500 text-white flex  gap-3 flex-col justify-between">
            <div>
              <h2 className="text-6xl font-bold">1-30</h2>
              <p>days time to hire</p>
            </div>

            <div className="lg:w-80 h">
              <h2 className="text-3xl font-semibold">
                Streamlines the Hiring Process by ATS
              </h2>

              <Button className="mt-4 bg-white text-blue-500">
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
