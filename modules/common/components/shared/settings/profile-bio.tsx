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

        <div className='flex flex-col'>
          <Text variant={"h3"} className='capitalize'>
            {user?.username}
          </Text>
        </div>
      </div>
    </div>
  );
}
