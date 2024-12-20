// import { supabase } from "../supabase";
"use server";

import { createClient } from "./server";

// interface SignUpData {
//   email: string;
//   password: string;
//   username: string;
// }

// export const signUpWithUsername = async ({
//   email,
//   password,
//   username,
// }: SignUpData): Promise<void> => {
//   try {
//     // Sign up the user
//     const { data: authData, error: authError } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (authError) throw new Error(authError.message);

//     const user = authData.user;
//     if (!user) throw new Error("User not created.");

//     // Insert username into the profiles table
//     const { error: profileError } = await supabase
//       .from("profiles")
//       .insert([{ id: user.id, username }]);

//     if (profileError) throw new Error(profileError.message);

//     console.log("Sign-up and profile creation successful!");
//   } catch (error) {
//     console.error("Error during sign-up:", error);
//     throw error;
//   }
// };

// export const signIn = async (
//   email: string,
//   password: string
// ): Promise<void> => {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     console.error("Error signing in:", error.message);
//     throw error;
//   }

//   console.log("Sign-in successful:", data);

//   // Perform manual redirection
//   window.location.href = "/dashboard";
// };

// export const signOut = async (): Promise<void> => {
//   const { error } = await supabase.auth.signOut();

//   if (error) {
//     console.error("Error signing out:", error.message);
//     throw error;
//   }

//   console.log("Sign-out successful");
// };

export const signInWithGoogle = async (): Promise<void> => {
  const supabase = createClient();
  const { data, error } = await (await supabase).auth.signInWithOAuth({
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
