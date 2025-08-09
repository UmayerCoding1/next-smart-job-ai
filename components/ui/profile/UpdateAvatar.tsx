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
import { imagekit } from "@/lib/ImageKitInstance";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "@/app/features/user/userSlice";

type Props = {
  user: IUser | null;
  UserImage: string;
  setIsOpen: (open: boolean) => void;
};

interface avatarImagePreviewData {
  url: string;
  name: string;
  size: number;
}
const UpdateAvatar = ({ user, UserImage, setIsOpen }: Props) => {
  const [avatarImagePreview, setAvatarImagePreview] =
    useState<avatarImagePreviewData | null>(null);
  const [imageError, setImageError] = useState<{
    type: string;
    message: string;
  } | null>(null);
  const [progress, setProgress] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispacth = useDispatch();
  let progressValue = 0;


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const convertSizeInMB = file.size / (1024 * 1024);

      if (convertSizeInMB > 4) {
        setImageError({
          type: "size",
          message: "Image size must be less than 4MB",
        });
        toast.error("Image size must be less than 4MB", { duration: 1500 });
        return;
      }
      if (fileInputRef.current) {
        setAvatarImagePreview(null);
        fileInputRef.current.value = "";
      }
      const reader = new FileReader();

      reader.onload = async () => {
        setAvatarImagePreview({
          url: reader.result as string,
          name: file.name,
          size: Number(convertSizeInMB.toFixed(2)),
        });

        const intarval = setInterval(async() => {
          progressValue += 10;
          setProgress(progressValue);
          if (progressValue >= 60) {
            clearInterval(intarval);
          await  uploadAvatar();
          }
        }, 200);

        async function uploadAvatar() {
          const result = await imagekit.upload({
            file: reader.result  as string ,
            fileName: avatarImagePreview?.name as string || `image_${Date.now()}`,
            tags: ["avatar"],
          });

          if (!result.url) {
            toast.error("Error uploading image", { duration: 1500 });
            return;
          }

          if (result.url) {
            setAvatarImagePreview({
              url: result.url,
              name: avatarImagePreview?.name as string,
              size: Number(convertSizeInMB.toFixed(2)),
            });
            setProgress(100);
            clearInterval(intarval);
            toast.success("Image uploaded successfully", { duration: 1500 });
          }
        }
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



  async function updateAvatar(imageUrl: string,imageName?: 'avatar' | 'coverImage') {
    
     try {
      console.log(imageUrl, imageName);
      const response = await axios.put(`/api/auth/${user?.username}`, {avatar: imageUrl, imageName});
       if(response.data.success){
        setIsOpen(false);
        dispacth(updateUser(response.data.user));
        toast.success(response.data.message, { duration: 1500 });
       }
     } catch (error) {
      console.log(error);
     }
  }
  return (
    <>
      <DialogTrigger asChild>
        <Camera
        onClick={() => setIsOpen(true)}
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
            <p className="text-sm text-red-500 mt-2">{imageError.message}</p>
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
              <Progress value={progress} className="w-full " />
            </div>
          )}

          <div className="mt-3">
            <h2 className="font-semibold border-t border-gray-200">
              Previes Profile Picture
            </h2>
            {user?.previesAvatar?.length ? (
             <>
             {user.previesAvatar.map((avatar, index) => (
               <div key={index} className="flex items-center justify-between shadow border border-gray-200 rounded-lg p-2">
              <Image
                src={avatar}
                alt="update profile picture"
                width={800}
                height={800}
                loading="lazy"
                className="w-14 h-14 rounded-2xl object-cover rounded- shadow"
              />

              <div className="flex items-center gap-2">
                <Button onClick={() => updateAvatar(avatar, 'avatar')} className="active:scale-105">Choose</Button>
               
              </div>
            </div>
             ))}
             </>
            ): (
              <p>No previes profile picture</p>
            )}

          
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setIsOpen(false)} variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>   
          <Button  onClick={() => updateAvatar(avatarImagePreview?.url as string, 'avatar')} type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default UpdateAvatar;
