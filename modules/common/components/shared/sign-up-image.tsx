import Image from "next/image";
import React from "react";
import { Text } from "../../ui/text";

export default function SignUpImage() {
  return (
    <div className='relative hidden lg:block w-full h-full px-8 pt-10 overflow-hidden bg-foreground/5'>
      <div className='flex flex-col space-y-2'>
        <Text variant={"h2"} className='font-normal'>
          Think, Plan and Track
        </Text>
        <Text variant={"p"} className='font-normal'>
          Efficiently manage your task and boost productivity
        </Text>
      </div>

      <div className='absolute left-1/3 top-52 w-full h-1/2 rounded-3xl bg-foreground/5 p-3 overflow-hidden'>
        <div className='relative w-full h-full rounded-2xl overflow-hidden'>
          <Image
            src={"/images/momentum-w-g.png"}
            alt={""}
            fill
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
}
