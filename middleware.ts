import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";

function decodeJWT(token: string): JwtPayload | null {
  try {
    const [headers, payload, signature] = token.split(".");
    if (!payload) throw new Error("Invalid JWT");

    const decoded = atob(
      payload
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(payload.length + ((4 - (payload.length % 4)) % 4), "=")
    );

    return JSON.parse(decoded);
  } catch (err) {
    console.error("JWT Decode Error:", err);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/dashboard", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const decoded = decodeJWT(token);

  if (!decoded?.id) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp <= currentTime) {
    console.warn("JWT Token expired");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const role = decoded.role;

    if (pathname.startsWith("/dashboard")) {
      if (
        (role === "jobseeker" &&
          !pathname.startsWith("/dashboard/jobseeker")) ||
        (role === "recruiter" &&
          !pathname.startsWith("/dashboard/recruiter")) ||
        (role === "admin" && !pathname.startsWith("/dashboard/admin"))
      ) {
        return new NextResponse("Forbidden: Role not authorized", {
          status: 403,
        });
      }
    }

    return NextResponse.next(); // ✅ Everything OK
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
