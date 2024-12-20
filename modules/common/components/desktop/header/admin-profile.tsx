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
import { useRouter } from "next/navigation";
import { supabase } from "@/modules/supabase/supabase";
import { useAuth } from "@/hooks/use-auth";
import ProfileImage from "./profile-image";

export default function AdminProfile() {
  const router = useRouter();
  const user = supabase.auth.getUser();
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileImage />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-5'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Achieve</DropdownMenuItem>

        {!!user ? (
          <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => router.push("/auth/login")}>
            Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
