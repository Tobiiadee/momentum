import { Input } from "@/modules/common/ui/input";
import { Text } from "@/modules/common/ui/text";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import CallMethods from "./call-methods";

export default function CallLinks() {
  return (
    <div className='flex flex-col space-y-4 w-full bg-background py-4 px-4 rounded-lg'>
      <Text variant={"p"} className='font-medium border-b pb-2'>
        Add call links to your task
      </Text>
      <div className='relative flex items-center space-x-8'>
        <Input placeholder='Paste link here...' className='placeholder:text-xs' />
        <CallMethods />
      </div>
    </div>
  );
}

function CallLinksOption() {
  return (
    <div className='absolute right-2 top-1/2 -translate-y-1/2'>
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
