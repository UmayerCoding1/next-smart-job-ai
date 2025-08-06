"use client";
import React from "react";
import AppForm, { Input } from "../../shared/AppForm";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

 export interface Accountdata {
  fullname:string,
  phone:string,
  email:string,
  about:string
 }

const AccountSettingForm = () => {
   const user =useSelector((state:RootState) => state.authR.user);

   const firstName = user?.fullname.split(" ")[0];
   const lastName = user?.fullname.split(" ")[1];

   const handleSubmit =async (data: { [key: string]: string }) => {
    console.log('data', data);

    try {
      const accountUpdateData: Accountdata = {
        fullname: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        email: data.email,
        about: data.about
      };
      const res =await axios.put(`/api/auth/${user?.username}`, accountUpdateData);
      if (res.data.success) {
        toast.success("Account updated successfully", { duration: 1500 });
      }
    } catch (error) {
      console.log(error);
    }
   }
  return (
    <div>
      <AppForm submitFn={handleSubmit}>
        <div className="flex flex-col  lg:flex-row gap-5">
          {/* first name */}
          <div className="w-full">
            <Label htmlFor="firstName">Frist Name</Label>
            <Input handleInput={{type:"text", name:"firstName", placeholder:"Frist Name", value:firstName }}/>
          </div>

          {/* last name */}
          <div className="w-full">
            <Label htmlFor="lastName">Last Name</Label>
             <Input handleInput={{type:"text", name:"lastName", placeholder:"Last Name", value:lastName}}/>
          </div>
        </div>

        <div className="flex flex-col  lg:flex-row gap-5">
          {/* phome */}
          <div className="w-full">
            <Label htmlFor="phone">Phone</Label>
             <Input handleInput={{type:"text", name:"phone", placeholder:"Ex: 01XXXXXXXXX", value:user?.phone}}/>
          </div>

          {/* email */}
          <div className="w-full">
            <Label htmlFor="lastName">Email</Label>
             <Input handleInput={{type:"email", name:"email", placeholder:"Ex: uUHq2@example.com", value:user?.email}}/>
          </div>
        </div>

        {/* About */}
        <div className="w-full">
          <Label htmlFor="about">About</Label>
          <Input handleInput={{type:"textarea", name:"about", placeholder:"Enter yourself", value:user?.about }}/>
        </div>

        <Button className="bg-gradient-to-tr from-blue-500 to-blue-800">Update</Button>
      </AppForm>
    </div>
  );
};

export default AccountSettingForm;
