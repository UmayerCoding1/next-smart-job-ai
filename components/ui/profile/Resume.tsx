import ResumeUpload, {
  ResumeUploadInput,
} from "@/components/shared/FileUpload";
import { CloudDownload, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PreviesResume from "./PreviesResume";
import { Button } from "../button";
import { toast } from "sonner";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { imagekit } from "@/lib/ImageKitInstance";
import { convertFileToBase64 } from "@/lib/convertFileToBase64";
import axios from "axios";
import { IResume } from "@/app/models/Resume";

const Resume = () => {
  const user = useSelector((state: RootState) => state.authR.user);
  const [resumedata, setResumeData] = useState<{
    resumeLink: string;
    filename: string;
    size: number;
    file?: File | null;
  } | null>(null);
  const [resumes, setResumes] = useState<IResume[] | []>([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (pdfdata: {
    url: string;
    name: string;
    file: File;
  }) => {
    if (pdfdata) {
      try {
        setIsLoading(true);
        const resumeBase64 = await convertFileToBase64(pdfdata.file);
        const result = await imagekit.upload({
          file: resumeBase64,
          fileName: pdfdata.file.name,
          tags: ["document", "pdf"],
        });

        if (result.url) {
          setResumeData({
            resumeLink: result.url,
            filename: pdfdata.file.name,
            size: pdfdata.file.size,
          });

          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

      toast.success("Resume uploaded successfully", { duration: 1500 });
    } else {
      toast.error("Something went wrong", { duration: 1500 });
      setResumeData(null);
    }
  };

  const handleSubmit = async (data: {
    user: string;
    resumeLink: string;
    filename: string;
    size: number;
  }) => {
    if (!data.resumeLink || !data.filename || !data.size) {
      toast.error("Something went missing", { duration: 1500 });
      return;
    }

    const { resumeLink, filename, size } = data;

    try {
      const resumeData = {
        user,
        resumeLink,
        filename,
        size,
      };

      const response = await axios.post("/api/auth/resume", resumeData);

      if (response.data.success) {
        toast.success(response.data.message, { duration: 1500 });
      }
    } catch (error) {
      console.log(error);
    }
  };


   useEffect(() => {
     const handleGetResume = async(userId: string) => {
     try {
      console.log(userId);
      const res = await axios.get(`/api/auth/resume/${userId}`);
      if (res.data.success && res.data.resume.length > 0) {
        setResumes(res.data.resume);
      }
     } catch (error) {
      console.log(error);
     }
  }
  handleGetResume(user?._id?.toString() || "");
   },[user]);

   console.log('resume', resumes);
  return (
    <ResumeUpload handleGetFileData={handleFileChange}>
      <div className="w-full ">
        <div className="flex gap-5 ">
          <div
            className={`{ ${
              resumedata?.resumeLink ? "lg:w-[55%]" : "w-full lg:w-full"
            } cursor-pointer `}
          >
            <ResumeUploadInput
              handleFileInput={{ id: "resume", className: "w-full" }}
            />
            <label htmlFor="resume">
              <div className="w-full  h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                {isLoading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <>
                    <CloudDownload size={20} className="rotate-180" />
                    <span className="text-lg font-semibold">
                      Upload Your Resume
                    </span>
                    <span className="text-sm">Upload only document</span>
                  </>
                )}
              </div>
            </label>
          </div>
          {resumedata?.resumeLink && (
            <div className="h-40 shadow p-2">
              <Link
                href={resumedata?.resumeLink ? resumedata.resumeLink : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 h-full"
              >
                <div className="w-40 h-full bg-red-700 rounded-lg flex items-center justify-center ">
                  <span className="text-white text-xl">PDF</span>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <span className="text-sm">{resumedata.filename}</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

     {resumes && resumes.length > 0 &&  <PreviesResume resumes={resumes || []} />}
      <Button
        onClick={() =>
          handleSubmit({
            user: user?._id?.toString() || "",
            resumeLink: resumedata?.resumeLink ? resumedata.resumeLink : "",
            filename: resumedata?.filename ? resumedata.filename : "",
            size: resumedata?.size ? resumedata.size : 0,
          })
        }
        className="bg-gradient-to-tr from-blue-500 to-blue-800 w-full cursor-pointer"
      >
        Update
      </Button>
    </ResumeUpload>
  );
};

export default Resume;
