"use client";

import { setUser } from "@/app/features/user/userSlice";
import axios from "axios";
import { LogOut } from "lucide-react";

import React from "react";
import { useDispatch } from "react-redux";

interface LogoutProps {
    children: React.ReactNode;

}

const Logout = ({ children}: LogoutProps) => {
  const dispatch = useDispatch();
   const handleLogOut = async () => {
    try {
      const res = await axios.post("/api/auth/logout", {
        withCredentials: true,
      });

      if (res.data.message) {
        dispatch(setUser(null));
        // router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={() => handleLogOut()} className="cursor-pointer w-full h-full flex items-center justify-between bg-red-500 p-2 rounded-lg text-white text-sm">{children} <LogOut size={13}/></button>;
};

export default Logout;
