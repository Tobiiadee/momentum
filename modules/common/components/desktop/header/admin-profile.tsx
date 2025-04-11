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
import { ClipboardList, FileStack, LogIn, LogOut, Settings, Trash2 } from "lucide-react";
import { Text } from "@/modules/common/ui/text";
import useSidebarStore from "@/modules/store/sidebar-store";

export default function AdminProfile() {
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
          <Text variant={"h5"} className='lg:hidden'>
            Account
          </Text>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='ml-14 lg:mr-5 w-[12rem]'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push("/dashboard/incomplete-tasks");
            setIsSidebarOpen(false);
          }}>
          Incomplete Tasks
          <DropdownMenuShortcut>
            <ClipboardList strokeWidth={1.5} size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
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
