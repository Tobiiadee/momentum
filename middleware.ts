// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const supabase = createMiddlewareClient({ req, res: NextResponse.next() });

  // Check if the user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes
  const PROTECTED_ROUTES = ["/dashboard", "/profile", "/settings"];

  // If the user is not authenticated and the route is protected, redirect
  if (!session && PROTECTED_ROUTES.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const signInUrl = new URL("/auth/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
