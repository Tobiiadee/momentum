

import ForgotPasswordClient from "@/modules/auth/forgot-password/forgot-passowrd-client";
import SignInMain from "@/modules/common/components/shared/sign-in-main";
import React from "react";

export default function Index() {
  return (
    <div className='relative h-screen'>
      <SignInMain /> 
      <ForgotPasswordClient />
    </div>
  );
}
