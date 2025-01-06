"use client";

import { Text } from "@/modules/common/ui/text";
import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/ui/select";
import { Button } from "@/modules/common/ui/button";
import { Trash2 } from "lucide-react";
import useGroupAction from "@/hooks/use-group-action";
import useUserStore from "@/modules/store/user-store";
import { fetchUser } from "@/modules/supabase/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { formatDateString } from "@/lib/helpers/format";
import { Skeleton } from "@/modules/common/ui/skeleton";

export default function MembersItems() {
  const user = useUserStore((state) => state.user);
  const { allGroups } = useGroupAction(user?.id as string);

  const members = allGroups?.map((group) => group.members)[0];
  const creator_id = allGroups?.map((group) => group.creator_id)[0];

  return (
    <div className='col-span-2 w-full flex flex-col bg-foreground/10 p-4'>
      <div className='grid grid-cols-5 gap-4'>
        <Text variant={"p"} className='col-span-2 font-semibold'>
          Name
        </Text>
        <Text variant={"p"} className='font-semibold'>
          Date Added
        </Text>

        <Text
          variant={"p"}
          className='uppercase col-span-2 font-semibold'></Text>
      </div>
      <div className='divide-y divide-foreground/10 flex flex-col space-y-4'>
        {members?.map((member) => (
          <MembersItem
            key={member.member_id}
            creator_id={creator_id}
            {...member}
          />
        ))}
      </div>
    </div>
  );
}

interface MemberItemProps extends AddMemberType {
  creator_id?: string;
}

function MembersItem({ created_at, member_id, creator_id }: MemberItemProps) {
  //fetch members by id
  const { data: memberData, isPending } = useQuery({
    queryKey: ["members", member_id],
    queryFn: async () => {
      if (!member_id) throw new Error("Member ID is required");
      return fetchUser(member_id);
    },
  });

  const memberRole = memberData?.id === creator_id ? "admin" : "member";

  return (
    <div className='grid grid-cols-5 gap-4 items-center pt-4'>
      <div className='col-span-2 flex space-x-4 items-center'>
        {isPending && <MemberItemSkeleton />}
        {isPending === false && (
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
        )}

        {isPending === false && (
          <div className=''>
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
        <Skeleton className='w-[10rem] h-4  rounded-sm' />
      ) : (
        <Text variant={"p"} className='text-xs'>
          {formatDateString(created_at as string)}
        </Text>
      )}

      <div className='flex justify-end w-full col-span-2'>
        <MembersRole memberRole={memberRole} />
      </div>
    </div>
  );
}

interface MemebersRoleProps {
  memberRole: string;
}

function MembersRole({ memberRole }: MemebersRoleProps) {
 

  console.log(memberRole);
  
  

  return (
    <div className='flex space-x-4'>
      <Select defaultValue={memberRole}>
        <SelectTrigger className='w-[150px] border-foreground/30 text-xs'>
          <SelectValue className='placeholder:text-xs' placeholder='Role' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='admin'>Admin</SelectItem>
          <SelectItem value='member'>Member</SelectItem>
          <SelectItem value='guest'>Guest</SelectItem>
        </SelectContent>
      </Select>

      <Button variant={"ghost"} size={"sm"} className='hover:bg-foreground/15'>
        <Trash2 strokeWidth={1.5} size={18} />
      </Button>
    </div>
  );
}

function MemberItemSkeleton() {
  return (
    <div className='flex space-x-4 w-full'>
      <Skeleton className='w-10 aspect-square rounded-full' />
      <div className='flex items-center flex-col space-y-1'>
        <Skeleton className='w-[10rem] h-3  rounded-sm' />
        <Skeleton className='w-[10rem] h-3  rounded-sm' />
      </div>
    </div>
  );
}
