import SignUpMain from "@/modules/common/components/shared/auth/sign-up-main";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Momentum | Create Account",
  description: "Create an account to start your Momentum journey.",
};

export default function Index() {
  return (
    <div className='h-screen'>
      <SignUpMain />
    </div>
  );
}
