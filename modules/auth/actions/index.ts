"use server";

import { createClient } from "@/modules/supabase/utils/server";
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(
  values: SignInWithPasswordCredentials
): Promise<string | never> {
  const supabase = createClient();
  const { data, error } = await (
    await supabase
  ).auth.signInWithPassword(values);
  if (!!error || !data?.user.email)
    return error?.message || "Invalid email or password";

  revalidatePath("/dashboard", "layout");
  return redirect("/dashboard");
}

interface SignUpData {
  username: string;
  values: SignUpWithPasswordCredentials;
}

export async function createAccount({
  values,
  username,
}: SignUpData): Promise<string | never> {
  const supabase = createClient();
  const { data, error } = await (await supabase).auth.signUp(values);
  if (!!error || !data?.user?.email)
    return error?.message || "Invalid email or password";

  const user = data.user;

  // Insert additional profile data
  const { error: profileError } = await (await supabase)
    .from("users")
    .insert([{ id: user.id, username }]);

  if (profileError) return profileError.message;

  revalidatePath("/dashboard", "layout");
  return redirect("/dashboard");
}

export async function logout(): Promise<string | never> {
  const supabase = createClient();
  const { error } = await (await supabase).auth.signOut();
  if (!!error) return error?.message || "Error logging out";

  revalidatePath("/dashboard", "layout");
  return redirect("/auth/login");
}

export const signInWithGoogle = async () => {
  console.log("signInWithGoogle");

  // const supabase = createClient();
  // const { error } = await (
  //   await supabase
  // ).auth.signInWithOAuth({
  //   provider: "google",
  //   options: {
  //     redirectTo: `/dashboard`, // Redirect to the dashboard after sign-in
  //   },
  // });

  // if (!!error) {
  //   return error?.message || "Invalid email or password";
  // }

  // revalidatePath("/dashboard", "layout");
  // return redirect("/auth/login");
};

//Reset Password
export async function resetPassword(email: string) {
  const supabase = createClient();

  // Request a password reset email
  const { data, error } = await (
    await supabase
  ).auth.resetPasswordForEmail(email);

  if (error) {
    console.error("Error sending password reset email:", error.message);
  } else {
    console.log("Password reset email sent:", data);
  }

  return data;
}

export async function updatePassword(newPassword: string) {
  const supabase = createClient();

  // After the user clicks the link in the email, they will be directed to a page where they can set a new password
  const { data, error: updateError } = await (
    await supabase
  ).auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    console.error("Error updating password:", updateError.message);
  } else {
    console.log("Password updated successfully:", data);
  }

  return data;
}
