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

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const MotionButton = motion(PrimaryButton);

type SignUpForm = z.infer<typeof signUpSchema>;

const SignIN = () => {
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
        toast.success("Login successfully", {duration: 1000});
        setIsLoading(false);
        router.push("/");
     }
    } catch (error) {
        console.log(error);
        toast.error( 'Login failed! Please try again', {duration: 1500});
    }
    finally {
        setIsLoading(false);
    }
  };

  return (
    <div className=" h-[400px]">
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
            {isLoading ? <Loader2 className="animate-spin"  size={15}/> : "Login"}
          </MotionButton>

          <p className="text-sm text-gray-600 text-center">
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="text-blue-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIN;
