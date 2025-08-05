import { NextRequest, NextResponse } from "next/server";

interface JwtPayload {
  id: string;
  email: string;
  role?: string;
  exp?: number;
  iat?: number;
}

function decodeJWT(token: string): JwtPayload | null {
  try {
    const [headers, payload, ds] = token.split(".");
    if (!payload) throw new Error("Invalid JWT");

    const decoded = atob(
      payload
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(payload.length + ((4 - (payload.length % 4)) % 4), "=")
    );

    const jsonPayload: JwtPayload = JSON.parse(decoded);
    console.log("jsonPayload", token);
    return jsonPayload;
  } catch (err) {
    console.error("JWT Decode Error:", err);
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const protectedRoute = ["/dashboard", "/profile"];
  const protectedApi = ["/api/auth/loged-user", "/api/auth/resume"];

  const isProtectedRoute = protectedRoute.some((route) =>
    pathname.startsWith(route)
  );
  const isProtectedApi = protectedApi.some((api) => pathname.startsWith(api));

  if (isProtectedRoute || isProtectedApi) {
    if (!token) {
      if (isProtectedApi) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    const decoded = decodeJWT(token);
    console.log("decoded", decoded);
    if (!decoded || !decoded.id) {
      if (isProtectedApi) {
        return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/api/auth/loged-user",
    "/api/auth/resume",
    "/login",
  ],
};
