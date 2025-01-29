"use client";

import React from "react";
import MembersDesc from "./components/members-desc";
import MembersItems from "./components/members-items";
import { Separator } from "@/modules/common/ui/separator";
import PendingInvitesMain from "./components/pending-invites-main";
import { useParams } from "next/navigation";
import useGroupAction from "@/hooks/use-group-action";
import useUserStore from "@/modules/store/user-store";
import { capitalize } from "@/lib/helpers/helpers";

export default function Members() {
  const { groupId } = useParams();
  const user = useUserStore((state) => state.user);
  const { allGroups } = useGroupAction(user?.id as string);

  const decodeGroupId = decodeURIComponent(groupId as string);

  // filter the group by id
  const group = allGroups?.find(
    (group) =>
      group.label.toLowerCase() ===
      (decodeGroupId as string).toLocaleLowerCase()
  );

  const group_id = group?.list_id;

  // Check if the logged-in user is the creator or an admin in the group.
  const isAdmin =
    user?.id === group?.creator_id ||
    group?.members.some(
      (member) =>
        member.member_id === user?.id && capitalize(member.role) === "Admin"
    );

  return (
    <div className='flex flex-col space-y-8 w-full'>
      <MembersDesc group_id={group_id as string} />
      <MembersItems />
      <Separator className='w-full' />
      {isAdmin && <PendingInvitesMain />}
    </div>
  );
}
