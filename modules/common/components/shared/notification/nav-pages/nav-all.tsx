import React from "react";
import GroupInviteNotification from "../components/group-invite-notification";

export default function NavAll() {
  return (
    <div className='flex flex-col space-y-2 px-2 mt-4'>
      {Array.from({ length: 10 }).map((_, index) => (
        <GroupInviteNotification key={index} />
      ))}
    </div>
  );
}
