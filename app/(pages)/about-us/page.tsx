import Company from "@/components/home/Company";
import Testimonials from "@/components/home/Testimonials";
import CustomBreadcrumb from "@/components/ui/custom/CustomBreadcrumb";
import { BriefcaseBusiness, Building2, Users } from "lucide-react";
import Image from "next/image";
import React from "react";
const OfficeWork = '/assets/about/office-work.jpeg';
const GrilAss = '/assets/about/gril-ass.jpeg';
const BusinessWomen = '/assets/about/business-women.jpeg';
const Miting = '/assets/about/miting.jpeg';
const page = () => {
  console.log("about us");
  const links = [{ href: "/", label: "Home" }];
  return (
    <div className="max-w-7xl mx-auto p-2 lg:p-0">
      <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
        <h1 className="text-lg font-medium">About us</h1>
        <CustomBreadcrumb currentPage="about us" link={links} />
      </div>

      <div className="mt-10 lg:mt-24">
        <p className="text-xs text-blue-500 font-medium">Who we are</p>

        <div className="flex  flex-col lg:flex-row mt-2">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-medium">
              We&apos;re highly skilled and <br /> professionals team.
            </h1>
            <p className="text-sm lg:text-lg mt-5">
              Praesent non sem facilisis, hendrerit nisi vitae, volutpat quam.
              Aliquam metus mauris, semper eu eros vitae, blandit tristique
              metus. Vestibulum maximus nec justo sed maximus.
            </p>
          </div>

          <div className="lg:w-1/2 flex flex-col gap-10 lg:items-center justify-center mt-3 lg:mt-0">
            <div className="flex  items-center gap-2">
              <div className="bg-blue-100 p-3 rounded-md inline-block">
                <BriefcaseBusiness className="text-blue-400" />
              </div>

              <div>
                <p className="text-xl font-medium">1,75,324</p>
                <p className="text-sm">Live job</p>
              </div>
            </div>
            <div className="flex  items-center gap-2">
              <div className="bg-blue-100 p-3 rounded-md inline-block">
                <Building2 className="text-blue-400" />
              </div>

              <div>
                <p className="text-xl font-medium">25,100</p>
                <p className="text-sm">Companies</p>
              </div>
            </div>
            <div className="flex  items-center gap-2">
              <div className="bg-blue-100 p-3 rounded-md inline-block">
                <Users className="text-blue-400" />
              </div>

              <div>
                <p className="text-xl font-medium">38,000</p>
                <p className="text-sm">Candidates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     <div className="lg:mt-20">
         <Company isHeader={false}/> 
     </div>


    <div className="w-full h-[400px] lg:grid grid-cols-3 mt-10 lg:mt-24 p-5  hidden ">
        <Image
        src={OfficeWork}
        alt="Office Work"
        width={800}
        height={800}
        className="w-full h-[400px] ovject-cover rounded-md"
        />

       <div className=" w-full h-[400px] flex flex-col gap-3 p-5">
         <Image
        src={GrilAss}
        alt="Office Work"
        width={800}
        height={800}
        className="h-1/2 rounded-md"
        />
         <Image
        src={BusinessWomen}
        alt="Office Work"
        width={800}
        height={800}
        className="h-1/2 rounded-md"
        />
       </div>
        <Image
        src={Miting}
        alt="Office Work"
        width={800}
        height={800}
        className="w-full h-[400px] ovject-cover rounded-md"
        />
    </div>


<Testimonials/>

     
    </div>
  );
};

export default page;
