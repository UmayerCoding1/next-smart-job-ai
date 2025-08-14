"use client";
import { toggle } from "@/app/redux/slice/DashboardSlice";
import { RootState } from "@/app/redux/store";
import Logout from "@/components/action/logout";
import {
  Bell,
  MessageSquareText,
  PanelLeftOpen,
  PanelRightOpen,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageDrawer from "./MessageDrower";
import Notificationa from "./Notification";

const UserImage = "/assets/user-image.png";
const Navbar = () => {
  const user = useSelector((state: RootState) => state.authR.user);
  const isOpen = useSelector((state: RootState) => state.dashboardR.isOpen);
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const [isOpenMessageDrower, setIsOpenMessageDrower] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpenMessageDrower) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
    }
  }, [isOpenMessageDrower]);

  useEffect(() => {
    const handleOutSiteClick = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setIsOpenNotification(false);
      }
    };
    document.addEventListener("click", handleOutSiteClick);
    return () => {
      document.removeEventListener("click", handleOutSiteClick);
    };
  }, [isOpenNotification]);

  return (
    <div className="p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {isOpen ? (
          <PanelRightOpen size={20} onClick={() => dispatch(toggle())} />
        ) : (
          <PanelLeftOpen size={20} onClick={() => dispatch(toggle())} />
        )}

        <h1 className="lg:text-2xl font-bold">Dashboard</h1>
      </div>

      {/* dearch */}
      <div className="lg:flex items-center gap-2 w-80 h-12 rounded-xl bg-gray-100 px-2 py-1 hidden ">
        <input
          type="text"
          name=""
          id=""
          className="flex-1 placeholder:text-sm placeholder:font-medium text- h-full outline-none"
          placeholder="Search"
        />
        <Search className="text-gray-400" size={15} />
      </div>

      <div className="flex items-center  gap-5">
        <Search className=" bg-gray-200 w-8 h-8 rounded-full p-2 cursor-pointer lg:hidden" />

        <div
          onClick={() => setIsOpenNotification(!isOpenNotification)}
          ref={notificationRef}
          className="relative cursor-pointer mt-1"
        >
          <Bell size={20} className="text " />
          <div className="absolute -top-3 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm text-white font-medium">12</span>
          </div>

          {isOpenNotification && <Notificationa />}
        </div>
        <div
          onClick={() => setIsOpenMessageDrower(!isOpenMessageDrower)}
          className="relative cursor-pointer mt-1 "
        >
          <MessageSquareText size={20} />
          <div className="absolute -top-3 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm text-white font-medium">79</span>
          </div>
        </div>
        <div className="w-10  h-10 rounded-full bg-gray-100 cursor-pointer relative">
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

      <div
        onClick={() => setIsOpenMessageDrower(false)}
        className={`absolute top-0 left-0 z-50 w-full h-screen bg-black/30 transition-opacity duration-300 ease-in-out  ${
          isOpenMessageDrower
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
         <div
      onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 z-50 right-0 w-[296px] max-h-screen overflow-auto scrollbar-hide bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpenMessageDrower ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isOpenMessageDrower && (
          <MessageDrawer
            isOpenMessageDrower={isOpenMessageDrower}
            setIsOpenMessageDrower={setIsOpenMessageDrower}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
