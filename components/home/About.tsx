import Image from "next/image";
import React from "react";

const aboutImage = '/assets/about-page.png'
const About = () => {
  return (
    <div className="mt-20">
      <div className="flex lg:items-center gap-2 justify-between flex-col md:flex-row  lg:flex-row w-full  ">
        <h2 className="text-3xl font-semibold w-full">
          Explore Over 1.3 Million Job <br /> Vacancies Waiting for You!
        </h2>
        <p className="">
          Browse our extensive job listings and discover opportunities tailored
          just  for you. Start your journey today and turn your dream job
          into a reality!
        </p>
      </div>


      <div className="flex  justify-between gap-10 mt-3 flex-col md:flex-row  lg:flex-row">
         <div className="w-full mg:w-1/2 lg:1/2 lg:p-10 ">
            <Image
             src={aboutImage}
             alt="Google"
             width={800}
             height={800}
             className=" w-full"
            />

           
         </div >
         <div className="w-full mg:w-1/2 lg:1/2 flex flex-col gap-10  lg:mt-16">
           <div className="flex items-start gap-2 group" >
             <button className="bg-white shadow px-3 py-1 rounded-lg group-hover:text-blue-500 font-semibold mt-1">
                <span>1</span>
             </button>

             <div className="bg-white shadow px-5 py-2 rounded-lg">
                <h2 className="text-xl font-semibold group-hover:text-blue-500 mb-2">Explore Job Openings</h2>
                <p className="text-gray-500 text-sm font-medium">Explore a wide array of exciting job openings across various industries that pique your interest and inspire your career ambitions.</p>
             </div>
           </div>

           <div className="flex items-start gap-2 group" >
             <button className="bg-white shadow px-3 py-1 rounded-lg group-hover:text-blue-500 font-semibold mt-1">
                <span>2</span>
             </button>

             <div className="bg-white shadow px-5 py-2 rounded-lg">
                <h2 className="text-xl font-semibold group-hover:text-blue-500 mb-2">Apply for Positions</h2>
                <p className="text-gray-500 text-sm font-medium">Identify positions that align with your unique skills, qualifications, and career goals. Customize your resume and cover letter</p>
             </div>
           </div>
           <div className="flex items-start gap-2 group" >
             <button className="bg-white shadow px-3 py-1 rounded-lg group-hover:text-blue-500 font-semibold mt-1">
                <span>3</span>
             </button>

             <div className="bg-white shadow px-5 py-2 rounded-lg">
                <h2 className="text-xl font-semibold group-hover:text-blue-500 mb-2">Prepare for Interviews</h2>
                <p className="text-gray-500 text-sm font-medium">Get ready to impress potential employers with interview preparation and coaching.</p>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default About;
