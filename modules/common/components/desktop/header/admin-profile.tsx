"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";

export default function AdminProfile() {
  const { signOut, user } = useAuth();

  console.log(user);
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileImage />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-5'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        {user && <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProfileImage() {
  return (
    <div className='relative rounded-full w-8 aspect-square flex items-center justify-center overflow-hidden'>
      <Image
        src={"/images/img2.jpg"}
        alt='avatar'
        fill
        className='object-cover'
      />
    </div>
  );
}
