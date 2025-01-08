"use client";

import React from "react";
import MembersDesc from "./components/members-desc";
import MembersItems from "./components/members-items";
import { Separator } from "@/modules/common/ui/separator";
import PendingInvitesMain from "./components/pending-invites-main";
import { useParams } from "next/navigation";
import useGroupAction from "@/hooks/use-group-action";
import useUserStore from "@/modules/store/user-store";

export default function Members() {
  const { groupId } = useParams();
  const user = useUserStore((state) => state.user);
  const { allGroups } = useGroupAction(user?.id as string);

  // filter the group by id
  const group = allGroups?.find(
    (group) =>
      group.label.toLowerCase() === (groupId as string).toLocaleLowerCase()
  );

  const group_id = group?.list_id;

  return (
    <div className='flex flex-col space-y-8 w-full'>
      <MembersDesc group_id={group_id as string} />
      <MembersItems />
      <Separator className='w-full' />
      <PendingInvitesMain />
    </div>
  );
}
