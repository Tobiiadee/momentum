import { Text } from "@/modules/common/ui/text";
import Image from "next/image";
import React from "react";

export default function NotificationItem() {
  return (
    <div className='flex space-x-4 pt-4 cursor-pointer bg-transparent hover:scale-105 active:scale-100 transition-all duration-300'>
      <div className='flex space-x-2'>
        <div>
          <div className='relative w-8 aspect-square rounded-md shadow overflow-hidden'>
            <Image
              src='/images/img3.jpg'
              alt=''
              fill
              priority
              className='object-cover'
            />
          </div>
        </div>

        <div className='flex flex-col'>
          <Text variant={"p"}>Group Notification</Text>
          <Text variant={"p"} className='text-foreground/60 text-xs'>
            Your were just added to a group
          </Text>
        </div>
      </div>
    </div>
  );
}
