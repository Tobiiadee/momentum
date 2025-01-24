"use client";

import React from "react";
import GroupInviteNotification from "../components/group-invite-notification";
import useNotifications from "@/hooks/use-notification";
import useUserStore from "@/modules/store/user-store";
import SendInviteNotification from "../components/send-invite-notification";
import GroupInviteResponseNotification from "../components/group-invite-response-notification";

export default function NavAll() {
  const user = useUserStore((state) => state.user);

  const notifications = useNotifications(user?.id as string);

  //Group invites
  const groupInvites = notifications?.filter(
    (notification) => notification.type === "group_invite"
  );

  //Sender notifications
  const senderNotifications =
    user?.id === notifications?.[0]?.sender_id
      ? notifications?.filter(
          (notification) => notification.type === "sender_notification"
        )
      : [];

  //Invite responses user
  const inviteUserResponseNotifications = notifications?.filter(
    (notification) => notification.type === "invite_response_user"
  );

  //invite response
  const inviteResposneNotifications = notifications?.filter(
    (notification) => notification.type === "invite_response"
  );

  return (
    <div className='flex flex-col space-y-2 px-2 mt-4'>
            {senderNotifications.map((notification, index) => (
              <SendInviteNotification
                created_at={notification.created_at}
                inviteId={notification.invite_id}
                group_id={notification.req_id}
                key={index}
                message={notification.message}
              />
            ))}
            {/* <GroupTaskNotification /> */}
            {/* <MemberAddedNotification /> */}
            {groupInvites.map((notification, index) => (
              <GroupInviteNotification
                created_at={notification.created_at}
                inviteId={notification.invite_id}
                group_id={notification.req_id}
                key={index}
                message={notification.message}
              />
            ))}
      
            {inviteUserResponseNotifications.map((notification, index) => (
              <GroupInviteResponseNotification
                created_at={notification.created_at}
                key={index}
                message={notification.message}
              />
            ))}
      
            {inviteResposneNotifications.map((notification, index) => (
              <GroupInviteResponseNotification
                created_at={notification.created_at}
                key={index}
                message={notification.message}
              />
            ))}
    </div>
  );
}
