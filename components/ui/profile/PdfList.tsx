"use client";
import { IResume } from "@/app/models/Resume";
import { RootState } from "@/app/redux/store";
import {
  Check,
  CircleCheck,
  Ellipsis,
  FileText,
  FolderDown,
  Trash2,
} from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const PdfList = ({ resume }: { resume: IResume }) => {
  const user = useSelector((state: RootState) => state.authR.user);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);


  const handelResumeSelect = (resumeId: string) => {
    setIsOpen(false);
    console.log(resumeId);
  }

  const handleResumeDelete = (resumeId: string) => {
    setIsOpen(false);
    console.log(resumeId);
  }
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

      {user?.resume?._id.toString() === resume._id.toString() && (
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
