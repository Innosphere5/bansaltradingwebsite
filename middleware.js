import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_SECRET = process.env.SESSION_SECRET || "bansal_trading_karyana_super_secure_session_secret_key_2026_nextjs";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Retrieve the session cookie
  const sessionCookie = request.cookies.get("session")?.value;
  let isAuthenticated = false;

  if (sessionCookie) {
    try {
      // Verify the session JWT locally in Edge environment using jose
      const secret = new TextEncoder().encode(SESSION_SECRET);
      await jwtVerify(sessionCookie, secret);
      isAuthenticated = true;
    } catch (error) {
      console.error("Middleware JWT verification failed:", error.message);
      // If token is invalid or expired, proceed to clear it and redirect to login
      isAuthenticated = false;
    }
  }

  // Define protected pages
  const isProtectedPath = pathname.startsWith("/orders") || pathname.startsWith("/cart");
  const isLoginPage = pathname === "/login";

  if (isProtectedPath && !isAuthenticated) {
    // Redirect unauthenticated user to login, preserving the path they were trying to access
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    
    const response = NextResponse.redirect(loginUrl);
    // Proactively clear invalid cookies
    if (sessionCookie) {
      response.cookies.delete("session");
    }
    return response;
  }

  if (isLoginPage && isAuthenticated) {
    // Authenticated user should not be able to visit login page, redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Optimization: limit middleware execution only to the routes requiring authentication checks
export const config = {
  matcher: [
    "/orders/:path*",
    "/cart/:path*",
    "/login",
  ],
};
