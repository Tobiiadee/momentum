"use client";

import React from "react";
import LoginForm from "../../../../auth/login/login-form";
import { Text } from "../../../ui/text";
import { Button } from "../../../ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className='h-full w-full flex flex-col pt-2 '>
      <Button
        onClick={() => router.back()}
        variant={"ghost"}
        className='self-end flex items-center space-x-2 w-max border border-transparent hover:bg-transparent hover:border-foreground'>
        <MoveLeft size={20} strokeWidth={1.5} />
        <Text variant={"p"}>Back</Text>
      </Button>
      <div className='self-center flex flex-col h-full w-full space-y-6 items-center mt-32 lg:mt-0 lg:justify-center'>
        <div className='flex flex-col space-y-4'>
          <Text variant={"h2"} className='font-normal text-center'>
            Welcome back
          </Text>
          <Text variant={"p"} className='font-normal text-foreground/70'>
            Welcome back! Please enter your details.
          </Text>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}


