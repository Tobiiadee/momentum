"use client";

import { formatDateString } from "@/lib/helpers/format";
import { Skeleton } from "@/modules/common/ui/skeleton";
import { Text } from "@/modules/common/ui/text";
import { fetchUser } from "@/modules/supabase/utils/actions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { MembersRole } from "./member-role";

interface MemberItemProps extends AddMemberType {
  creator_id?: string;
  group_id?: string;
  permission?: boolean;
}

export default function MembersItem({
  created_at,
  member_id,
  role,
  group_id,
  creator_id,
  permission,
}: MemberItemProps) {
  
  const { data: memberData, isPending } = useQuery({
    queryKey: ["members", member_id],
    queryFn: async () => {
      if (!member_id) throw new Error("Member ID is required");
      return fetchUser(member_id);
    },
  });

  return (
    <div className='grid grid-cols-2 md:grid-cols-5 gap-4 items-center pt-4'>
      <div className='md:col-span-2 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 md:items-center'>
        {isPending && <MemberItemSkeleton />}
        {isPending === false && (
          <div>
            <div className='relative w-10 aspect-square rounded-full overflow-hidden'>
              <Image
                src={
                  (memberData?.avatar as string) ||
                  "/images/image_placeholder.jpg"
                }
                alt='Avatar'
                fill
                priority
                className='object-cover'
              />
            </div>
          </div>
        )}

        {isPending === false && (
          <div>
            <Text variant={"p"} className='font-medium'>
              {memberData?.username}
            </Text>
            <Text variant={"p"} className='text-foreground/60 text-xs'>
              {memberData?.email}
            </Text>
          </div>
        )}
      </div>

      {isPending ? (
        <Skeleton className='w-[10rem] h-4 rounded-sm hidden md:block' />
      ) : (
        <Text variant={"p"} className='text-xs hidden md:block'>
          {formatDateString(created_at as string)}
        </Text>
      )}

      <div className='flex justify-end w-full md:col-span-2'>
        {isPending ? (
          <Skeleton className='w-[150px] h-4 rounded-sm' />
        ) : (
          <MembersRole
            memberRole={role}
            group_id={group_id as string}
            member_id={member_id}
            creator_id={creator_id as string}
            permission={permission}
          />
        )}
      </div>
    </div>
  );
}

function MemberItemSkeleton() {
  return (
    <div className='flex space-x-4 w-full'>
      <Skeleton className='w-10 aspect-square rounded-full' />
      <div className='flex items-center flex-col space-y-1'>
        <Skeleton className='w-[10rem] h-3 rounded-sm' />
        <Skeleton className='w-[10rem] h-3 rounded-sm' />
      </div>
    </div>
  );
}
