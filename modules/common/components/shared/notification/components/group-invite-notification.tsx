import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion,
} from "@/modules/common/ui/accordion";
import { EllipsisVertical, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import { Separator } from "@/modules/common/ui/separator";

export default function GroupInviteNotification() {
  return (
    <Accordion type='single' collapsible className='w-full '>
      <AccordionItem value={`item-${1 + 4}`} className=''>
        <AccordionTrigger className="py-2">
          <GroupInviteCollasible />
        </AccordionTrigger>
        <AccordionContent className='w-full'>
          <div className='flex items-center space-x-4 justify-end'>
            <Button size='sm'>
              <Text variant={"p"} className='text-xs'>
                Accept
              </Text>
            </Button>

            <Button
              variant={"ghost"}
              size='sm'
              className='flex items-center bg-foreground/10 hover:bg-foreground/15'>
              <Text variant={"p"} className='text-xs'>
                Decline
              </Text>
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
      <Separator className='w-full' />
    </Accordion>
  );
}

function GroupInviteCollasible() {
  return (
    <div className='flex space-x-2 w-full items-center'>
      <div className='w-10 aspect-square rounded-md bg-foreground/10 grid place-items-center'>
        <UserPlus size={22} strokeWidth={1.5} />
      </div>

      <div className='flex flex-col w-full -space-y-1'>
        <div className='flex items-center justify-between w-full'>
          <Text variant={"p"}>Group Invite</Text>

          <div className='flex items-center space-x-2'>
            <Text variant={"p"} className='text-foreground/60 text-xs'>
              8hrs ago
            </Text>

            <NotificationOptions />
          </div>
        </div>

        <Text variant={"p"} className='text-foreground/60 text-xs'>
          Your were invited to group name
        </Text>
      </div>
    </div>
  );
}

export function NotificationOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={(e) => e.stopPropagation()}
          variant={"ghost"}
          size={"sm"}
          className='rounded-full px-1.5 group'>
          <EllipsisVertical
            strokeWidth={1.5}
            size={18}
            className='text-foreground/60 hover:text-foreground'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-12'>
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          Mark as read
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
