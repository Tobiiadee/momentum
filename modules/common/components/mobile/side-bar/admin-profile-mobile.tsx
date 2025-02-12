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
import useUserStore from "@/modules/store/user-store";

import { getLetterAndDynamicColor } from "@/lib/helpers/helpers";
import { FileStack, LogIn, LogOut, Settings, Trash2 } from "lucide-react";
import { Text } from "@/modules/common/ui/text";
import useSidebarStore from "@/modules/store/sidebar-store";
import ProfileImage from "../../desktop/header/profile-image";
import GenerateAvatar from "../../desktop/header/generate-avatar";

export default function AdminProfileMobile() {
  const router = useRouter();
  const user = supabase.auth.getUser();
  const userData = useUserStore((state) => state.user);
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const { signOut } = useAuth();

  const { letter, color } = getLetterAndDynamicColor(userData?.email as string);

  // console.log(userData?.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex items-center space-x-4'>
          {userData?.avatar ? (
            <ProfileImage image={userData?.avatar} />
          ) : (
            <GenerateAvatar letter={letter} color={color} />
          )}
          <div className='flex flex-col justify-start -space-y-1'>
            <Text variant={"h4"} className='font-semibold text-start'>
              {userData?.username}
            </Text>
            <Text variant={"p"} className='text-xs text-foreground/60'>
              {userData?.email}
            </Text>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='ml-14 lg:mr-5 w-[12rem] lg:w-[10rem]'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push("/dashboard/achieve");
            setIsSidebarOpen(false);
          }}>
          Achieve
          <DropdownMenuShortcut>
            <FileStack strokeWidth={1.5} size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push("/dashboard/settings");
            setIsSidebarOpen(false);
          }}>
          Settings
          <DropdownMenuShortcut>
            <Settings strokeWidth={1.5} size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push("/dashboard/trash");
            setIsSidebarOpen(false);
          }}>
          Trash
          <DropdownMenuShortcut>
            <Trash2 strokeWidth={1.5} size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {!!user ? (
          <DropdownMenuItem
            onClick={() => {
              signOut();
              setIsSidebarOpen(false);
            }}>
            Log out
            <DropdownMenuShortcut>
              <LogOut strokeWidth={1.5} size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => {
              router.push("/auth/login");
              setIsSidebarOpen(false);
            }}>
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
