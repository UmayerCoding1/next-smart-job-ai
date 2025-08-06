"use client";
import { setUser, updateUser } from "@/app/features/user/userSlice";
import { IResume } from "@/app/models/Resume";
import { RootState } from "@/app/redux/store";
import axios from "axios";
import {
  Check,
  CircleCheck,
  Ellipsis,
  FileText,
  FolderDown,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const PdfList = ({
  resume,
  setUpdating,
  setUploading,
}: {
  resume: IResume;
  setUpdating: (value: boolean) => void;
  setUploading: (value: boolean) => void;
}) => {
  const user = useSelector((state: RootState) => state.authR.user);
  const [isOpen, setIsOpen] = useState(false);
  const dispacth = useDispatch();
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const handelResumeSelect = async (resumeId: string) => {
    setIsOpen(false);
    setUploading(true);
    console.log(resumeId);

    try {
      setUpdating(true);
      const res = await axios.put(`/api/auth/${user?.username}`, {
        resume: resumeId,
      });
      if (res.data.success) {
        dispacth(updateUser(res.data.user));
        toast.success("Resume updated successfully", { duration: 1500 });
        setUploading(false);
        setTimeout(() => {
          setUpdating(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResumeDelete = (resumeId: string) => {
    setIsOpen(false);
    console.log(resumeId);
  };

  useEffect(() => {
    console.log(user?.resume, resume._id);
  }, [user]);

  console.log(user);
  return (
    <div className="flex items-center justify-between gap-4 shadow p-2 border border-gray-200 rounded-md relative">
      <div className="flex items-center gap-1">
        <FileText size={20} className="text-blue-500" />
        <div>
          <p className="text-lg font-medium">
            {resume.filename.slice(0, 30)}...
          </p>
          <p className="text-sm text-gray-500">
            {new Date(resume.createdAt).toDateString()}
          </p>
        </div>
      </div>

      <div>
        <Ellipsis
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          size={17}
          className="cursor-pointer"
        />
      </div>

      {user?.resume?._id === resume._id && (
        <Check size={12} className="text-emerald-500 absolute top-0 right-1" />
      )}

      {isOpen && (
        <div className="absolute w-36 h-36 z-10  top-10 right-2 bg-white shadow border border-gray-200 rounded-md p-2 flex flex-col gap-2">
          <button
            onClick={() => handelResumeSelect(resume._id.toString())}
            className="flex items-center gap-1 bg-gray-100 w-full p-2 cursor-pointer rounded-lg hover:bg-gray-200"
          >
            <CircleCheck size={13} className="text-blue-500" />
            <p className="text-sm font-semibold text-gray-500">Select</p>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 bg-gray-100 w-full p-2 cursor-pointer rounded-lg hover:bg-gray-200"
          >
            <FolderDown size={13} className="text-blue-500" />
            <p className="text-sm font-semibold text-gray-500">Download</p>
          </button>
          <button
            onClick={() => handleResumeDelete(resume._id.toString())}
            className="flex items-center gap-1 bg-red-500 text-white w-full p-2 cursor-pointer rounded-lg hover:bg-red-600"
          >
            <Trash2 size={13} className="" />
            <p className="text-sm font-semibold ">Delete</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfList;
