import ForgotPasswordClient from "@/modules/auth/forgot-password/forgot-passowrd-client";
import SignInMain from "@/modules/common/components/shared/auth/sign-in-main";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Momentum | Login",
  description: "Login to your account to start your Momentum journey.",
};

export default function Index() {
  return (
    <div className='relative h-screen'>
      <SignInMain />
      <ForgotPasswordClient />
    </div>
  );
}
