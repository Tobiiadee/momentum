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
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { capitalize } from "@/lib/helpers/helpers";

export default function MembersItems() {
  const { groupId } = useParams();

  const user = useUserStore((state) => state.user);
  const { allGroupsInTable } = useGroupAction(user?.id as string);

  const selectedGroup = allGroupsInTable?.filter(
    (group) =>
      group.label.toLocaleLowerCase() ===
      (groupId as string).toLocaleLowerCase()
  );

  const group_id = selectedGroup?.map((group) => group.list_id)[0];

  const members = selectedGroup?.map((group) => group.members)[0];
  const creator_id = selectedGroup?.map((group) => group.creator_id)[0];

  const permission = creator_id !== user?.id;

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
            group_id={group_id}
            permission={permission}
            {...member}
          />
        ))}
      </div>
    </div>
  );
}

interface MemberItemProps extends AddMemberType {
  creator_id?: string;
  group_id?: string;
  permission?: boolean;
}

function MembersItem({
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
        <Skeleton className='w-[10rem] h-4 rounded-sm' />
      ) : (
        <Text variant={"p"} className='text-xs'>
          {formatDateString(created_at as string)}
        </Text>
      )}

      {isPending ? (
        <Skeleton className='w-[10rem] h-4 rounded-sm' />
      ) : (
        <div className='flex justify-end w-full col-span-2'>
          <MembersRole
            memberRole={role}
            group_id={group_id as string}
            member_id={member_id}
            creator_id={creator_id as string}
            permission={permission}
          />
        </div>
      )}
    </div>
  );
}

interface MembersRoleProps {
  memberRole: string;
  group_id: string;
  member_id: string;
  creator_id: string;
  permission?: boolean;
}

function MembersRole({
  memberRole,
  group_id,
  member_id,
  creator_id,
}: MembersRoleProps) {
  const user = useUserStore((state) => state.user);

  // Fetch the group data to check the logged-in user's role.
  const { fetchedGroup, deleteMemberMutate, updateMemberRoleMutate } =
    useGroupAction(user?.id as string, group_id);

  // Check if the logged-in user is the creator or an admin in the group.
  const isAdmin =
    user?.id === creator_id ||
    fetchedGroup?.members.some(
      (member) => member.member_id === user?.id && capitalize(member.role) === "Admin"
    );

  const handleDeleteMember = () => {
    if (!isAdmin) {
      toast.error("Only admins can remove members from the group");
      return;
    }
    deleteMemberMutate({
      groupId: group_id,
      memberId: member_id,
    });
  };

  const handleRoleChange = (newRole: string) => {
    if (!isAdmin) {
      toast.error("Only admins can change member roles");
      return;
    }
    updateMemberRoleMutate({
      groupId: group_id,
      memberId: member_id,
      newRole: capitalize(newRole) as GroupRoleType,
      userId: user?.id as string,
    });
  };

  return (
    <div className='flex space-x-4'>
      <Select
        defaultValue={memberRole.toLowerCase()}
        disabled={!isAdmin}
        onValueChange={handleRoleChange}>
        <SelectTrigger className='w-[150px] border-foreground/30 text-xs'>
          <SelectValue className='placeholder:text-xs' placeholder='Role' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='admin'>Admin</SelectItem>
          <SelectItem value='member'>Member</SelectItem>
          <SelectItem value='guest'>Guest</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={handleDeleteMember}
        disabled={!isAdmin}
        variant='ghost'
        size='sm'
        className='hover:bg-foreground/15'>
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
        <Skeleton className='w-[10rem] h-3 rounded-sm' />
        <Skeleton className='w-[10rem] h-3 rounded-sm' />
      </div>
    </div>
  );
}
