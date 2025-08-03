"use client";
import React, { useState } from "react";
import AppForm, { Input } from "../../shared/AppForm";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Button } from "@/components/ui/button";
import GostButton from "@/components/button/GostButton";
import { CirclePlus } from "lucide-react";

export interface IEducationFormProps {
  educationdata: {
    degree: string;
    institution: string;
    year: string;
  }[];
}
export interface IEducation {
  degree: string;
  institution: string;
  year: string;
}
const EducationForm = ({ educationdata }: IEducationFormProps) => {
  const user = useSelector((state: RootState) => state.authR.user);
  const [educations, setEducations] = useState<IEducation[]>(
    educationdata.length
      ? educationdata
      : [{ degree: "", institution: "", year: "" }]
  );

  const handleSubmit = (data: { [key: string]: string }) => {
    const formattedData: IEducation[] = educations.map((_, index) => ({
      degree: data[`degree-${index}`],
      institution: data[`institution-${index}`],
      year: data[`year-${index}`],
    }));

    console.log("Dispatched Education Data:", formattedData);
  };

  const handleAddLink = () => {
    setEducations((prev) => [
      ...prev,
      { degree: "", institution: "", year: "" },
    ]);
  };
  console.log(user);
  return (
    <div>
      <AppForm submitFn={handleSubmit}>
        {educations.map((education, index) => (
          <div key={index} className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold bg-gray-100 my-3">
              Degree {index + 1}
            </h2>
            <Label htmlFor={`degree-${index}`}>Degree</Label>
            <Input
              handleInput={{
                type: "text",
                name: `degree-${index}`,
                placeholder: "Degree",
                value: education.degree,
                required: true,
              }}
            />

            <Label htmlFor={`institution-${index}`}>Institution</Label>
            <Input
              handleInput={{
                type: "text",
                name: `institution-${index}`,
                placeholder: "Institution",
                value: education.institution,
                required: true,
              }}
            />

            <Label htmlFor={`year-${index}`}>Year</Label>
            <Input
              handleInput={{
                type: "text",
                name: `year-${index}`,
                placeholder: "Year",
                value: education.year,
                required: true,
              }}
            />
          </div>
        ))}

        <GostButton onClick={handleAddLink} className="w-full">
          <CirclePlus />
          Add new degree
        </GostButton>

        <Button className="bg-gradient-to-tr from-blue-500 to-blue-800">
          Update
        </Button>
      </AppForm>
    </div>
  );
};

export default EducationForm;
