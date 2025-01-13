// import { supabase } from "../supabase";
"use server";

import { createClient } from "./server";

export const signInWithGoogle = async (): Promise<void> => {
  const supabase = createClient();
  const { data, error } = await (
    await supabase
  ).auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `/dashboard`, // Redirect to the dashboard after sign-in
    },
  });

  if (error) {
    console.error("Google sign-in error:", error.message);
    throw error;
  }

  console.log("Google sign-in data:", data);
};
