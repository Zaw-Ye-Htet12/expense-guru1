import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { getMobileRoute, isAPIRoute, isMobile, isMobileRoute } from "./lib/route";
import { usePathname, useSearchParams } from "next/navigation";
import { DESKTOP_HOME_PAGE, MOBILE_HOME_PAGE } from "./constants/route";
import { Route } from "./enums/route";

const publicPaths = [
  "/",
  "/mobile",
  "/login",
  "/signup",
  "/welcome",
  "/forgot-password",
  "/mobile/login",
  "/mobile/signup",
  "/mobile/welcome",
  "/mobile/forgot-password"
];

const redirectTo = (url: string, req: NextRequest) => {
  return NextResponse.redirect(new URL(url, req.url));
};

export default async function middleware(req: NextRequest) {
  const {pathname,searchParams} = new URL(req.url);
  const userAgent = req.headers.get("user-agent") ?? "";

  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const isMobileDevice = isMobile(userAgent);
  const token = req.cookies.get("refreshToken")?.value ?? "";
  const isPubliPath = publicPaths.includes(pathname);

  if (!isAPIRoute(pathname) && !pathname.includes("auth")) {
    if (isMobileDevice && !isMobileRoute(pathname)) {
      return redirectTo(MOBILE_HOME_PAGE, req);
    } else if (!isMobileDevice && isMobileRoute(pathname)) {
      return redirectTo(DESKTOP_HOME_PAGE, req);
    }
  }

  if(isPubliPath && token){
    const redirectPath = `${
      isMobileDevice ? getMobileRoute(Route.HOME) : Route.HOME
    }`;
    return redirectTo(redirectPath,req);
  }
  if(!token && !isPubliPath && !isAPIRoute(pathname)){
    if(pathname.includes('reset-password')){
      const token = searchParams.get("token");
      if (!token) {
        return redirectTo(Route.LOGIN, req);
      }
      return NextResponse.next();
    }
    if(pathname === MOBILE_HOME_PAGE || pathname === DESKTOP_HOME_PAGE){
      return NextResponse.next();
    }
    const redirectPath = `${
      isMobileDevice ? getMobileRoute(Route.LOGIN) : Route.LOGIN
    }`
    return redirectTo(redirectPath,req);
  }

  return NextResponse.next();
}
