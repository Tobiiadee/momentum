import React from "react";
import { Text } from "../../../ui/text";
import { LogoSVG } from "@/modules/assets/svgs";

export default function Logo() {
  return (
    <div className='flex items-center space-x-1'>
      <LogoSVG />
      <Text variant={"h4"} className='font-semibold'>
        Momentum
      </Text>
    </div>
  );
}
