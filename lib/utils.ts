import bcrypt from "bcryptjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const veridedPassword = async (
  plainPassword: string,
  hasedPassword: string
) => {
  try {
    return await bcrypt.compare(plainPassword, hasedPassword);
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmail = async (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValidEmail = emailRegex.test(email);
  if (!isValidEmail) return false;

  const domain = email.split("@")[1];
  if (domain !== "gmail.com") {
    return false;
  }

  const hasNumberInDomain = /\d/.test(domain);
  if (hasNumberInDomain) return false;
  return true;
};



