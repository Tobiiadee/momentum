import { Text } from "@/modules/common/ui/text";
import React from "react";
import Solutions from "./solution-box";
import SolutionImage from "./solution-image";

export default function Solution() {
  return (
    <div className='w-full mt-20 py-8 flex flex-col space-y-14'>
      <div className='self-center w-28 h-10 rounded-2xl shadow grid place-items-center bg-background border'>
        <Text variant={"p"} className=''>
          Solutions
        </Text>
      </div>
      <div className='self-center w-max'>
        <Text variant={"h1"} className='font-normal text-center w-[16ch]'>
          Solve your team&apos;s biggest challenges
        </Text>
      </div>

      <Solutions />
      <SolutionImage />
    </div>
  );
}
