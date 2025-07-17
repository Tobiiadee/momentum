"use client";

import React from "react";
import MembersDesc from "./components/members-desc";
import MembersItems from "./components/members-items";
import { Separator } from "@/modules/common/ui/separator";
import PendingInvitesMain from "./components/pending-invites-main";
import { useParams } from "next/navigation";
// import useUserStore from "@/modules/store/user-store";
// import { capitalize } from "@/lib/helpers/helpers";
import { useQuery } from "@tanstack/react-query";
import { fetchGroup, fetchMembersOfAGroup } from "@/modules/supabase/utils/actions";

export default function Members() {
  const { groupId } = useParams();
  // const user = useUserStore((state) => state.user);

  const { data: members } = useQuery({
    queryKey: ["members", groupId],
    queryFn: async () => fetchMembersOfAGroup(groupId as string),
  });

  
  const { data: group } = useQuery({
    queryKey: ["group", groupId],
    queryFn: async () => fetchGroup(groupId as string),
  });

  // Check if the logged-in user is the creator or an admin in the group.
  const isAdmin = members?.some(
    (member) =>
      member.member_id === group?.creator_id || member.role === "Admin"
  );

  // console.log(isAdmin)

  return (
    <div className="flex flex-col space-y-8 w-full">
      <MembersDesc isAdmin={isAdmin as boolean} />
      <MembersItems />
      <Separator className="w-full" />
      {isAdmin && <PendingInvitesMain />}
    </div>
  );
}
