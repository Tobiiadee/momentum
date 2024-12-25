"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function EmailConfirmPage() {
  const router = useRouter();

  return (
    <div className='h-full w-full flex flex-col pt-2'>
      <Button
        onClick={() => router.back()}
        variant={"ghost"}
        className='self-end mr-4 flex items-center space-x-2 w-max border border-transparent hover:bg-transparent hover:border-foreground'>
        <MoveLeft size={20} strokeWidth={1.5} />
        <Text variant={"p"}>Back</Text>
      </Button>
      <div className='self-center flex flex-col h-full w-full space-y-6 items-center mt-32 lg:mt-0 lg:justify-center'>
        <div className='flex flex-col space-y-4'>
          <Text variant={"h2"} className='font-normal text-center'>
            Hi, we&apos;ve just sent you a confirmation email.
          </Text>
          <Text variant={"p"} className='font-normal text-foreground/70 text-center'>
            Please check your inbox and click the link to confirm your account.
          </Text>
        </div>
      </div>
    </div>
  );
}
