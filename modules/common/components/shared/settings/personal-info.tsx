"use client";

import { Text } from "@/modules/common/ui/text";
import React from "react";
import EditButton from "./edit-button";
import useUserStore from "@/modules/store/user-store";
import useSettingsStore from "@/modules/store/use-settings-store";
import { Skeleton } from "@/modules/common/ui/skeleton";

export default function PersonalInfo() {
  const user = useUserStore((state) => state.user);
  const setEditMyProfile = useSettingsStore((state) => state.setEditMyProfile);

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex justify-between'>
        <Text variant={"h5"} className='font-medium'>
          Personal Information
        </Text>
        <EditButton editFn={() => setEditMyProfile(true)} />
      </div>

      {user === null && <PersonalInfoSkeleton />}

      {user && (
        <div className='flex flex-col space-y-4'>
          <div className='grid grid-cols-2 w-[70%]'>
            <div className='flex flex-col space-y-1'>
              <Text variant={"p"} className='text-foreground/60'>
                Full Name
              </Text>
              <Text
                variant={"p"}
                className='text-foreground font-medium capitalize'>
                {user?.full_name}
              </Text>
            </div>
            <div className='flex flex-col space-y-1'>
              <Text variant={"p"} className='text-foreground/60'>
                Username
              </Text>
              <Text
                variant={"p"}
                className='text-foreground font-medium capitalize'>
                {user?.username}
              </Text>
            </div>
          </div>

          <div className='grid grid-cols-2 w-[70%]'>
            <div className='flex flex-col space-y-1'>
              <Text variant={"p"} className='text-foreground/60'>
                Email address
              </Text>
              <Text variant={"p"} className='text-foreground font-medium'>
                {user?.email}
              </Text>
            </div>
            <div className='flex flex-col space-y-1'>
              <Text variant={"p"} className='text-foreground/60'>
                Phone
              </Text>
              <Text variant={"p"} className='text-foreground font-medium'>
                {user?.phone_number}
              </Text>
            </div>
          </div>

          <div className='grid grid-cols-2 w-[70%]'>
            <div className='flex flex-col space-y-1'>
              <Text variant={"p"} className='text-foreground/60'>
                Country
              </Text>
              <Text variant={"p"} className='text-foreground font-medium'>
                {user?.country}
              </Text>
            </div>
            <div className='flex flex-col space-y-1'>
              <Text variant={"p"} className='text-foreground/60'>
                City/State
              </Text>
              <Text variant={"p"} className='text-foreground font-medium'>
                {user?.city_state}
              </Text>
            </div>
          </div>

          <div className='w-[70%]'>
            <div className='flex flex-col space-y-1'>
              <Text variant={"p"} className='text-foreground/60'>
                Bio
              </Text>
              <Text variant={"p"} className='text-foreground font-medium'>
                {user?.bio}
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PersonalInfoSkeleton() {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex items-center justify-between w-[60%]'>
        <Skeleton className='w-52 h-6 rounded-md' />
        <Skeleton className='w-52 h-6 rounded-md' />
      </div>
      <div className='flex items-center justify-between w-[60%]'>
        <Skeleton className='w-52 h-6 rounded-md' />
        <Skeleton className='w-52 h-6 rounded-md' />
      </div>
      <div className='flex items-center justify-between w-[60%]'>
        <Skeleton className='w-52 h-6 rounded-md' />
        <Skeleton className='w-52 h-6 rounded-md' />
      </div>
    </div>
  );
}
