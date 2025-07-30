"use client";
import React, { useRef, useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Camera, FileImage, Trash2, X } from "lucide-react";
import Image from "next/image";
import { Progress } from "../progress";
import { Button } from "../button";
import { IUser } from "@/app/models/User";
import { toast } from "sonner";

type Props = {
  user: IUser | null;
  UserImage: string;
};

interface avatarImagePreviewData {
  url: string;
  name: string;
  size: number;
}
const UpdateAvatar = ({ user, UserImage }: Props) => {
  const [avatarImagePreview, setAvatarImagePreview] =useState<avatarImagePreviewData | null>(null);
  const [imageError, setImageError] = useState<{ type: string , message: string} | null>(null);
  // const [progress, setProgress] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const convertSizeInMB = file.size / (1024 * 1024);

    if (convertSizeInMB > 4) {
        setImageError({ type: "size", message: "Image size must be less than 4MB" });
      toast.error("Image size must be less than 4MB", { duration: 1500 });
      return;
        
    }
      if (fileInputRef.current) {
        setAvatarImagePreview(null);
        fileInputRef.current.value = "";
      }
      const reader = new FileReader();

      reader.onload = () => {
        toast.success("Image uploaded successfully", { duration: 1500 });
        setAvatarImagePreview({
          url: reader.result as string,
          name: file.name,
          size: Number(convertSizeInMB.toFixed(2)),
        });

        setImageError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAvatarImagePreview = () => {
    setAvatarImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      toast.warning("Clearing previous image", { duration: 1500 });
    }
  };
  return (
    <>
      <DialogTrigger asChild>
        <Camera
          size={30}
          className=" z-50   bottom-1 right-2 bg-blue-500 text-white border-3 border-white  mt-2 p-1 flex   items-center   gap-1   rounded-full cursor-pointer active:scale-105 "
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update profile picture</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="relative w-full">
            <input
              ref={fileInputRef}
              id="resume-upload"
              type="file"
              name="avatar"
              accept="image/*"
              className="hidden"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleImageChange(e)
              }
            />
            <label htmlFor="resume-upload" className="cursor-pointer w-full">
              {avatarImagePreview ? (
                <div className="w-full h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                  <Image
                    src={avatarImagePreview.url}
                    alt="update profile picture"
                    width={800}
                    height={800}
                    loading="lazy"
                    className="w-14 h-14 object-cover rounded-lg opacity-35"
                  />

                  <p className="text-lg text-gray-500">
                    Choose your profile picture
                  </p>
                  <p className="text-sm text-gray-500">
                    JPEG, PNG, GIF or WEBP
                  </p>
                </div>
              ) : (
                <div className="w-full h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                  <FileImage size={40} className="text-gray-500" />
                  <p className="text-lg text-gray-500">
                    Choose your profile picture
                  </p>
                  <p className="text-sm text-gray-500">
                    JPEG, PNG, GIF or WEBP
                  </p>
                </div>
              )}
            </label>
          </div>

              {imageError && imageError.type === "size" && (
                <p className="text-sm text-red-500 mt-2">
                  {imageError.message}
                </p>
              )}
          {avatarImagePreview && (
            <div className="p-2 flex  flex-col gap-2 shadow border border-gray-200 rounded-lg mt-2">
              <div className="flex gap-2">
                <Image
                  src={avatarImagePreview.url && avatarImagePreview.url}
                  alt="update profile picture"
                  width={800}
                  height={800}
                  loading="lazy"
                  className="w-14 h-14 rounded-2xl object-cover rounded- shadow"
                />

                <div className="flex items-center justify-between w-full">
                  <div>
                    <h2 className="font-semibold">{avatarImagePreview.name}</h2>
                    <p className="text-sm text-gray-500">
                      {avatarImagePreview.size} MB
                    </p>
                  </div>

                  <X
                    size={15}
                    onClick={() => clearAvatarImagePreview()}
                    className="text-red-500"
                  />
                </div>
              </div>
              <Progress value={50} className="w-full " />
            </div>
          )}

          <div className="mt-3">
            <h2 className="font-semibold border-t border-gray-200">
              Previes Profile Picture
            </h2>
            <div className="flex items-center justify-between shadow border border-gray-200 rounded-lg p-2">
              <Image
                src={user?.coverImage || UserImage}
                alt="update profile picture"
                width={800}
                height={800}
                loading="lazy"
                className="w-14 h-14 rounded-2xl object-cover rounded- shadow"
              />

              <div className="flex items-center gap-2">
                <Button className="active:scale-105">Choose</Button>
                <Button variant={"destructive"} className="active:scale-105">
                  <Trash2 />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between shadow border border-gray-200 rounded-lg p-2">
              <Image
                src={user?.coverImage || UserImage}
                alt="update profile picture"
                width={800}
                height={800}
                loading="lazy"
                className="w-14 h-14 rounded-2xl object-cover rounded- shadow"
              />

              <div className="flex items-center gap-2">
                <Button className="active:scale-105">Choose</Button>
                <Button variant={"destructive"} className="active:scale-105">
                  <Trash2 />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default UpdateAvatar;
