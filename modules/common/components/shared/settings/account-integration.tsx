"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { Plus } from "lucide-react";
import React from "react";

export default function AccountIntegration() {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <Text variant={"p"} className='font-medium'>
            Integrate Accounts
          </Text>
          <Text
            variant={"p"}
            className='font-normal text-foreground/70 text-xs'>
            Manage and connect your accounts
          </Text>
        </div>

        <Button variant={"ghost"} className='flex items-center'>
          <Plus size={24} strokeWidth={1.5} />
          <Text variant={"p"}>Add Account</Text>
        </Button>
      </div>

      <div className='flex flex-col space-y-2'>
        <AccountIntegrationItem />
        {/* <AccountIntegrationItem /> */}
      </div>
    </div>
  );
}

function AccountIntegrationItem() {
  const [isConnected, setIsConnected] = React.useState(false);

  return (
    <div className='flex items-center justify-between border border-foreground/10 rounded-lg p-2 space-y-2 w-full md:w-[80%] shadow'>
      <div className='flex space-x-4 items-center'>
        <div className='w-12 aspect-square rounded-md shadow'></div>
        <div className='flex flex-col'>
          <Text variant={"p"} className='font-medium'>
            Twitter
          </Text>
          <Text variant={"p"} className='text-foreground/70 text-xs'>
            Connect your Twitter account
          </Text>
        </div>
      </div>

      {isConnected ? (
        <Button
          onClick={() => setIsConnected(!isConnected)}
          variant={"ghost"}
          className='flex items-center  shadow hover:bg-transparent border border-green-600 text-green-600 hover:text-green-600'>
          <Text variant={"p"} className='font-medium'>
            Connected
          </Text>
        </Button>
      ) : (
        <Button
          onClick={() => setIsConnected(!isConnected)}
          variant={"ghost"}
          className='flex items-center shadow hover:bg-transparent border '>
          <Text variant={"p"} className='font-medium'>
            Disconnected
          </Text>
        </Button>
      )}
    </div>
  );
}
