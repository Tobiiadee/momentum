import React from "react";
import SignInPage from "./sign-in-page";
import SignInImage from "./sign-in-image";

export default function SignInMain() {
  return (
    <div className='grid grid-cols-2 h-full w-full'>
      <SignInPage />
      <SignInImage/>
    </div>
  );
}
