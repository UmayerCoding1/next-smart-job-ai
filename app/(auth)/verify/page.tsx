"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import PrimaryButton from "@/components/button/PrimaryButton";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const OtpImage = "/assets/otp.png";
const VerifyPage = () => {
  const [signUpEmail, setSignUpEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpResendTimer, setOtpResendTimer] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("unverifyed_user_traits");
    setSignUpEmail(email);
  }, []);

  useEffect(() => {
    if (!signUpEmail) return;

    const handleUserVerify = async () => {
      try {
      
          const res = await axios.post("/api/auth/send-otp", {
            email: signUpEmail,
          });
          console.log(res.data);
          if (res.data.success) {
            setOtpResendTimer(120);
          }
      } catch (error) {
        console.log(error);
      }
    };

    handleUserVerify();
  }, [signUpEmail]);

  useEffect(() => {
    if (otpResendTimer <= 0) return;

    const interval = setTimeout(() => {
      setOtpResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpResendTimer]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      setOtpResendTimer(120);
      const res = await axios.put("/api/auth/verify-otp", {
        otp: Number(otp),
        email: signUpEmail,
      });
      console.log(res.data);
      if (res.data.success) {
        localStorage.removeItem("unverifyed_user_traits");
        router.push("/login");

      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await axios.post("/api/auth/resend-otp", {
        email: signUpEmail,
      });
      console.log(res.data);
      if (res.data.success) {
        setOtpResendTimer(120);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-20">
      <div className=" flex items-center justify-center shadow-2xl p-5">
        <Image
          src={OtpImage}
          alt="otp image"
          width={800}
          height={800}
          className="lg:w-1/3"
        />
        <div className="w-full lg:w-1/2 p-5  flex items-center justify-center flex-col gap-5">
          <div className="text-center flex flex-col gap-1">
            <h2 className="text-3xl font-medium">OTP Verification</h2>
            <p className="text-sm text-gray-500">OTP send to {signUpEmail}</p>
            <p>
              Thank you for registering with you. Please type the OPT as shared
              on your Gmail
            </p>
          </div>

          <div className="mt-4 flex items-center flex-col p-4">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              onChange={(e) => setOtp(e)}
              className="w-full"
            >
              <InputOTPGroup>
                <InputOTPSlot className="h-16 w-16" index={0} />
                <InputOTPSlot className="h-16 w-16" index={1} />
                <InputOTPSlot className="h-16 w-16" index={2} />
                <InputOTPSlot className="h-16 w-16" index={3} />
                <InputOTPSlot className="h-16 w-16" index={4} />
                <InputOTPSlot className="h-16 w-16" index={5} />
              </InputOTPGroup>
            </InputOTP>

            <PrimaryButton
              onClick={() => handleVerify()}
              disabled={otp.length !== 6}
              className="mt-4 px-4 py-4 w-40 h-10"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Verify"}
            </PrimaryButton>
          </div>

          <p>
            OTP not received?{" "}
            {otpResendTimer > 0 ? (
              <span className="text-blue-500 font-semibold cursor-pointer">
                {formatTime(otpResendTimer)}
              </span>
            ) : (
              <span onClick={() => handleResendOtp()} className="text-blue-500 font-semibold cursor-pointer">
                Resend
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
