import React from "react";
import PendinginvitesDesc from "./pending-invites-decs";
import PendingInvites from "./pending-invites";

export default function PendingInvitesMain() {
  return (
    <div className='flex flex-col space-y-6 w-full'>
      <PendinginvitesDesc />
      <PendingInvites />
    </div>
  );
}
