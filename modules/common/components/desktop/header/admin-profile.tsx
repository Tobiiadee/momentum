"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { supabase } from "@/modules/supabase/supabase";
import { useAuth } from "@/hooks/use-auth";
import ProfileImage from "./profile-image";
import useUserStore from "@/modules/store/user-store";
import GenerateAvatar from "./generate-avatar";
import { getLetterAndDynamicColor } from "@/lib/helpers/helpers";
import { FileStack, LogIn, LogOut, Settings, Trash2 } from "lucide-react";

export default function AdminProfile() {
  const router = useRouter();
  const user = supabase.auth.getUser();
  const userData = useUserStore((state) => state.user);
  const { signOut } = useAuth();

  const { letter, color } = getLetterAndDynamicColor(userData?.email as string);

  // console.log(userData?.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {userData?.avatar ? (
          <ProfileImage image={userData?.avatar} />
        ) : (
          <GenerateAvatar letter={letter} color={color} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-5 w-[10rem]'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard/achieve")}>
          Achieve
          <DropdownMenuShortcut>
            <FileStack strokeWidth={1.5} size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
          Settings
          <DropdownMenuShortcut>
            <Settings strokeWidth={1.5} size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard/trash")}>
          Trash
          <DropdownMenuShortcut>
            <Trash2 strokeWidth={1.5} size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {!!user ? (
          <DropdownMenuItem onClick={() => signOut()}>
            Log out
            <DropdownMenuShortcut>
              <LogOut strokeWidth={1.5} size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => router.push("/auth/login")}>
            Login
            <DropdownMenuShortcut>
              <LogIn strokeWidth={1.5} size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
