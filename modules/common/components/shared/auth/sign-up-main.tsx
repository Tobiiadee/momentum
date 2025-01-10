"use client";

import React from "react";
import SignUpPage from "./sign-up-page";
import SignUpImage from "./sign-up-image";
import EmailConfirmPage from "@/modules/auth/register/email-confirm-page";
import useUserStore from "@/modules/store/user-store";

export default function SignUpMain() {
  const userConfirmation = useUserStore((state) => state.userConfirmation);
  
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 h-full w-full'>
      <SignUpImage />
      {userConfirmation ? <EmailConfirmPage /> : <SignUpPage />}
      {/* <SignUpPage/> */}
    </div>
  );
}
