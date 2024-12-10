import { Text } from "@/modules/common/ui/text";
import React from "react";
import HeaderNav from "./header-nav";
import SignInBtn from "./sign-in-btn";

export default function IntroHeader() {
  return (
    <div className='w-full py-3 px-6 flex justify-between items-center'>
      <div className='w-1/2 flex justify-between items-center'>
        <Text variant={"h4"} className="font-light">Momentum</Text>
        <HeaderNav />
      </div>
      <SignInBtn />
    </div>
  );
}
