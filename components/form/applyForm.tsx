"use client";
import { IJob } from "@/app/models/Job";
import { IUser } from "@/app/models/User";

import React, { useContext, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import Link from "next/link";
import { Upload } from "lucide-react";
import PrimaryButton from "../button/PrimaryButton";
import ResumeUpload, { ResumeUploadInput, ResumeUploadProvider } from "../shared/FileUpload";

type ApplyFormProps = {
  user: IUser | null;
  job: IJob | null;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

const ApplyForm = ({ user, job, setScore }: ApplyFormProps) => {
  const contest = useContext(ResumeUploadProvider);
  
  const [pdfUrl, setPdfUrl] = useState<{ url: string; name: string }>({
    name: "",
    url: "",
  });
  const [formFields, setFormFields] = useState({
    name: "",
    phone: "",
    email: "",
    expectedSalary: "",
    resumeUploaded: false,
    dynamicAnswers: {} as Record<string, string | boolean>,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        data[key] = value;
      } else {
      }
    });

    console.log("Form data:", { ...data, resume: pdfUrl.url });
  };

  const handleGetResume = (pdfdata: { url: string; name: string , file: File}) => {
    setPdfUrl(pdfdata);
  };

  const calculateScore = (updatedFields = formFields) => {
    let total = 0;

    // Static fields
    if (updatedFields.name) total += 25;
    if (updatedFields.phone) total += 25;
    if (updatedFields.email) total += 25;
    // if (updatedFields.expectedSalary) total += 25;

    // Resume
    if (updatedFields.resumeUploaded) total += 50;

    // Dynamic questions
    const totalDynamic = job?.applicationsQuestions?.length || 0;
    const dynamicAnswered = Object.values(updatedFields.dynamicAnswers).filter(
      Boolean
    ).length;
    if (totalDynamic > 0) {
      total += Math.round((dynamicAnswered / totalDynamic) * 25);
    }

    setScore(total > 100 ? 100 : total);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formFields, [name]: value };
    console.log(updated);
    setFormFields(updated);
    calculateScore(updated);
  };

  const handleDynamicChange = (index: number, value: string | boolean) => {
    const updatedAnswers = {
      ...formFields.dynamicAnswers,
      [`question-${index}`]: value,
    };
    const updated = { ...formFields, dynamicAnswers: updatedAnswers };
    setFormFields(updated);
    calculateScore(updated);
  };
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
          defaultValue={user?.fullname}
          onChange={handleInputChange}
          className="h-14"
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
            defaultValue={user?.phone}
            onChange={handleInputChange}
            className="h-14"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="name">Email</Label>
        <Input
          name="email"
          type="Email"
          placeholder="Email"
          defaultValue={user?.email}
          onChange={handleInputChange}
          className="h-14"
        />
      </div>

      <div>
        <Label htmlFor="name">Expected salary</Label>
        <Input
          name="expectedSalary"
          type="number"
          placeholder="Expected salary"
          onChange={handleInputChange}
          className="h-14"
        />
      </div>

     <ResumeUpload handleGetFileData={handleGetResume} className={'flex items-center gap-3'}>
        <ResumeUploadInput handleFileInput={{id: "resume-upload", className: "w-full"}}/>
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
                onChange={(e) => handleDynamicChange(index, e.target.value)}
                name={filedName}
                className="h-24 resize-none mt-2"
              />
            ) : question?.answerType === "radio" ? (
              <RadioGroup
                defaultValue=""
                name={filedName}
                onValueChange={(value) => handleDynamicChange(index, value)}
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
                  onCheckedChange={(checked) =>
                    handleDynamicChange(index, checked ? "yes" : "no")
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
                  onChange={(e) => handleDynamicChange(index, e.target.value)}
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
