"use client";
import { CloudDownload, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../button";

const ResumeUpload = () => {
  const [resumedata, setResumeData] = useState<{ url: string; name: string }>({
    name: "",
    url: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setResumeData({
          url: result,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(resumedata);
  return (
    <div>
      <div>
        <div className="flex gap-5 ">
          <div className="w-full lg:w-[55%]">
            <input
              type="file"
              accept="application/pdf"
              id="resume"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="resume">
              <div className="w-full  h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500">
                <CloudDownload size={20} className="rotate-180" />
                <span className="text-lg font-semibold">
                  Upload Your Resume
                </span>
                <span className="text-sm">Upload only document</span>
              </div>
            </label>
          </div>

          <div className="h-40 shadow p-2">
            <Link
              href={resumedata.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 h-full"
            >
              <div className="w-40 h-full bg-red-700 rounded-lg flex items-center justify-center ">
                <span className="text-white text-xl">PDF</span>
              </div>
              <div className="flex flex-col justify-between items-end">
                <span className="text-sm">{resumedata.name}</span>
                <X size={20} className="text-red-600" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Button className="bg-gradient-to-tr from-blue-500 to-blue-800">Update</Button>
    </div>
  );
};

export default ResumeUpload;
