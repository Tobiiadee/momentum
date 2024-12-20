import { useEffect, useState } from "react";
import { supabase } from "@/modules/supabase/supabase";
import type { User, AuthError, PostgrestError } from "@supabase/supabase-js";
import { createAccount, login, logout, signInWithGoogle } from "@/modules/auth/actions";

interface SignUpData {
  email: string;
  password: string;
  username: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<
    AuthError | PostgrestError | string | null
  >(null);

  // Initialize user session and listen for auth state changes
  useEffect(() => {
    setIsSubmitting(true);
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
      setIsSubmitting(false);
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
    setIsSubmitting(true);
    setError(null);

    const error = await login({ email, password });
    if (error) setError(error);
    setIsSubmitting(false);
  };

  const signOut = async () => {
    setIsSubmitting(true);
    setError(null);
    await logout();
    setIsSubmitting(false);
  };

  const signUpWithUsername = async ({
    email,
    password,
    username,
  }: SignUpData) => {
    setIsSubmitting(true);
    setError(null);
    const error = await createAccount({
      values: { email, password },
      username,
    });
    if (error) setError(error);
    setIsSubmitting(false);
  };

  const googleSignIn = async () => {
    setIsSubmitting(true);
    setError(null);

    await signInWithGoogle();
    // if (error) setError(error);
    setIsSubmitting(false);
  };

  return {
    user,
    loading: isSubmitting,
    error,
    signInWithEmailPassword,
    signOut,
    signUpWithUsername,
    googleSignIn
  };
};
