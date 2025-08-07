"use client";
import { RootState } from "@/app/redux/store";
import {
  BellRing,
  Bookmark,
  BriefcaseBusiness,
  LayoutDashboard,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentType } from "react";
import { useSelector } from "react-redux";

const logo = "/assets/logo.png";
const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.dashboardR.isOpen)
  const pathname = usePathname();
  console.log(pathname);

  console.log(isOpen);
  const navItem: { name: string; url: string; icon: ComponentType<{className: string, size: number}> }[] = [
    {
      name: "Overview",
      url: "/dashboard/jobseeker",
      icon: LayoutDashboard,
    },
    {
      name: "Applied jobs",
      url: "/dashboard/jobseeker/applied-jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Saved jobs",
      url: "/dashboard/jobseeker/saved-jobs",
      icon: Bookmark,
    },
    {
      name: "Job Alerts",
      url: "/dashboard/jobseeker/job-alerts",
      icon: BellRing,
    },
    {
      name: "my Profile",
      url: "/profile",
      icon: User,
    },
  ];
  return (
    <div className="w-64 bg pl-4 pt-2 h-screen ">
      <div>
        <Image
          src={logo}
          alt="logo"
          width={800}
          height={800}
          className=" w-56 "
        />
      </div>

      <div className="mt-5 ">
        <ul>
          {navItem.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index} className="mb-3">
                {isOpen ? <Link href={item.url} className="flex items-center  rounded-md">
                <Icon size={20} className={`mr-2 ${pathname === item.url ? "fill-blue-500  text-transparent" : ""}`} />
                 <p className={`${pathname === item.url ? "bg-blue-100 text-blue-500" : ""} hover:bg-blue-100 w-full p-3 rounded-tl-2xl rounded-bl-2xl text-sm font-medium hover:text-blue-500`}>{item.name}</p>
               </Link> 
               : <p>{item.name}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
