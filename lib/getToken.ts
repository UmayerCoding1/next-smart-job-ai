import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const getUserId = async (request:NextRequest ) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  console.log(token);
  

  return token?.id;
};
