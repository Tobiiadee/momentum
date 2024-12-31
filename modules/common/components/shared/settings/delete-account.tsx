import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import React from "react";

export default function DeleteAccount() {
  return (
    <div className='flex items-center justify-between border border-red-500 rounded-lg p-4 w-[80%] shadow'>
      <div className='flex flex-col'>
        <Text variant={"p"} className='font-medium'>
          Delete Account
        </Text>
        <Text variant={"p"} className='text-foreground/70 text-xs'>
          Once you delete your account, there is no going back. Please be
          certain.
        </Text>
      </div>
      <Button
        variant={"ghost"}
        className='flex items-center  shadow hover:bg-transparent border border-red-600 text-red-600 hover:text-red-600'>
        <Text variant={"p"} className='font-medium'>
          Delete account
        </Text>
      </Button>
    </div>
  );
}
