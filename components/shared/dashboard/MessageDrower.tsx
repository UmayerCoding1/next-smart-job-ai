"use client";
import { Minus } from "lucide-react";
import Image from "next/image";
import React from "react";

const UserImage = "/assets/user-image.png";
const MessageDrawer = ({
  isOpenMessageDrower,
  setIsOpenMessageDrower,
}: {
  isOpenMessageDrower: boolean;
  setIsOpenMessageDrower: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  
  return (
    <div
    onClick={() => setIsOpenMessageDrower(false)}
      className={`absolute top-0 left-0 w-full h-screen bg-black/30 transition-opacity duration-300 ease-in-out  ${
        isOpenMessageDrower
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Drawer */}
      <div
      onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 right-0 w-[296px] max-h-screen overflow-auto scrollbar-hide bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpenMessageDrower ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white h-14 flex items-center justify-between px-3 py-2">
          <Minus
            onClick={() => setIsOpenMessageDrower(false)}
            size={20}
            className="cursor-pointer"
          />
          <div className="text-center">
            <h1 className="text-xl font-bold">Chat List</h1>
            <p className="text-sm">Show all</p>
          </div>
          <p className="text-sm cursor-pointer">Read all</p>
        </div>

        <div className="p-2">
          {Array.from({ length: 130 }).map((_, index) => (
            <div  key={index} className="flex items-center gap-4 px-3 py-2 border-b">
              <div className="relative">
                <Image
                  src={UserImage}
                  alt="user-image"
                  width={800}
                  height={800}
                  className="w-12 h-12 ovject-cover "
                />
                <span className="block w-2 h-2 bg-emerald-500 rounded-full absolute top-0 right-0"></span>
              </div>

              <div className="leading-0.5">
                <p className="text-lg font-semibold">User Name</p>
                <span className="text-sm font-medium text-gray-500">
                  User is online now
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageDrawer;
