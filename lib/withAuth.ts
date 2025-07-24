import { User } from "@/app/models/User";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./verifyToken";

interface Options {
  allowedRoles?: string;
}


export const withAuth = async (
  request: NextRequest,
  options: Options
): Promise<
  { ok: true; token: unknown } | { ok: false; response: NextResponse }
> => {
  const token = (await cookies()).get("token")?.value as unknown as string;

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { message: "Not authorized" },
        { status: 401 }
      ),
    };
  }
    const veriFyToken = await verifyToken(token);

    if (!veriFyToken) {
      return {
        ok: false,
        response: NextResponse.json(
          { message: "Not authorized" },
          { status: 401 }
        ),
      };
    }

  const user = await User.findById(veriFyToken.id);

  console.log(user);
  
  if (options.allowedRoles !== user.role) {
    return {
      ok: false,
      response: NextResponse.json(
        { message: "Not authorized" },
        { status: 401 }
      ),
    };
  }

  return { ok: true, token };
};
