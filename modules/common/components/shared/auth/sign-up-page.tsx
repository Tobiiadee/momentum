"use client";

import React from "react";
import { Text } from "../../../ui/text";
import { Button } from "../../../ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import RegisterForm from "../../../../auth/register/register-form";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className='h-full w-full flex flex-col pt-2 '>
      <Button
        onClick={() => router.back()}
        variant={"ghost"}
        className='self-end mr-4 flex items-center space-x-2 w-max border border-transparent hover:bg-transparent hover:border-foreground'>
        <MoveLeft size={20} strokeWidth={1.5} />
        <Text variant={"p"}>Back</Text>
      </Button>
      <div className='self-center flex flex-col h-full w-full space-y-6 items-center mt-20 lg:mt-0 lg:justify-center'>
        <div className='flex flex-col space-y-4'>
          <Text variant={"h2"} className='font-normal text-center'>
            Create an account
          </Text>
          <Text variant={"p"} className='font-normal text-foreground/70'>
           Create your account to start using Momentum.
          </Text>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}