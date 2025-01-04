import React from "react";
import MembersDesc from "./components/members-desc";
import MembersItems from "./components/members-items";
import { Separator } from "@/modules/common/ui/separator";
import PendingInvitesMain from "./components/pending-invites-main";

export default function Members() {
  return (
    <div className='flex flex-col space-y-8 w-full'>
      <MembersDesc />
      <MembersItems />
      <Separator className='w-full' />
      <PendingInvitesMain />
    </div>
  );
}
