import Image from "next/image";
import React from "react";

const GoogleImage = "/assets/google-logo.png";

const Company = ({ isHeader = true }: { isHeader?: boolean }) => {
  const companyImage = [
    "/assets/dropbox.png",
    "/assets/Upwork.png",
    "/assets/uder.png",
    "/assets/dribbble.png",
    "/assets/amazon.png",
    "/assets/dropbox.png",
    "/assets/Upwork.png",
    "/assets/uder.png",
    "/assets/dribbble.png",
    "/assets/amazon.png",
  ];
  return (
    <div className="flex lg:items-center w-full  gap-20 lg:mt-10 px-10">
      {isHeader && (
        <div className="  mb-12 w-96  border-r pr-5 pl-2 hidden lg:block">
          <h2 className="text-3xl md:text-3xl font-bold text-neutral-800">
            Top Companies Hiring Now
          </h2>
          <div className="w-20 h-1.5 bg-[#82C526] mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-neutral-600 max-w-xl mx-auto font-medium">
            Discover the most trusted employers actively looking for top talent
            on SmartJob AI. Start your career with the best in the industry.
          </p>
        </div>
      )}

      <div className="overflow-hidden whitespace-nowrap   scroll-container flex-1">
        <div className="flex animate-scroll gap-10 h-40 items-center">
          {companyImage.map((url, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={url}
                alt="Google"
                width={100}
                height={100}
                className=" w-24 md:w-40 lg:w-20"
              />
            </div>
          ))}

          {companyImage.map((url, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0">
              <Image
                src={url}
                alt="Google"
                width={100}
                height={100}
                className=" w-24 md:w-40 lg:w-20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company;
