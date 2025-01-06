import React from "react";
import {
  GroupItemImage,
  GroupRemainingMembers,
} from "../desktop/side-bar/group/group-item";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/modules/supabase/utils/actions";
import useGroupStore from "@/modules/store/group-store";

export default function TaskGroupImg() {
  const groupTitleMembers = useGroupStore((state) => state.groupTitleMembers);

  const slicedMembers = groupTitleMembers.members.slice(0, 3);
  const remainingMembers = groupTitleMembers.members.length - 3;

  const { data: membersData } = useQuery({
    queryKey: ["members", groupTitleMembers.members],
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
      {membersData?.map((members) => (
        <GroupItemImage
          key={members.id + members.email}
          alt={members.username + "avatar"}
          image={members?.avatar as string}
        />
      ))}

      {groupTitleMembers.members.length > 3 && !!remainingMembers && (
        <GroupRemainingMembers remainingMembers={remainingMembers} />
      )}
    </div>
  );
}
