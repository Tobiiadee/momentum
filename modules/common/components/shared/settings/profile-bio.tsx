"use client";

import { Text } from "@/modules/common/ui/text";
import React from "react";
import ProfilePictureSelect from "./profile-picture-select";
import useUserStore from "@/modules/store/user-store";

export default function ProfileBio() {
  const user = useUserStore((state) => state.user);

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex space-x-4 items-center'>
        <ProfilePictureSelect />

        <div className='flex flex-col -space-y-1'>
          <Text variant={"h3"} className='capitalize'>
            {user?.username}
          </Text>
          <Text variant={"p"} className='text-xs text-foreground/60'>
            {user?.email}
          </Text>
        </div>
      </div>
    </div>
  );
}
