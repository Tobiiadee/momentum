"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";


export default function ThinkPlan() {

  const router = useRouter();

  return (
    <div className='relative w-full h-[80vh] rounded-t-2xl  grid place-items-center overflow-hidden border'>
      <div className='absolute w-full h-full overflow-hidden -z-10'>
        <Image
          src={"/background/squares.jpg"}
          alt={""}
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-col space-y-6'>
        <div className='flex flex-col space-y-1'>
          <Text variant={"h1"} className='font-normal text-center'>
            Think, Plan, and Track
          </Text>
          <Text
            variant={"h1"}
            className='font-normal text-center text-foreground/60'>
            all in one place
          </Text>
        </div>
        <Text variant={"p"} className='font-normal text-center '>
          Efficiently manage your task and boost productivity
        </Text>

        <Button onClick={() => router.push("/auth/onboarding")} variant={"default"} className='self-center'>
          Get Started
        </Button>
      </div>

      <div className='absolute top-6 right-10 w-20 aspect-square rounded-2xl shadow-2xl animate-scale grid place-items-center bg-background scale'>
        <div className='relative w-12 aspect-square rounded-lg overflow-hidden'>
          <Image
            src={"/images/clock.jpg"}
            alt={""}
            fill
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
}
