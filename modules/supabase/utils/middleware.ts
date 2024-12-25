// @/supabase/middleware.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create Supabase server client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            // secure: process.env.NODE_ENV === "production",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // Fetch the authenticated user
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  // Debug logs for testing
  console.log("Authenticated User:", user);
  console.log("Auth Error:", error);

  // Redirect unauthenticated users accessing /dashboard
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("Redirecting to /auth/login because user is not authenticated");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Avoid redirecting authenticated users if they're already on /dashboard
  if (user && request.nextUrl.pathname === "/") {
    console.log("Redirecting authenticated user to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow all other requests to proceed
  return response;
}
