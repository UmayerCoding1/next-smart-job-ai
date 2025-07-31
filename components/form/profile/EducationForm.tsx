"use client";
import React from "react";
import AppForm, { Input } from "../../shared/AppForm";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Button } from "@/components/ui/button";

const EducationForm = () => {
    const user =useSelector((state:RootState) => state.authR.user);
  const handleSubmit = (data: { [key: string]: string }) => {
    console.log(data)
  };

  console.log(user);
  return (
    <div>
      <AppForm submitFn={handleSubmit}>
        <div>
            <Label htmlFor="degree">Exam/Degree Title</Label>
            <Input handleInput={{type:"text", name:"degree", placeholder:"Exam/Degree", required:true}}/>
        </div>
        <div>
            <Label htmlFor="institution">Institution</Label>
            <Input handleInput={{type:"text", name:"institution", placeholder:"Institution", required:true}}/>
        </div>
        <div>
            <Label htmlFor="year">Year</Label>
            <Input handleInput={{type:"text", name:"year", placeholder:"Year", required:true}}/>
        </div>


        <Button className="bg-gradient-to-tr from-blue-500 to-blue-800">Update</Button>
      </AppForm>
    </div>
  );
};

export default EducationForm;
