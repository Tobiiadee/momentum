// @/supabase/middleware.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Middleware function to update session and handle redirects
export async function updateSession(request: NextRequest) {
  // Initialize response with the current request headers
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
        // Function to get a cookie by name
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        // Function to set a cookie
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            secure: process.env.NODE_ENV === "production",
            ...options,
          });
          // Update the response with new headers after setting a cookie
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
        // Function to remove a cookie
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          // Update the response with new headers after removing a cookie
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

  // Debugging logs
  console.log("Authenticated User:", user);
  console.log("Auth Error:", error);

  // If there's an error fetching the user, log it
  if (error) {
    console.error("Error fetching user:", error.message);
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("Redirecting to /auth/login because user is not authenticated");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

 
  // Return the updated response
  return response;
}
