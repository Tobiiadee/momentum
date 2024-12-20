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
import { useRouter } from "next/navigation";

export default function AdminProfile() {
  const router = useRouter();
  const { signOut, user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileImage />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-5'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Achieve</DropdownMenuItem>

        {!!user ? (
          <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => router.push("/auth/sign-in")}>
            Sign in
          </DropdownMenuItem>
        )}
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
