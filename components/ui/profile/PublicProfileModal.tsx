"use client";
import { IUser } from "@/app/models/User";
import Image from "next/image";
import React, { useEffect } from "react";
import { UserImage } from "./Profile";
import { FileText } from "lucide-react";
import { Button } from "../button";

type Props = {
  setIsOpenPublicProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
};
const PublicProfileModal = ({ setIsOpenPublicProfileModal, user }: Props) => {
  if (!user) {
    return;
  }
  return (
    <div
      onClick={() => setIsOpenPublicProfileModal(false)}
      className="w-full  h-screen  absolute top-0 left-0 z-100 bg-black/20 flex justify-center items-center p-3"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-1/2 h-full rounded-lg p-10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={user?.avatar || UserImage}
              alt="avatar"
              width={800}
              height={800}
              className="w-40 h-40  object-cover rounded-full"
            />

            <div className="flex flex-col  mt-4">
              <p className="text-2xl font-semibold">{user?.fullname}</p>
              <p className="text-sm font-medium text-gray-500">{user?.email}</p>
            </div>
          </div>

          <Button>
            <FileText />
            <span>Resume</span>
          </Button>
        </div>


        <div>
         
        </div>
      </div>
    </div>
  );
};

export default PublicProfileModal;
