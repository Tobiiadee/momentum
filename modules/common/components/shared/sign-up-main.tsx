import React from "react";
import SignUpPage from "./sign-up-page";
import SignUpImage from "./sign-up-image";

export default function SignUpMain() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 h-full w-full'>
      <SignUpImage />
      <SignUpPage />
    </div>
  );
}
