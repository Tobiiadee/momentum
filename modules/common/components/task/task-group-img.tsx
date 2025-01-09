import React from "react";
import {
  GroupItemImage,
  GroupRemainingMembers,
} from "../desktop/side-bar/group/group-item";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/modules/supabase/utils/actions";
import { Skeleton } from "../../ui/skeleton";
// import useGroupStore from "@/modules/store/group-store";

interface TaskGroupImgProps {
  group_members: AddMemberType[];
  isLoading?: boolean;
}

export default function TaskGroupImg({
  group_members,
  isLoading,
}: TaskGroupImgProps) {
  // const groupTitleMembers = useGroupStore((state) => state.groupTitleMembers);

  const slicedMembers = group_members.slice(0, 3);
  const remainingMembers = group_members.length - 3;

  const { data: membersData } = useQuery({
    queryKey: ["members", group_members],
    queryFn: async () => {
      const fetchedMembers = await Promise.all(
        slicedMembers.map((member) => fetchUser(member.member_id))
      );

      return fetchedMembers;
    },
  });

  // console.log(membersData);

  return (
    <div className='flex items-center'>
      {isLoading &&
        Array.from({ length: 3 }).map((_, i) => <GroupImageSkeleton key={i} />)}
        
      {membersData?.map((members) => (
        <GroupItemImage
          key={members.id + members.email}
          alt={members.username + "avatar"}
          image={members?.avatar as string}
        />
      ))}

      {group_members.length > 3 && !!remainingMembers && (
        <GroupRemainingMembers remainingMembers={remainingMembers} />
      )}
    </div>
  );
}

function GroupImageSkeleton() {
  return <Skeleton className='w-8 aspect-square rounded-full' />;
}
