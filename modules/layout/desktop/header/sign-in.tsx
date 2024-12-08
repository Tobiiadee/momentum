"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignIn() {
  const { push } = useRouter();

  return (
    <Button
      onClick={() => push("/sign-in")}
      variant={"ghost"}
      className='border border-foreground rounded-2xl'>
      <Text variant={"p"} className='font-medium'>
        Sign In
      </Text>
    </Button>
  );
}
