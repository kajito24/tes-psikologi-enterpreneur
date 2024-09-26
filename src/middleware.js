import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function middleware(request) {
  const nextUrl = request.nextUrl;
  const verifiedToken = await verifyAuth(request).catch(() => {});

  if (!verifiedToken) {
    if (nextUrl.pathname.startsWith("/api")) {
      // It's an api route
      return NextResponse.json(
        { error: { message: "Authentication required" } },
        { status: 401 }
      );
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!$|api/auth|api/expire|_next/static|_next/image).*)"],
};
