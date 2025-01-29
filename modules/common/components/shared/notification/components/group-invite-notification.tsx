/*eslint-disable @typescript-eslint/no-explicit-any*/

"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import React, { useState } from "react";
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
import { timeAgo } from "@/lib/helpers/format";
import axios from "axios";
import { toast } from "sonner";
import useUserStore from "@/modules/store/user-store";
import { slideInVariant } from "./group-invite-user-response-notification";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

interface GroupInviteNotificationProps {
  message: string;
  group_id?: string;
  created_at?: string;
  inviteId: string;
  index: number;
}

export default function GroupInviteNotification({
  message,
  created_at,
  group_id,
  index,
}: GroupInviteNotificationProps) {
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);
  // const [success, setSuccess] = useState<"accepted" | "declined" | null>(null);
  // const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  //get user id
  const user = useUserStore((state) => state.user);
  const userId = user?.id as string;

  const handleResponseAccept = async () => {
    setLoadingAccept(true);
    // setError(null);

    try {
      await axios.post("/api/invites/respond", {
        user_id: userId,
        status: "accepted",
        group_id: group_id,
      });
      // setSuccess(status);
      // setError(null);
      toast.success(`Invite accepted`);
      setLoadingAccept(false);
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
      queryClient.invalidateQueries({ queryKey: ["all-groups", userId] });
    } catch (err: any) {
      toast.error(`error: ${err.message}`);
      return err;
    } finally {
      setLoadingAccept(false);
    }
  };

  const handleResponseDecline = async () => {
    setLoadingDecline(true);
    // setError(null);

    try {
      await axios.post("/api/invites/respond", {
        user_id: userId,
        status: "declined",
      });
      // setSuccess(status);
      // setError(null);
      toast.success(`Invite declined`);
      queryClient.invalidateQueries({ queryKey: ["recievers", userId] });
    } catch (err) {
      // setError("Something went wrong. Please try again.");
      setLoadingDecline(false);
      toast.error("Something went wrong. Please try again.");
      return err;
    } finally {
      setLoadingDecline(false);
    }
  };

  return (
    <motion.div
      variants={slideInVariant}
      initial='hidden'
      animate='visible'
      custom={index}
      exit={"hidden"}>
      <Accordion type='single' collapsible className='w-full '>
        <AccordionItem value={`item-${1 + 4}`} className=''>
          <AccordionTrigger className='py-2'>
            <GroupInviteCollasible
              created_at={created_at as string}
              message={message}
            />
          </AccordionTrigger>
          <AccordionContent className='w-full'>
            <div className='flex items-center space-x-4 justify-end'>
              <Button
                onClick={handleResponseAccept}
                isLoading={loadingAccept}
                size='sm'
                className='flex items-center'>
                <Text variant={"p"} className='text-xs'>
                  Accept
                </Text>
              </Button>

              <Button
                onClick={handleResponseDecline}
                isLoading={loadingDecline}
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
    </motion.div>
  );
}

interface GroupInviteCollasibleProps {
  message: string;
  group_id?: string;
  created_at: string;
}

function GroupInviteCollasible({
  message,
  created_at,
}: GroupInviteCollasibleProps) {
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
              {timeAgo(created_at as string)}
            </Text>

            <NotificationOptions />
          </div>
        </div>

        <Text variant={"p"} className='text-foreground/60 text-xs'>
          {message}
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
