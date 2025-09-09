"use client";
import AppForm from "@/components/shared/AppForm";
import { Button } from "@/components/ui/button";

import { Upload, X } from "lucide-react";
import React from "react";
import { Input } from "@/components/shared/AppForm";
import ResumeUpload, {
  ResumeUploadInput,
} from "@/components/shared/FileUpload";
import { convertFileToBase64 } from "@/lib/convertFileToBase64";
import { imagekit } from "@/lib/ImageKitInstance";
import PrimaryButton from "@/components/button/PrimaryButton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import { IResume } from "@/app/models/Resume";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface JobApplyModaleProps {
  setOpenApplyModal: React.Dispatch<React.SetStateAction<boolean>>;
  saveDataRefetch: () => void;
}
const JobApplyModale = ({
  setOpenApplyModal,
  saveDataRefetch,
}: JobApplyModaleProps) => {
  const user = useSelector((seate: RootState) => seate.authR.user);
  const [pdfUrl, setPdfUrl] = React.useState<{
    url: string;
    name: string;
    file: File | null;
  }>({
    name: "",
    url: "",
    file: null,
  });
  const searchparams = useSearchParams();
  const jobId = searchparams.get("jobId");
  const savedJobId = searchparams.get("savedJobId");

  const handleGetFileData = async (pdfdata: {
    url: string;
    name: string;
    file: File;
  }) => {
    if (pdfdata.file) {
      const resumeBase64 = await convertFileToBase64(pdfdata.file);
      const result = await imagekit.upload({
        file: resumeBase64,
        fileName: pdfdata.file.name,
        tags: ["document", "pdf"],
      });

      console.log("result", result);
      if (result.url) {
        pdfdata.url = result.url;
        pdfdata.name = pdfdata.file.name;
      }
      setPdfUrl(pdfdata);
    }
  };
  console.log(user);
  const handleSubmit = async (data: { [key: string]: string }) => {
    // const payload = { ...data, expectedSalary: data.expected_salary,  resume: (user?.resume as IResume)?.resumeLink || pdfUrl.url,  applicant: user?._id, job: jobId };
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      expectedSalary: data.expected_salary,
      resumeLink: (user?.resume as IResume)?.resumeLink || pdfUrl.url,
      coverLetter: data.cover_letter,
      jobRelatedQuestions: data.jobRelatedQuestions || [],
      job: jobId,
      applicant: user?._id,
    };

    try {
      const response = await axios.post("/api/jobs/apply", payload);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message, { duration: 1500 });
        await axios.delete(`/api/save-job/${savedJobId}`);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage || "An error occurred", { duration: 1500 });
    } finally {
      setOpenApplyModal(false);
      saveDataRefetch();
    }
  };

  return (
    <div className="w-[500px] bg-white rounded-lg p-2   ">
      <div className="flex  items-center justify-end">
        <Button onClick={() => setOpenApplyModal(false)}>
          <X className="cursor-pointer" />
        </Button>
      </div>

      <div>
        <AppForm submitFn={handleSubmit}>
          <div>
            <Input
              handleInput={{
                type: "text",
                name: "name",
                required: true,
                placeholder: "Enter your name",
                value: user?.fullname,
              }}
              label
            />
          </div>
          <div>
            <Input
              handleInput={{
                type: "number",
                name: "phone",
                required: true,
                placeholder: "Enter your phone number",
                value: user?.phone,
              }}
              label
            />
          </div>
          <div>
            <Input
              handleInput={{
                type: "email",
                name: "email",
                required: true,
                placeholder: "Enter your email",
                value: user?.email,
              }}
              label
            />
          </div>
          <div>
            <Input
              handleInput={{
                type: "number",
                name: "expected_salary",
                required: true,
                placeholder: "Enter your expected salary",
              }}
              label
            />
          </div>

          {user && user.resume ? (
            <div>
              <Link
                href={
                  user?.resume &&
                  typeof user.resume === "object" &&
                  "resumeLink" in user.resume
                    ? user.resume.resumeLink
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2"
              >
                <div className="w-20 h-14 bg-red-700 rounded-lg flex items-center justify-center ">
                  <span className="text-white text-xl">PDF</span>
                </div>
                <span className="text-sm">
                  {user?.resume &&
                  typeof user.resume === "object" &&
                  "filename" in user.resume
                    ? user.resume.filename
                    : ""}
                </span>
              </Link>
            </div>
          ) : (
            <div>
              <ResumeUpload handleGetFileData={handleGetFileData}>
                <Label htmlFor="resume-upload">Resume</Label>
                <ResumeUploadInput
                  handleFileInput={{ id: "resume-upload", className: "w-full" }}
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer transition duration-300 flex items-center justify-center rounded-lg h-14  gap-2 border w-full"
                >
                  <Upload size={13} />
                  Upload PDF
                </label>

                {pdfUrl.url && (
                  <div>
                    <Link
                      href={pdfUrl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-2"
                    >
                      <div className="w-20 h-14 bg-red-700 rounded-lg flex items-center justify-center ">
                        <span className="text-white text-xl">PDF</span>
                      </div>
                      <span className="text-sm">{pdfUrl.name}</span>
                    </Link>
                  </div>
                )}
              </ResumeUpload>
            </div>
          )}

          <div>
            <Input
              handleInput={{
                type: "textarea",
                name: "cover_letter",
                required: true,
                placeholder: "Enter your cover letter",
              }}
              label
            />
          </div>

          <div className="flex justify-end">
            <PrimaryButton className="w-40 py-2">Apply</PrimaryButton>
          </div>
        </AppForm>
      </div>
    </div>
  );
};

export default JobApplyModale;
