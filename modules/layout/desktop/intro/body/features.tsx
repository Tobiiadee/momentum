import { Text } from "@/modules/common/ui/text";
import React from "react";

export default function Features() {
  return (
    <div className='w-full min-h-screen mt-20 py-8 flex flex-col space-y-14 border rounded-t-3xl bg-foreground/5'>
      <div className='self-center w-28 h-10 rounded-2xl shadow grid place-items-center bg-background border'>
        <Text variant={"p"} className=''>
          Fetures
        </Text>
      </div>

      <div className='self-center w-max flex flex-col space-y-4'>
        <Text variant={"h1"} className='font-normal text-center'>
          Keep everything in one place
        </Text>
        <Text variant={"p"} className='font-normal text-center text-foreground/70'>
          Forget complex tools and focus on what matters most
        </Text>
      </div>
    </div>
  );
}
