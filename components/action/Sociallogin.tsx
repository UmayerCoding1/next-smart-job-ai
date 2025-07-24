import React from "react";
import { Button } from "../ui/button";
import GoogleIcon from "../custom-icon/GoogleIcon";
import { Github } from "lucide-react";

const Sociallogin = () => {
  return (
    <div className="flex flex-col gap-2 w-full my-5">
        <p className="text-center text-sm text-gray-600 font-medium">Sign in with</p>
      <div className="flex items-center justify-center  gap-3 w-full">
        <Button variant={"ghost"} className=" border active:scale-105">
          <Github/>
          <span>Continue with Github</span>
        </Button>
        <Button variant={"ghost"} className=" border active:scale-105">
          <GoogleIcon />
          <span>Continue with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default Sociallogin;
