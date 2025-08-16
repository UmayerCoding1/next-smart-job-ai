"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PrimaryButton from "../button/PrimaryButton";
import { CircleArrowRight, Eye, EyeClosed, Loader2 } from "lucide-react";
import Link from "next/link";
import Sociallogin from "../action/Sociallogin";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addUserIDB } from "@/utils/indexedDB";
import bcrypt from "bcryptjs";

const logo = "/assets/logo.png";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must include at least one special character"
      ),
    confirmPassword: z.string(),
    role: z.enum(["jobseeker", "recruiter"]).refine((val) => !!val, {
      message: "Role is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const iIdNumber = Math.floor(Math.random() * 1000000);
  const now = new Date();
  const secound = Math.floor(now.getTime() / 1000);
  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      setIsLoading(true);
      const signUpData = {
        fullname: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role,
        loginMethod: "custom",
        username: data.username,
      };
      const res = await axios.post("/api/auth/register", signUpData);

      if (res.data.success) {
        toast.success("Account created successfully");
        if (!res.data.user.isOtpVerified) {
          await addUserIDB({
            iid: `SJAIID${iIdNumber}`,
            id: res.data.user._id,
            name: res.data.user.fullname,
            email: res.data.user.email,
            password: await bcrypt.hash(data.password, 10),
            createdAt: secound,
          }); // store user id in indexedDB
          setIsLoading(false);
          localStorage.setItem("unverifyed_user_traits", res.data.user.email);
          router.push("/verify");
        } else {
          setIsLoading(false);
          router.push("/login");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <Image src={logo} alt="Logo" width={400} height={400} className="w-40" />

      <h2 className="text-3xl font-bold mt-5">Create Account</h2>

      <Sociallogin />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-t border-gray-300 mt-3 w-full max-w-xl py-5 lg:px- flex flex-col gap-5"
      >
        {/* First & Last Name */}
        <section className="flex flex-col lg:flex-row gap-5 w-full">
          <div className="w-full">
            <Label>First Name</Label>
            <Input
              placeholder="First Name"
              className="h-12"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="w-full">
            <Label>Last Name</Label>
            <Input
              placeholder="Last Name"
              className="h-12"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </section>

        {/* User name */}
        <div>
          <Label>User Name</Label>
          <Input
            type="text"
            placeholder="User Name"
            className="h-12"
            {...register("username")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Example: user@example.com"
            className="h-12"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <Label>Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-12"
            {...register("password")}
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye
                size={15}
                className="absolute right-2 top-10 transform -translate-y-1/2  text-gray-600"
              />
            ) : (
              <EyeClosed
                size={15}
                className="absolute right-2 top-10 transform -translate-y-1/2 text-gray-600"
              />
            )}
          </button>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Label>Retype Password</Label>
          <Input
            type="password"
            placeholder="Confirm Password"
            className="h-12"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <Label>Role</Label>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="jobseeker">Jobseeker</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        {/* Submit */}
        {isLoading ? (
          <PrimaryButton>
            <Loader2 className="animate-spin" />
          </PrimaryButton>
        ) : (
          <PrimaryButton Icon={CircleArrowRight} iconPosition="right">
            Sign Up
          </PrimaryButton>
        )}
        {/* Footer */}
        <p className="text-center font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

        <p className="text-left text-sm text-gray-500">
          By clicking &quot;Create Account/Google&quot; above, you acknowledge
          that you have read and understood, and agree to SmartJobAi{" "}
          <Link
            href="/terms&conditions"
            className="border-b hover:text-blue-500 border-black hover:border-blue-500 pr-2"
          >
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="border-b border-black hover:text-blue-500 hover:border-blue-500"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default SignUp;
