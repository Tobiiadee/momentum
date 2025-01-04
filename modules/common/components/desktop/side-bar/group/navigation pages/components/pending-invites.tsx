import { Text } from "@/modules/common/ui/text";
import Image from "next/image";
import React from "react";
import { Button } from "@/modules/common/ui/button";

export default function PendingInvites() {
  return (
    <div className='col-span-2 w-full flex flex-col bg-foreground/10 p-4'>
      <div className='grid grid-cols-5 gap-4'>
        <Text variant={"p"} className='col-span-2 font-semibold'>
          Name
        </Text>
        <Text variant={"p"} className='font-semibold'>
          Date Sent
        </Text>
        <Text
          variant={"p"}
          className='uppercase col-span-2 font-semibold'></Text>
      </div>
      <div className='divide-y divide-foreground/10 flex flex-col space-y-4'>
        <MembersItem />
        <MembersItem />
        <MembersItem />
      </div>
    </div>
  );
}

function MembersItem() {
  return (
    <div className='grid grid-cols-5 gap-4 items-center pt-4'>
      <div className='col-span-2 flex space-x-4 items-center'>
        <div className='relative w-10 aspect-square rounded-full overflow-hidden'>
          <Image
            src={"/images/img5.jpg"}
            alt='Avatar'
            fill
            priority
            className='object-cover'
          />
        </div>
        <div className=''>
          <Text variant={"p"} className='font-medium'>
            John Doe
          </Text>
          <Text variant={"p"} className='text-foreground/60'>
            johndeo@gmail.com
          </Text>
        </div>
      </div>

      <Text variant={"p"} className='text-xs'>
        28 May, 2024
      </Text>

      <MembersRole />
    </div>
  );
}

function MembersRole() {
  return (
    <div className='col-span-2 flex space-x-4'>
      <div className='flex space-x-4 items-center'>
        <Button
          variant={"ghost"}
          className='flex items-center bg-foreground/10 hover:bg-foreground/15'>
          <Text variant={"p"} className='text-xs'>
            Resend Invite
          </Text>
        </Button>
        <Button className='flex items-center'>
          <Text variant={"p"} className='text-xs'>
            Cancel Invite
          </Text>
        </Button>
      </div>
    </div>
  );
}
