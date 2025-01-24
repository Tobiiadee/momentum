import React from "react";
import { Text } from "@/modules/common/ui/text";
import { Users } from "lucide-react";
import { NotificationOptions } from "./group-invite-notification";
import { Separator } from "@/modules/common/ui/separator";

export default function MemberAddedNotification() {
  //This component will need the group title to be passed as props

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex space-x-4 items-center w-full'>
        <div className='w-10 aspect-square rounded-md bg-foreground/10 grid place-items-center'>
          <Users size={22} strokeWidth={1.5} />
        </div>

        <div className='flex flex-col -space-y-1 w-full'>
          <div className='flex items-center justify-between w-full'>
            <Text variant={"p"}>Group Name</Text>
            <div className='flex items-center space-x-2'>
              <Text variant={"p"} className='text-foreground/60 text-xs'>
                8hrs ago
              </Text>
              <NotificationOptions />
            </div>
          </div>

          <Text variant={"p"} className='text-foreground/60 text-xs'>
            A member was added to this group
          </Text>
        </div>
      </div>

      <Separator className='w-full' />
    </div>
  );
}
