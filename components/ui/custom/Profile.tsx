"use client";
import { RootState } from "@/app/redux/store";
import { Bell, Key, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  return <div className="">2</div>;
};

export default Profile;

export const ProfileNavList = () => {
  const user = useSelector((state: RootState) => state.authR.user);

  const profileList = [
    { lable: "My Profile", hraf: `/${user?.username}`, icon: User },
    {lable: "Change password",hraf: `/${user?.username}/update-password`,icon: Key,},
    {lable: "Notifications",hraf: `/${user?.username}/notification`,icon: Bell,},
  ];


  console.log(user);
  return (
    <div>
      <p>Hello, {user?.fullname}</p>

      <div className="mt-2 font-medium">
        <h2 className="text-2xl">Manage My Account</h2>
        <ul className="mt-2">
          {profileList.map((item, index) => (
            <Link key={index} href={item.hraf}>
              <li className="flex items-center gap-2 py-2 hover:bg-blue-50 px-3 rounded-lg">
                <item.icon size={13} />
                <span>{item.lable}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
