


import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");
  const { pathname } = req.nextUrl;

  // Add more detailed logging
  console.log(`User is trying to access: ${pathname}`);
  console.log(`Is login related: ${isLoginRelatedPath(pathname)}`);
  console.log(`Has token: ${!!token}`);

  // Check if it's a login related path
  if (isLoginRelatedPath(pathname)) {
    console.log("This is a login-related path");

    // If user is already authenticated and trying to access login page
    if (token) {
      console.log("User is authenticated, redirecting away from login");
      // Get the previous path from cookies if available
      const previousPath = req.cookies.get("previousPath")?.value;

      // Redirect authenticated users to their previous path or default to dashboard
      const redirectUrl = previousPath || "/admin-dashboard";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // Allow unauthenticated users to access login pages
    return NextResponse.next();
  }

  // For non-login protected routes - store the path and check authentication
  if (!isLoginRelatedPath(pathname)) {
    console.log("This is NOT a login-related path");

    // If no token and this is a protected route, redirect to login
    if (!token && isProtectedRoute(pathname)) {
      console.log("No token for protected route, redirecting to login");
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Store this path as previousPath in cookie for authenticated users
    if (token) {
      console.log("Storing path in cookie:", pathname);
      const response = NextResponse.next();
      response.cookies.set("previousPath", pathname, {
        path: "/",
        maxAge: 1, // 1 day
        httpOnly: true,
        sameSite: "strict",
      });
      return response;
    }
  }

  return NextResponse.next();
}

// Helper function to check if a route is protected
function isProtectedRoute(pathname) {
  const protectedPaths = [
    "/admin-dashboard",
    "/campaigns",
    "/exams",
    "/manage-clients",
    "/platform",
    "/quishing",
    "/account-info",
    "/settings",
    "/change-password",
    "/not-found",
  ];

  return protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

// Improved helper function for checking login-related paths
function isLoginRelatedPath(pathname) {
  // Normalize the pathname (remove trailing slash if present)
  const normalizedPath = pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  // Check exact paths
  if (
    normalizedPath === "/login" ||
    normalizedPath === "/login/two_factor_auth" ||
    normalizedPath === "/login/forgot_password" ||
    normalizedPath === "/change-password"
  ) {
    return true;
  }

  // Check if it's a child path under /login
  if (normalizedPath.startsWith("/login/")) {
    return true;
  }

  return false;
}

// Update matcher to include all necessary routes
export const config = {
  matcher: [
    "/login",
    "/login/:path*", // This will match all login-related paths
    "/admin-dashboard/:path*",
    "/campaigns/:path*",
    "/exams/:path*",
    "/manage-clients/:path*",
    "/account-info/:path*",
    "/platform/:path*",
    "/quishing/:path*",
    "/settings/:path*",
    "/not-found",
    "/change-password",
  ],
};