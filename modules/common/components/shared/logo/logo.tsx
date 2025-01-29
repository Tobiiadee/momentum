import React from "react";
import { Text } from "../../../ui/text";
import { LogoSVGMobile } from "@/modules/assets/svgs";

export default function Logo() {
  return (
    <div className='flex items-center space-x-1'>
      <LogoSVGMobile />
      <Text variant={"h4"} className='font-semibold'>
        Momentum
      </Text>
    </div>
  );
}
