"use client";

import React from "react";
import GroupInviteNotification from "../components/group-invite-notification";
import useNotifications from "@/hooks/use-notification";
import useUserStore from "@/modules/store/user-store";

export default function NavAll() {
  const user = useUserStore((state) => state.user);

  const notifications = useNotifications(user?.id as string);

  const groupInvites = notifications?.filter(
    (notification) => notification.type === "group_invite"
  );

  console.log(notifications);

  return (
    <div className='flex flex-col space-y-2 px-2 mt-4'>
      {groupInvites.map((notification, index) => (
        <GroupInviteNotification
          created_at={notification.created_at}
          inviteId={notification.invite_id}
          group_id={notification.req_id}
          key={index}
          message={notification.message}
        />
      ))}
    </div>
  );
}
