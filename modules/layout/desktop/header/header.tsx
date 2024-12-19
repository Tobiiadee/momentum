import React from "react";
import HeaderNav from "./header-nav";
import SignInBtn from "./sign-in-btn";
import Logo from "@/modules/common/components/shared/logo";

export default function IntroHeader() {
  return (
    <div className='w-full py-3 px-6 flex justify-between items-center'>
      <div className='w-1/2 flex justify-between items-center'>
        <Logo/>
        <HeaderNav />
      </div>
      <SignInBtn />
    </div>
  );
}
