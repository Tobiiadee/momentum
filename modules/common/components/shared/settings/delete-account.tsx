
"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import useUserStore from "@/modules/store/user-store";
import React from "react";

export default function DeleteAccount() {
  const setIsDeleteAccount = useUserStore((state) => state.setIsDeleteAccount);

 

  return (
    <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between border border-red-500 rounded-lg p-4 w-full md:w-[80%] shadow'>
      <div className='flex flex-col'>
        <Text variant={"p"} className='font-medium text-red-600'>
          Delete Account
        </Text>
        <Text variant={"p"} className='text-foreground/70 text-xs'>
          Once you delete your account, there is no going back. Please be
          certain.
        </Text>
      </div>
      <Button
        onClick={() => setIsDeleteAccount(true)}
        aria-label='Delete Account'
        variant={"ghost"}
        className='flex items-center  shadow hover:bg-transparent border border-red-600 text-red-600 hover:text-red-600'>
        <Text variant={"p"} className='font-medium'>
          Delete account
        </Text>
      </Button>
    </div>
  );
}
