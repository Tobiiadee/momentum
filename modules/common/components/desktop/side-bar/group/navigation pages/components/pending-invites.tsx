"use client";

import { Text } from "@/modules/common/ui/text";
import Image from "next/image";
import React from "react";
import { Button } from "@/modules/common/ui/button";
import { useParams } from "next/navigation";
import useUserStore from "@/modules/store/user-store";
import useGroupAction from "@/hooks/use-group-action";
import { useQuery } from "@tanstack/react-query";
import {
  fetchUser,
  getGroupPendingInvites,
} from "@/modules/supabase/utils/actions";
import { Skeleton } from "@/modules/common/ui/skeleton";
import { formatDateString } from "@/lib/helpers/format";

export default function PendingInvites() {
  const { groupId } = useParams();

  const decodeGroupId = decodeURIComponent(groupId as string);

  const user = useUserStore((state) => state.user);
  const { allGroupsInTable } = useGroupAction(user?.id as string);

  const selectedGroup = allGroupsInTable?.filter(
    (group) =>
      group.label.toLocaleLowerCase() ===
      (decodeGroupId as string).toLocaleLowerCase()
  );

  const group_id = selectedGroup?.map((group) => group.list_id)[0];

  const { data: pendingInvites } = useQuery({
    queryKey: ["getGroupPendingInvites", group_id],
    queryFn: async () => {
      return await getGroupPendingInvites(group_id as string);
    },
    enabled: !!group_id,
  });

  // const reciever_ids = pendingInvites?.map((invite) => invite.reciever_id);
  // const inviteSentAt = pendingInvites?.map((invite) => invite.created_at);

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
        {pendingInvites?.map((invite) => (
          <RecieverItem
            key={invite.reciever_id}
            reciever_id={invite.reciever_id}
            invite_sent_at={invite.created_at}
          />
        ))}
      </div>
    </div>
  );
}

interface RecieverItemProps {
  reciever_id: string;
  invite_sent_at: string;
}

function RecieverItem({ reciever_id, invite_sent_at }: RecieverItemProps) {
  const { data: recieverData, isLoading } = useQuery({
    queryKey: ["reciever_id", reciever_id],
    queryFn: async () => {
      if (!reciever_id) throw new Error("Reciever ID is required");
      return fetchUser(reciever_id);
    },
  });

  return (
    <div className='grid grid-cols-5 gap-4 items-center pt-4'>
      {isLoading ? (
        <RecieverItemSkeleton />
      ) : (
        <div className='col-span-2 flex space-x-4 items-center'>
          <div className='relative w-10 aspect-square rounded-full overflow-hidden'>
            <Image
              src={recieverData?.avatar as string}
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
        <Skeleton className='w-[10rem] h-4 rounded-sm' />
      ) : (
        <Text variant={"p"} className='text-xs'>
          {formatDateString(invite_sent_at as string)}
        </Text>
      )}

      {isLoading ? (
        <Skeleton className='w-[10rem] h-4 rounded-sm col-span-2' />
      ) : (
        <RecieverActions />
      )}
    </div>
  );
}

function RecieverActions() {
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
