"use client";
import SignUp from "@/components/form/signUp";
import Image from "next/image";
import React from "react";

const loginPageImage = "/assets/login-form-image.jpg";
const Register = () => {
  return (
    <div className="flex  justify-between gap-3  lg:px-20 lg:py-2 ">
      <div className="w-full lg:w-1/2 p-5">
        <SignUp />
      </div>

      <div className="hidden lg:block w-1/2 relative">
        <Image
          src={loginPageImage}
          alt="login form image"
          width={800}
          height={800}
          className="w-full h-full ovject-cover absolute top-0 left-0 rounded-md"
        />
      </div>
    </div>
  );
};

export default Register;
