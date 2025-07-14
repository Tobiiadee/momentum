// app/actions.ts
"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "./admin";

export async function deleteUserAccount() {
  // Get the cookie store
  const cookieStore = await cookies();

  // Initialize Supabase client with cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error("Error setting cookie:", error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.error("Error removing cookie:", error);
          }
        },
      },
    }
  );

  try {
    // Debug: Log the auth cookie
    const authCookie = cookieStore.get("sb-sszfkjhhhrlgppwepmlv-auth-token");
    console.log("Auth Cookie:", authCookie?.value);

    // 1. Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Auth Error:", userError?.message || "No user found");
      return { error: "User not found or you are not logged in." };
    }

    // 2. Use the admin client to delete the user
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      user.id
    );

    if (deleteError) {
      console.error("Error deleting user:", deleteError.message);
      return { error: "Failed to delete your account. Please try again." };
    }

    console.log("User deleted successfully:", user.id);

    // 3. Sign out the user to clear the session
    await supabase.auth.signOut();

    // 4. Clear the Supabase auth cookie explicitly
    try {
      cookieStore.delete("sb-sszfkjhhhrlgppwepmlv-auth-token");
    } catch (error) {
      console.error("Error deleting auth cookie:", error);
    }

    // 5. Revalidate the path and redirect
    revalidatePath("/");
    redirect("/auth/create-account");
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}