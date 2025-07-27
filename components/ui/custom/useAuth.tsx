"use client";

import { setUser } from "@/app/features/user/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UseAuth = () => {
  const dispatch = useDispatch();

 
  useEffect(() => {
    const handleLogdenUser = async () => {
      const res = await axios.get("/api/auth/loged-user", {
        withCredentials: true,
      });
      console.log(res.data.user);

      dispatch(setUser(res.data.user));
    };

    handleLogdenUser();
  }, [dispatch]);
  return null;
};

export default UseAuth;
