"use client";
import { toggle } from "@/app/redux/slice/DashboardSlice";
import { RootState } from "@/app/redux/store";
import Logout from "@/components/action/logout";
import { PanelLeftOpen, PanelRightOpen, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserImage = "/assets/user-image.png";
const Navbar = () => {
  const user = useSelector((state: RootState) => state.authR.user);
  const isOpen = useSelector((state: RootState) => state.dashboardR.isOpen);
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {isOpen ? (
          <PanelRightOpen size={20} onClick={() => dispatch(toggle())} />
        ) : (
          <PanelLeftOpen size={20} onClick={() => dispatch(toggle())} />
        )}

        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2 w-80 h-12 rounded-xl bg-gray-100 px-2 py-1">
        <input
          type="text"
          name=""
          id=""
          className="flex-1 placeholder:text-sm placeholder:font-medium text- h-full outline-none"
          placeholder="Search"
        />
        <Search className="text-gray-400" size={15} />
      </div>

      <div>
        <div className="w-14  h-14 rounded-full bg-gray-100 cursor-pointer relative">
          <Image
            onClick={() => setIsOpenDrop(!isOpenDrop)}
            src={user?.avatar || UserImage}
            alt="avatar"
            width={800}
            height={800}
            className="w-full h-full object-cover rounded-full"
          />

          {isOpenDrop && (
            <div className="absolute top-16 right-0 w-44 h-28 bg-white  shadow-md  rounded-lg p-3 flex flex-col gap-3">
              <Link
                href={`/profile/${user?.username}`}
                className="flex items-center justify-between gap-2 p-2 hover:bg-gray-100 rounded-lg"
              >
                <span className="text-sm font-medium">Profile</span>
                <User size={13} />
              </Link>

              <div className="w-full h-10">
                <Logout>Logout</Logout>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
