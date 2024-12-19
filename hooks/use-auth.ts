import { supabase } from "@/modules/supabase/supabase";
import { useState } from "react";
import type { User, AuthError, PostgrestError } from "@supabase/supabase-js";

interface SignUpData {
  email: string;
  password: string;
  username: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null); // State to store user information
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<
    AuthError | PostgrestError | string | null
  >(null);

  const signInWithEmailPassword = async (email: string, password: string) => {
    setLoading(true);
    setUser(null);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);
      setLoading(false);
      setUser(data.user);
      setError(null);
      console.log("Sign-in successful:", data);
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Set the error message in the state
        console.error("Error signing in:", error.message);
      } else {
        setError("Unexpected error occurred");
      }
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw new Error(error.message);

      setUser(null); // Clear user state on sign-out
      console.log("Sign-out successful");
      
      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Set the error message in the state
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  const signUpWithUsername = async ({
    email,
    password,
    username,
  }: SignUpData) => {
    setLoading(true);
    setUser(null);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError);
        setLoading(false);
        throw new Error(authError.message);
      }

      const user = authData.user;
      if (!user) throw new Error("User not created.");

      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: user.id, username }]);

      if (profileError) {
        setError(profileError);
        setLoading(false);
        throw new Error(profileError.message);
      }

      console.log("Sign-up and profile creation successful!");
      setLoading(false);
      setUser(user); // Update user state
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Set the error message in the state
      } else {
        setError("Unexpected error occurred");
        console.error("Error during sign-up:", error);
      }
      setLoading(false);
    }
  };

  return {
    user,
    error,
    loading,
    signInWithEmailPassword,
    signOut,
    signUpWithUsername,
  };
};
