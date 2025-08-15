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
const smaleLogo = "/assets/Ai.png";
const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.dashboardR.isOpen);
  const pathname = usePathname();
 console.log(isOpen)
  const navItem: {
    name: string;
    url: string;
    icon: ComponentType<{ className: string; size: number }>;
  }[] = [
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
    <div
      className={`${
        isOpen ? "w-64" : "w-20 p-2 flex flex-col items-center"
      }  pl-4 pt-2 h-screen transition-all duration-300 ease-in-out hidden lg:block `}
    >
      <div>
        <Link href={'/'}>
        {isOpen ? (
          <Image
            src={logo}
            alt="logo"
            width={800}
            height={800}
            className=" w-40 "
          />
        ) : (
          <Image
            src={smaleLogo}
            alt="logo"
            width={800}
            height={800}
            className=" w-12 "
          />
        )}
        </Link>
      </div>

      <div className="mt-5 ">
        <ul className="space-y-2">
          {navItem.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index} className="mb-3">
                {isOpen ? (
                  <Link
                    href={item.url}
                    className="flex items-center  rounded-md"
                  >
                    <Icon
                      size={20}
                      className={`mr-2 ${
                        pathname === item.url
                          ? "fill-blue-500  text-transparent"
                          : ""
                      }`}
                    />
                    <p
                      className={`${
                        pathname === item.url  ? "bg-blue-100 text-blue-500 " : ""
                      } hover:bg-blue-100 w-full p-3 rounded-tl-2xl rounded-bl-2xl text-sm font-medium hover:text-blue-500`}
                    >
                      {item.name}
                    </p>
                  </Link>
                ) : (
                  <Link href={item.url} className="mb-4">
                    <Icon
                      size={pathname === item.url ? 24 : 20}
                      className={`mr-2 ${
                        pathname === item.url
                          ? "fill-white  text-transparent bg-blue-500  p-2  rounded-lg  "
                          : "text-black/70  hover:text-blue-500 hover:bg-blue-100  hover:rounded-lg "
                      } mb-5 `}
                    />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
