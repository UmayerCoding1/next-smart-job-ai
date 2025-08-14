import { updateUser } from "@/app/features/user/userSlice";
import { IUser } from "@/app/models/User";
import { imagekit } from "@/lib/ImageKitInstance";
import axios from "axios";
import { Camera } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface Props {
  user: IUser | null;
  setIsUploadCoverImage: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateCoverImage = ({
  user,

  setIsUploadCoverImage,
}: Props) => {
  
  const dispacth = useDispatch();

  async function handleUploadCoverImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        await uploadCoverImage(
          user?.username as string,
          reader.result as string,
          "coverImage"
        );
      };
      reader.readAsDataURL(file);
    }
  }

  async function uploadCoverImage(
    username: string,
    imageUrl: string,
    imageName?: "avatar" | "coverImage"
  ) {
    if (!username || !imageUrl || !imageName) return;
    setIsUploadCoverImage(true);
    const result = await imagekit.upload({
      file: imageUrl,
      fileName: `image_${Date.now()}`,
      tags: [imageName],
    });

    if (!result.url) {
      toast.error("Error uploading image", { duration: 1500 });
      return;
    }

    console.log(result.url);

    if (result.url) {
      try {
        const response = await axios.put(`/api/auth/${user?.username}`, {
          coverImage: result.url,
          imageName,
        });
        console.log(response.data);
        if (response.data.success) {
          setIsUploadCoverImage(false);
          dispacth(updateUser(response.data.user));
          toast.success(response.data.message, { duration: 1500 });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="absolute  top-0 right-1 lg:right-2 mt-2  flex   items-center   gap-1 bg-white px-3 py-1 rounded-full cursor-pointer active:scale-105 ">
      <input
        type="file"
        id="cover-image"
        accept="image/*"
        size={5}
        className="hidden"
        onChange={handleUploadCoverImage}
      />
      <label htmlFor="cover-image" className="flex items-center">
        <Camera size={13} />
        <span className="text-xs font-medium ">Change cover</span>
      </label>
    </div>
  );
};

export default UpdateCoverImage;
