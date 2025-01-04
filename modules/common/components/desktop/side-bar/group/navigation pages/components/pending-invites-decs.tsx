import { Text } from "@/modules/common/ui/text";
import React from "react";

export default function PendinginvitesDesc() {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col space-y-2'>
        <Text variant={"h5"} className='font-medium'>
          Pending Invites
        </Text>
        <div className='flex flex-col'>
          <Text variant={"p"}>
            Invite your team members to work faster and to collaborate easily.
          </Text>
          <Text variant={"p"}>Resend and cancel invites.</Text>
        </div>
      </div>
    </div>
  );
}
