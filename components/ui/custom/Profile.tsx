"use client";
import { ICompany } from "@/app/models/Company";
import { RootState } from "@/app/redux/store";
import FacebookIcon from "@/components/custom-icon/FacebookIcon";
import GithubIcon from "@/components/custom-icon/GithubIcon";
import InstagramIcon from "@/components/custom-icon/InstagramIcon";
import LinkedInIcon from "@/components/custom-icon/LinkedInIcon";
import TwitterIcon from "@/components/custom-icon/TwitterIcon";
import { getCompany } from "@/service/api";
import {
  Bell,
  BriefcaseBusiness,
  Camera,
  Copy,
  FileCheck2,
  HeartHandshake,
  Info,
  Key,
  Rss,
  Shield,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dialog } from "../dialog";

import UpdateAvatar from "./UpdateAvatar";
import { Input } from "@/components/form/AppForm";
import AccountSettingForm from "@/components/form/profile/AccountSettingForm";

const coverImage = "/assets/profilecover-image.jpg";
const UserImage = "/assets/user-image.png";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


const tabs = ['Account Settings', 'Company Profile', 'Education', 'Resume', "Social Media"];

const Profile = () => {
  const user = useSelector((state: RootState) => state.authR.user);
  const [company, setCompany] = useState<ICompany | null>(null);
  const [selectedTab, setSelectedTab] = useState(1);

  useEffect(() => {
    const handleGetCompany = async () => {
      try {
        const response = await getCompany(user?._id?.toString() || "");
        setCompany(response);
      } catch (error) {
        console.log(error);
      }
    };

    handleGetCompany();
  }, [user?._id]);
  
  return (
    <div className="relative">
      <div className="bg-blue-50 w-full h-52 relative">
        <Image
          src={user?.coverImage || coverImage}
          alt="Google"
          width={800}
          height={800}
          className=" w-full h-full  rounded-sm"
        />

        <div className="absolute  top-0 right-1 lg:right-2 mt-2  flex   items-center   gap-1 bg-white px-3 py-1 rounded-full cursor-pointer active:scale-105 ">
          <Camera size={13} />
          <span className="text-xs font-medium ">Change cover</span>
        </div>
      </div>

      <div className="mx-1 lg:flex">
        <div className="w-full lg:w-68 lg:h-[400px] shadow-lg border border-gray-200 rounded-sm bg-white lg:absolute z-10 top-32 mt-2 lg:mt-0 flex lg:flex-col  items-center p-3 lg:mx-5">
          <div className="flex flex-col items-center ">
            <div className="relative">
              <Image
                src={user?.avatar || UserImage}
                alt="Google"
                width={800}
                height={800}
                className="w-28 h-28 lg:w-36 lg:h-36 object-cover rounded-full shadow"
              />

              <div className="absolute z-50   bottom-1 right-2  mt-2 p-1 flex   items-center   gap-1   rounded-full cursor-pointer active:scale-105">
                <Dialog>
                  <UpdateAvatar user={user} UserImage={UserImage} />
                </Dialog>
              </div>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold">
                {user?.fullname}
              </h2>
              <p className="text-sm text-gray-500 text-center">
                {company ? company.name : ""}
              </p>
            </div>
          </div>

          <div>s</div>

          <div>
            <div className="flex items-center  gap-4 p-2 bg-blue-50/50  shadow border border-gray-200 rounded-lg w-full">
              <p className="text-blue-600 font-semibold">
                {BASE_URL?.slice(0, 25)}
              </p>
              <Copy size={13} className="cursor-pointer" />
            </div>

            <div className="flex items-center gap-4 mt-2">
              <FacebookIcon size={20} />
              <TwitterIcon size={20} />
              <LinkedInIcon size={20} />
              <InstagramIcon size={20} />
              <GithubIcon size={20} />
            </div>
          </div>
        </div>
        <div className="w-[320px] hidden lg:block"></div>

        {/* tabs */}
        <div className="w-full ">
          <div className="flex items-center justify-between gap-5   cursor-pointer">
            {tabs.map((tab, index) => (
              <div
              onClick={() => setSelectedTab(index + 1)}
                key={index}
                className={`cursor-pointer   transition-all h-14 duration-200 flex items-center justify-center ${
                  selectedTab === index + 1
                    ? "border-b-2 border-blue-500 bg-gray-100 lg:bg-transparent "
                    : ""
                }`}
              >
                <p className="text-gray-500 font-semibold cursor-pointer text-sm">{tab}</p>
              </div>
            ))}
          </div>
 <hr />
          <div>
            {selectedTab === 1 && <AccountSettingForm/>}
            {/* {selectedTab === 2 && <CompanyProfileForm />}
            {selectedTab === 3 && <EducationForm />}
            {selectedTab === 4 && <ResumeForm />}
            {selectedTab === 5 && <SocialMediaForm />} */}
            
          </div>
         
        </div>

        
      </div>
    </div>
  );
};

export default Profile;

export const ProfileNavList = () => {
  const user = useSelector((state: RootState) => state.authR.user);

  const profileList = [
    { lable: "My Profile", hraf: `/${user?.username}`, icon: User },
    {
      lable: "Change password",
      hraf: `/${user?.username}/update-password`,
      icon: Key,
    },
    {
      lable: "Notifications",
      hraf: `/${user?.username}/notification`,
      icon: Bell,
    },
  ];

  const privetPage = [
    { lable: "My applycation", hraf: `/my-applications`, icon: FileCheck2 },
  ];
  const globleRoutes = [
    { lable: "Companys", hraf: "/companies", icon: BriefcaseBusiness },
    { lable: "Blog", hraf: "/blog", icon: Rss },
    { lable: "About US", hraf: "/about-us", icon: Info },
    { lable: "Support", hraf: "/support", icon: HeartHandshake },
    { lable: "Policy", hraf: "/policy", icon: Shield },
  ];
  return (
    <div>
      <p>Hello, {user?.fullname}</p>

      <div className="hidden lg:block">
        <div className="mt-2 font-medium">
          <h2 className="text-2xl">Manage My Account</h2>
          <ul className="mt-2">
            {profileList.map((item, index) => (
              <Link key={index} href={item.hraf}>
                <li className="flex items-center gap-2 py-2 hover:bg-blue-50 px-3 rounded-lg my-2">
                  <item.icon size={13} />
                  <span>{item.lable}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <hr />

        <div className="mt-2 font-medium">
          <ul className="mt-2">
            {privetPage.map((item, index) => (
              <Link key={index} href={item.hraf}>
                <li className="flex items-center gap-2 py-2 hover:bg-blue-50 px-3 rounded-lg my-2">
                  <item.icon size={13} />
                  <span>{item.lable}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <hr />

        <div className="mt-2 font-medium">
          <ul className="mt-2">
            {globleRoutes.map((item, index) => (
              <Link key={index} href={item.hraf}>
                <li className="flex items-center gap-2 py-2 hover:bg-blue-50 px-3 rounded-lg my-2">
                  <item.icon size={13} />
                  <span>{item.lable}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
