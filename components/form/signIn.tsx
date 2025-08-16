"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import PrimaryButton from "@/components/button/PrimaryButton";
import Sociallogin from "@/components/action/Sociallogin";
import { motion } from "motion/react";
import Link from "next/link";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/features/user/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { iDBUserData } from "@/lib/types";
import { Button } from "../ui/button";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const MotionButton = motion(PrimaryButton);

type SignUpForm = z.infer<typeof signUpSchema>;

const SignIN = ({ popup, setPopup,idbUserData }: { popup: boolean; setPopup: React.Dispatch<React.SetStateAction<boolean>>;idbUserData:iDBUserData[]}) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });



  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/login", data);
      console.log(res.data);

      if (res.data.success) {
        localStorage.removeItem("unverifyed_user_traits");
        dispatch(setUser(res.data.user));
        toast.success("Login successfully", { duration: 1000 });
        setIsLoading(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed! Please try again", { duration: 1500 });
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className=" h-[400px] relative">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl mb-10 font-semibold text-center">
          Login Form <span className="text-blue-500">SmartJobAI</span>
        </h2>

        <Sociallogin />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-5">
          {/* Email Field */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Example: user@example.com"
              className="h-12"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="h-12 pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-7.5 text-gray-600"
            >
              {showPassword ? <EyeClosed size={15} /> : <Eye size={15} />}
            </button>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <MotionButton
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={15} />
            ) : (
              "Login"
            )}
          </MotionButton>

          <p className="text-sm text-gray-600 text-center">
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="text-blue-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {popup && idbUserData.length > 0 && (
        <div className="absolute -top-10 left-0 w-full h-[430px] bg-black/30 flex items-center justify-center">
          <div className="bg-white p-3 rounded-md w-[500px]">
            <h2 className="text-2xl font-medium">
              Hi, {idbUserData.length ? idbUserData[0].name : "Guest"}
            </h2>
            <p className="text-sm font-medium text-black/70">
              You have already an account , can you login previous account?
            </p>

            <div className="mt-10 ">
              {idbUserData.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded-lg gap-2 my-2"
                >
                  <div className="flex items-center  gap-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <p className="text-lg font-medium">
                        {user.name.split("")[0]}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-sm font-medium">{user.email}</p>
                    </div>
                  </div>

                  <PrimaryButton className="px-5 py-0">Login</PrimaryButton>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end mt-4 gap-2">
              <Button variant={"destructive"} onClick={() => setPopup(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIN;
