"use client";
import { IJob } from "@/app/models/Job";
import { IUser } from "@/app/models/User";

import React, { useEffect, useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Checkbox } from "../../ui/checkbox";
import Link from "next/link";
import { Upload } from "lucide-react";
import PrimaryButton from "../../button/PrimaryButton";
import ResumeUpload, { ResumeUploadInput } from "../../shared/FileUpload";
import { imagekit } from "@/lib/ImageKitInstance";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { convertFileToBase64 } from "@/lib/convertFileToBase64";

type ApplyFormProps = {
  user: IUser | null;
  job: IJob | null;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

const ApplyForm = ({ user, job, setScore }: ApplyFormProps) => {
  const [pdfUrl, setPdfUrl] = useState<{
    url: string;
    name: string;
    file: File | null;
  }>({
    name: "",
    url: "",
    file: null,
  });
  const [formFields, setFormFields] = useState({
    name: "",
    phone: "",
    email: "",
    expectedSalary: "",
    resumeUploaded: false,
    coverLetter: "",
    jobRelatedQuestions: [] as { question: string; answer: string }[],
  });

  const handleGetResume = async (pdfdata: {
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
      setScore((prev) => prev + 55);
    }
  };

  const calculateScore = (updatedFields = formFields) => {
    let total = user && user.resume ? 55 : 0;

    // Static fields
    if (updatedFields.name) total += 10;
    if (updatedFields.phone) total += 10;
    if (updatedFields.email) total += 10;
    if (updatedFields.expectedSalary) total += 5;
    if (updatedFields.coverLetter) total += 10;

    setScore(total > 100 ? 100 : total);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formFields, [name]: value };
    console.log(updated);
    setFormFields(updated);
    calculateScore(updated);
  };

  const handleDynamicChange = (
    index: number,
    value: string | boolean,
    label: string
  ) => {
    const updatedAnswers = [...formFields.jobRelatedQuestions];

    // If the index already exists, update the answer
    if (updatedAnswers[index]) {
      updatedAnswers[index] = {
        question: label,
        answer: value.toString(), // Store as string to match your schema
      };
    } else {
      // If it's a new index, push a new object
      updatedAnswers.push({
        question: label,
        answer: value.toString(),
      });
    }

    const updated = {
      ...formFields,
      jobRelatedQuestions: updatedAnswers,
    };

    console.log(updated);
    setFormFields(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        data[key] = value;
      } else {
      }
    });

    const applydata = {
      name: data.name,
      countryCode: data.countryCode,
      phone: data.phone,
      email: data.email,
      expectedSalary: data.expectedSalary,
      resumeLink: user && typeof user?.resume === 'object' && 'resumeLink' in user?.resume ? user?.resume?.resumeLink : pdfUrl.url,
      coverLetter: data.coverLetter,
      jobRelatedQuestions: formFields?.jobRelatedQuestions,
      job: job?._id,
      applicant: user?._id,
    };

    try {
      const res = await axios.post("/api/jobs/apply", applydata);
      if (res.data.success) {
        toast.success(res.data.message, { duration: 1500 });
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong", {
          duration: 1500,
        });
      } else {
        toast.error("Something went wrong", { duration: 1500 });
      }

      console.error(error);
    }

    console.log("Form data:", applydata);
    // console.log(formFields)
  };

 useEffect(() => {
  setScore((prev) => {
    const updated = prev + 55;
    return updated;
  });
}, [user?.resume,setScore]);


  return (
    <form
      onSubmit={handleSubmit}
      className="  w-full lg:w-[50%]  p-3 flex flex-col gap-6 bg-white shadow rounded-lg"
    >
      <div>
        <Label htmlFor="name">Name (Match your NID)</Label>
        <Input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleInputChange}
          className="h-14"
          required
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-2">
        <div className="lg:w-[30%]">
          <Label htmlFor="name">Country code</Label>
          <Input
            name="countryCode"
            type="text"
            value={"Bangladesh +880"}
            placeholder="Country code"
            className="h-14 "
            readOnly
          />
        </div>
        <div className="lg:w-[70%]">
          <Label htmlFor="name">Phone</Label>
          <Input
            name="phone"
            type="number"
            placeholder="Phone"
            onChange={handleInputChange}
            className="h-14"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="name">Email</Label>
        <Input
          name="email"
          type="Email"
          placeholder="Email"
          onChange={handleInputChange}
          className="h-14"
          required
        />
      </div>

      <div>
        <Label htmlFor="expectedSalary">Expected salary</Label>
        <Input
          name="expectedSalary"
          type="number"
          placeholder="Expected salary"
          onChange={handleInputChange}
          className="h-14"
          required
        />
      </div>
      <div>
        <Label htmlFor="coverLetter">Cover letter</Label>
        <Input
          name="coverLetter"
          type="text"
          placeholder="Cover letter"
          onChange={handleInputChange}
          className="h-14"
          required
        />
      </div>

      {user && user?.resume ? (
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
            <span className="text-sm">{user?.resume && typeof user.resume === 'object' && 'filename' in user.resume ? user.resume.filename : ''}</span>
          </Link>
        </div>
      ) : (
        <ResumeUpload
          handleGetFileData={handleGetResume}
          className={"flex items-center gap-3"}
        >
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
      )}

      {job?.applicationsQuestions?.map((question, index) => {
        const filedName = `question-${index}`;
        return (
          <div key={index} className="sh">
            <Label htmlFor="name">
              {index + 1} : {question?.question}
            </Label>

            {question?.answerType === "textarea" ? (
              <Textarea
                placeholder="Type your message here."
                onChange={(e) =>
                  handleDynamicChange(index, e.target.value, question?.question)
                }
                name={filedName}
                className="h-24 resize-none mt-2"
                required
              />
            ) : question?.answerType === "radio" ? (
              <RadioGroup
                defaultValue=""
                name={filedName}
                required
                onValueChange={(value) =>
                  handleDynamicChange(index, value, question?.question)
                }
              >
                <div className="flex items-center gap-3 mt-2">
                  <RadioGroupItem value="yes" id={`r1-${index}`} />
                  <Label htmlFor={`r1-${index}`}>Yes</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="no" id={`r2-${index}`} />
                  <Label htmlFor={`r2-${index}`}>No</Label>
                </div>
              </RadioGroup>
            ) : question?.answerType === "checkbox" ? (
              <div className="flex items-start gap-3 mt-2">
                <Checkbox
                  id={`terms-${index}`}
                  name={filedName}
                  required
                  onCheckedChange={(checked) =>
                    handleDynamicChange(
                      index,
                      checked ? "yes" : "no",
                      question?.question
                    )
                  }
                />
                <div className="grid gap-2">
                  <Label htmlFor={`terms-${index}`}>
                    Accept terms and conditions
                  </Label>
                </div>
              </div>
            ) : (
              <div>
                <Input
                  name={filedName}
                  type={question?.answerType}
                  placeholder=""
                  required={question?.required}
                  onChange={(e) =>
                    handleDynamicChange(
                      index,
                      e.target.value,
                      question?.question
                    )
                  }
                  className="h-14"
                />
              </div>
            )}
          </div>
        );
      })}

      <PrimaryButton>Submit</PrimaryButton>
    </form>
  );
};

export default ApplyForm;
