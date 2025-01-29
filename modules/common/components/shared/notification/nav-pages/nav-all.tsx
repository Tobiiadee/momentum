"use client";

import React from "react";
import GroupInviteNotification from "../components/group-invite-notification";
import useNotifications from "@/hooks/use-notification";
import useUserStore from "@/modules/store/user-store";
import SendInviteNotification from "../components/send-invite-notification";
import GroupInviteUserResponseNotification from "../components/group-invite-user-response-notification";
import { sortByCreatedAt } from "@/lib/helpers/helpers";
import { Loader } from "lucide-react";
import GroupInviteCancelled from "../components/group-invite-cancelled";

export default function NavAll() {
  const user = useUserStore((state) => state.user);

  const { notifications, isFetching } = useNotifications(user?.id as string);

  // Group invites
  const groupInvites = sortByCreatedAt(
    notifications?.filter(
      (notification) => notification.type === "group_invite"
    ) || []
  );

  // Sender notifications
  const senderNotifications =
    user?.id === notifications?.[0]?.sender_id
      ? sortByCreatedAt(
          notifications?.filter(
            (notification) => notification.type === "sender_notification"
          ) || []
        )
      : [];

  // Invite responses user
  const inviteUserResponseNotifications = sortByCreatedAt(
    notifications?.filter(
      (notification) => notification.type === "invite_response_user"
    ) || []
  );

  // Invite response
  const inviteResposneNotifications = sortByCreatedAt(
    notifications?.filter(
      (notification) => notification.type === "invite_response"
    ) || []
  );

  //cancelled invite
  const inviteCancelledNotifications = notifications?.filter(
    (notification) =>
      notification.type === "invite_response" &&
      notification.status === "invite_cancelled"
  );

  if (isFetching) {
    return (
      <div className='w-full h-[15vh] grid place-items-center'>
        <Loader size={24} strokeWidth={1.5} className='animate-spin' />
      </div>
    );
  }

  return (
    <div className='flex flex-col space-y-2 px-2 mt-4'>
      {senderNotifications.map((notification, index) => (
        <SendInviteNotification
          created_at={notification.created_at}
          invite_id={notification.invite_id}
          group_id={notification.req_id}
          key={index}
          message={notification.message}
          status={notification.status}
          group_label={notification.group_label}
          index={index}
          sender_id={notification.sender_id}
        />
      ))}
      {groupInvites.map((notification, index) => (
        <GroupInviteNotification
          created_at={notification.created_at}
          inviteId={notification.invite_id}
          group_id={notification.req_id}
          key={index}
          index={index}
          message={notification.message}
        />
      ))}
      {inviteCancelledNotifications?.map((notification, index) => (
        <GroupInviteCancelled
          key={index}
          index={index}
          created_at={notification.created_at}
          message={notification.message}
        />
      ))}
      {inviteUserResponseNotifications.map((notification, index) => (
        <GroupInviteUserResponseNotification
          created_at={notification.created_at}
          key={index}
          index={index}
          message={notification.message}
          status={notification.status}
          group_label={notification.group_label}
        />
      ))}
      {inviteResposneNotifications.map((notification, index) => (
        <GroupInviteUserResponseNotification
          created_at={notification.created_at}
          key={index}
          index={index}
          message={notification.message}
          status={notification.status}
          group_label={notification.group_label}
        />
      ))}
    </div>
  );
}
