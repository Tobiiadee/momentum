"use client";

import React from "react";
import GroupInviteNotification from "./group-invite-notification";
import useUserStore from "@/modules/store/user-store";
import useNotifications from "@/hooks/use-notification";
// import SendInviteNotification from "./send-invite-notification";
import GroupInviteResponseNotification, {
  NotificationStatusType,
} from "./group-invite-response-notification";
import { Loader } from "lucide-react";
import GroupInviteCancelled from "./group-invite-cancelled";
import SendInviteNotification from "./send-invite-notification";
import GroupInviteUserResponseNotification from "./group-invite-user-response-notification";

export default function GroupNotification() {
  const user = useUserStore((state) => state.user);

  const { notifications, isFetching } = useNotifications(user?.id as string);

  //Group invites
  const groupInvites = notifications?.filter(
    (notification) => notification.type === "group_invite"
  );

  //Sender notifications
  const senderNotifications =
    user?.id === notifications?.[0]?.sender_id
      ? notifications?.filter(
          (notification) =>
            notification.type === "sender_notification" &&
            notification.invite_state === "invite_sent"
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
    <div className='flex flex-col space-y-2'>
      {senderNotifications?.map((notification, index) => (
        <SendInviteNotification
          created_at={notification.created_at}
          invite_id={notification.invite_id}
          group_id={notification.req_id}
          key={index}
          index={index}
          group_label={notification.group_label as string}
          status={notification.status as NotificationStatusType}
          message={notification.message}
          sender_id={notification.sender_id}
        />
      ))}
      {/* <GroupTaskNotification /> */}
      {/* <MemberAddedNotification /> */}
      {inviteCancelledNotifications?.map((notification, index) => (
        <GroupInviteCancelled
          key={index}
          index={index}
          created_at={notification.created_at}
          message={notification.message}
        />
      ))}
      {groupInvites?.map((notification, index) => (
        <GroupInviteNotification
          created_at={notification.created_at}
          inviteId={notification.invite_id}
          group_id={notification.req_id}
          key={index}
          index={index}
          message={notification.message}
        />
      ))}

      {inviteUserResponseNotifications?.map((notification, index) => (
        <GroupInviteResponseNotification
          created_at={notification.created_at}
          key={index}
          index={index}
          message={notification.message}
          status={notification?.status as NotificationStatusType}
          group_label={notification?.group_label as string}
          invite_id={notification?.invite_id as string}
        />
      ))}

      {inviteResposneNotifications?.map((notification, index) => (
        <GroupInviteUserResponseNotification
          created_at={notification.created_at}
          key={index}
          index={index}
          message={notification.message}
          status={notification.status as NotificationStatusType}
          group_label={notification.group_label as string}
        />
      ))}
    </div>
  );
}
