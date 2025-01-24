import { Text } from "@/modules/common/ui/text";
import { LayoutList } from "lucide-react";
import React from "react";
import { NotificationOptions } from "./group-invite-notification";
import { Separator } from "@/modules/common/ui/separator";

export default function GroupTaskNotification() {
  //This component will need the group info and the task notification type to be passed in as a prop\
  //Notification type will be either add, remove, update, or complete

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex space-x-4 items-center w-full'>
        <div className='w-10 aspect-square rounded-md bg-foreground/10 grid place-items-center'>
          <LayoutList size={22} strokeWidth={1.5} />
        </div>

        <div className='flex flex-col -space-y-1 w-full'>
          <div className='flex items-center justify-between w-full'>
            <Text variant={"p"}>Group Task</Text>
            <div className='flex items-center space-x-2'>
              <Text variant={"p"} className='text-foreground/60 text-xs'>
                8hrs ago
              </Text>
              <NotificationOptions />
            </div>
          </div>

          <Text variant={"p"} className='text-foreground/60 text-xs'>
            A task has been added to this group
          </Text>
        </div>
      </div>

      <Separator className='w-full' />
    </div>
  );
}
