import { useEffect, useState } from "react";
import { supabase } from "@/modules/supabase/supabase";
import type { User, AuthError, PostgrestError } from "@supabase/supabase-js";

interface SignUpData {
  email: string;
  password: string;
  username: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<
    AuthError | PostgrestError | string | null
  >(null);

  // Initialize user session and listen for auth state changes
  useEffect(() => {
    setLoading(true);
    const initializeUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        setError(error.message);
      } else {
        setUser(session?.user || null);
      }
      setLoading(false);
    };

    initializeUser();

    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmailPassword = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);

      setUser(data.user);
      console.log("Sign-in successful:", data);
      window.location.href = "/dashboard";
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);

      setUser(null);
      console.log("Sign-out successful");
      window.location.href = "/auth/sign-in";
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Unexpected error occurred"
      );
    }
  };

  const signUpWithUsername = async ({
    email,
    password,
    username,
  }: SignUpData) => {
    setLoading(true);
    setError(null);

    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        throw new Error(authError.message);
      }

      const user = authData.user;
      if (!user) throw new Error("User not created.");

      // Insert additional profile data
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: user.id, username }]);

      if (profileError) {
        setError(profileError.message);
        throw new Error(profileError.message);
      }

      console.log("Sign-up and profile creation successful!");
      setUser(user);
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signInWithEmailPassword,
    signOut,
    signUpWithUsername,
  };
};
