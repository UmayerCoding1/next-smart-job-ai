"use client";
import type { RootState } from "@/app/redux/store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { useSelector } from "react-redux";

const logo = "/assets/logo.png";
const smaleLogo = "/assets/Ai.png";
const Sidebar = ({
  navItem,
}: {
  navItem: {
    name: string;
    url: string;
    icon: ComponentType<{ className: string; size: number }>;
  }[];
}) => {
  const isOpen = useSelector((state: RootState) => state.dashboardR.isOpen);
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen transition-all duration-300 ease-in-out hidden lg:block bg-black text-white`}
    >
      <div
        className={`${
          isOpen ? "p-4" : "p-3"
        } flex justify-center border-b border-gray-800`}
      >
        <Link href={"/"}>
          {isOpen ? (
            <Image
              src={logo || "/placeholder.svg"}
              alt="logo"
              width={800}
              height={800}
              className="w-40"
            />
          ) : (
            <Image
              src={smaleLogo || "/placeholder.svg"}
              alt="logo"
              width={800}
              height={800}
              className="w-12"
            />
          )}
        </Link>
      </div>

      <div className={`${isOpen ? "p-4" : "p-2"} flex-1`}>
        <ul className="space-y-1">
          {navItem?.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.url === "/dashboard/recruiter" || item.url === "/dashboard/jobseeker" ? pathname === "/dashboard/recruiter" || pathname === "/dashboard/jobseeker" : pathname.startsWith(item.url);
            return (
              <li key={index} className="relative">
                {isActive && (
                  <div className="absolute left-0 top-0 w-full  h-full bg-gradient-to-r from-blue-500/40 to-blue-700/0 ml-1 rounded-r">
                    <div className="absolute left-0 top-0 w-1  h-full bg-blue-500 rounded-r "></div>
                  </div>
                )}
                {isOpen ? (
                  <Link
                    href={item.url}
                    className="flex items-center rounded-md transition-colors duration-200"
                  >
                    <Icon
                      size={20}
                      className={`ml-4 mr-3 ${
                        isActive
                          ? "text-white"
                          : "text-white"
                      }`}
                    />
                    <div
                      className={`${
                        isActive
                          ? " text-blue-500"
                          : "text-white"
                      }  hover:text-blue-500 flex-1 py-3 pr-4 rounded-r-2xl text-sm font-medium transition-colors duration-200`}
                    >
                      {item.name}
                    </div>
                  </Link>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.url}
                        className="flex justify-center py-3"
                      >
                        <Icon
                          size={20}
                          className={`${
                           isActive
                              ? "fill-white text-transparent bg-blue-500 p-2 rounded-lg"
                              : "text-gray-400 hover:text-blue-500 hover:bg-blue-100 hover:rounded-lg p-2"
                          } transition-colors duration-200`}
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
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
