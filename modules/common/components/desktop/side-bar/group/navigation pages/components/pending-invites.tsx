/*eslint-disable @typescript-eslint/no-explicit-any*/

"use client";

import { Text } from "@/modules/common/ui/text";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/modules/common/ui/button";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchGroup,
  fetchUser,
  getGroupPendingInvites,
} from "@/modules/supabase/utils/actions";
import { Skeleton } from "@/modules/common/ui/skeleton";
import { formatDateString } from "@/lib/helpers/format";
import axios from "axios";
import { toast } from "sonner";

export default function PendingInvites() {
  const { groupId } = useParams();

  const { data: group } = useQuery({
    queryKey: [groupId],
    queryFn: async () => fetchGroup(groupId as string),
  });

  const group_id = group?.list_id;

  const { data: pendingInvites } = useQuery({
    queryKey: ["getGroupPendingInvites", group_id],
    queryFn: async () => {
      return await getGroupPendingInvites(group_id as string);
    },
    enabled: !!group_id,
  });

  return (
    <div className='col-span-2 w-full flex flex-col bg-foreground/10 p-4'>
      <div className='grid grid-cols-5 gap-4'>
        <Text variant={"p"} className='col-span-2 font-semibold'>
          Name
        </Text>
        <Text variant={"p"} className='font-semibold hidden md:block'>
          Date Sent
        </Text>
        <Text
          variant={"p"}
          className='uppercase col-span-2 font-semibold'></Text>
      </div>

      {pendingInvites?.length === 0 && (
        <div className='w-full grid place-items-center h-20'>
          <Text variant={"h5"} className=''>
            No pending invites
          </Text>
        </div>
      )}

      <div className='divide-y divide-foreground/10 flex flex-col space-y-4'>
        {pendingInvites?.map((invite) => (
          <RecieverItem
            key={invite.reciever_id}
            reciever_id={invite.reciever_id}
            invite_sent_at={invite.created_at}
            group_id={invite.group_id}
            invite_id={invite.invite_id}
          />
        ))}
      </div>
    </div>
  );
}

interface RecieverItemProps {
  reciever_id: string;
  invite_sent_at: string;
  group_id: string;
  invite_id: string;
}

function RecieverItem({
  reciever_id,
  invite_sent_at,
  group_id,
  invite_id,
}: RecieverItemProps) {
  const { data: recieverData, isLoading } = useQuery({
    queryKey: ["reciever_id", reciever_id],
    queryFn: async () => {
      if (!reciever_id) throw new Error("Reciever ID is required");
      return fetchUser(reciever_id);
    },
  });

  return (
    <div className='grid grid-cols-2 md:grid-cols-5 gap-4 items-center pt-4'>
      {isLoading ? (
        <RecieverItemSkeleton />
      ) : (
        <div className='col-span-2 flex space-x-4 items-center'>
          <div className='relative w-10 aspect-square rounded-full overflow-hidden'>
            <Image
              src={
                (recieverData?.avatar as string) ||
                "/images/image_placeholder.jpg"
              }
              alt={`${recieverData?.full_name}'s avatar`}
              fill
              priority
              className='object-cover'
            />
          </div>
          <div className=''>
            <Text variant={"p"} className='font-medium'>
              {recieverData?.full_name}
            </Text>
            <Text variant={"p"} className='text-foreground/60 text-xs'>
              {recieverData?.email}
            </Text>
          </div>
        </div>
      )}

      {isLoading ? (
        <Skeleton className='w-[10rem] h-4 rounded-sm hidden md:block' />
      ) : (
        <Text variant={"p"} className='text-xs hidden md:block'>
          {formatDateString(invite_sent_at as string)}
        </Text>
      )}

      {isLoading ? (
        <Skeleton className='w-[10rem] h-4 rounded-sm col-span-2' />
      ) : (
        <RecieverActions
          invite_id={invite_id}
          group_id={group_id}
          reciever_id={reciever_id}
        />
      )}
    </div>
  );
}

interface RecieverActionsProps {
  invite_id: string;
  group_id: string;
  reciever_id: string;
}

function RecieverActions({
  invite_id,
  group_id,
  reciever_id,
}: RecieverActionsProps) {
  const [isCancelling, setIsCancelling] = useState(false);

  const queryClient = useQueryClient();

  //cancel invite
  const onCancelInvite = async () => {
    try {
      setIsCancelling(true);
      const response = await axios.delete("/api/invites/cancel", {
        data: {
          invite_id: invite_id,
          group_id: group_id,
          reciever_id: reciever_id,
        },
      });

      setIsCancelling(false);

      if (response.status !== 200) {
        throw new Error("Error cancelling invite");
      }

      toast.success("Invite cancelled successfully");
      queryClient.invalidateQueries({
        queryKey: ["getGroupPendingInvites", group_id],
      });
    } catch (error: any) {
      setIsCancelling(false);
      toast.error(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

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
        <Button
          isLoading={isCancelling}
          onClick={onCancelInvite}
          className='flex items-center'>
          <Text variant={"p"} className='text-xs'>
            Cancel Invite
          </Text>
        </Button>
      </div>
    </div>
  );
}

function RecieverItemSkeleton() {
  return (
    <div className='col-span-2 flex space-x-4 w-full'>
      <Skeleton className='w-10 aspect-square rounded-full' />
      <div className='flex items-center flex-col space-y-1'>
        <Skeleton className='w-[10rem] h-3 rounded-sm' />
        <Skeleton className='w-[10rem] h-3 rounded-sm' />
      </div>
    </div>
  );
}
