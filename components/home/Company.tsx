import Image from "next/image";
import React from "react";

const GoogleImage = "/assets/google-logo.png";

const Company = ({ isHeader = true }: { isHeader?: boolean }) => {
  return (
    <div className="">
      {isHeader && (
        <div className="text-center mt-20 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
            Top Companies Hiring Now
          </h2>
          <div className="w-20 h-1.5 bg-[#82C526] mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-neutral-600 max-w-xl mx-auto font-medium">
            Discover the most trusted employers actively looking for top talent
            on SmartJob AI. Start your career with the best in the industry.
          </p>
        </div>
      )}

      <div className="overflow-hidden whitespace-nowrap   scroll-container">
        <div className="flex animate-scroll gap-5 h-40 items-center">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={GoogleImage}
                alt="Google"
                width={100}
                height={100}
                className=" w-40 md:w-60 lg:w-60"
              />
            </div>
          ))}

          {/* Duplicate for seamless infinite scroll */}
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0">
              <Image
                src={GoogleImage}
                alt="Google"
                width={100}
                height={100}
                className=" w-20 md:w-80 lg:w-80"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company;
