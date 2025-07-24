import Image from "next/image";
import React from "react";

const GoogleImage = "/assets/google-logo.png";

const Company = () => {
  return (
    <div className="">
      <div className="text-center mt-10 mb-6">
  <h2 className="text-3xl font-bold text-gray-800">
    Top Companies Hiring Now
  </h2>
  <p className="mt-2 text-gray-500 max-w-xl mx-auto">
    Discover the most trusted employers actively looking for top talent on SmartJod AI. Start your career with the best in the industry.
  </p>
</div>


      <div className="overflow-hidden whitespace-nowrap   scroll-container">
        <div className="flex animate-scroll gap-5 h-40 items-center">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={GoogleImage}
                alt="Google"
                width={100}
                height={100}
                className=" w-40 md:w-80 lg:w-80"
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
