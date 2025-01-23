/*eslint-disable @typescript-eslint/no-explicit-any*/

import { fetchGroup } from "@/modules/supabase/utils/actions";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await req.json();
  const { groupId, senderId, receiverIds, inviteId } = body;

  try {
    // Prepare data for inserting multiple invites
    const invites = receiverIds.map((receiverId: string) => ({
      invite_id: inviteId, // Generate a unique invite ID per invite if needed
      group_id: groupId,
      sender_id: senderId,
      reciever_id: receiverId,
      status: "pending",
    }));

    // Insert multiple invites
    const { error: tableError } = await supabaseAdmin
      .from("invite_table")
      .insert(invites)
      .select();

    if (tableError) throw tableError;

    //fetch group
    const group = await fetchGroup(groupId);

    if (group) {
      // Prepare data for inserting notifications
      const notifications = receiverIds.map((receiverId: string) => ({
        user_id: receiverId,
        invite_state: "invite_sent",
        message: `You have been invited to ${group?.label} group`,
        type: "group_invite",
        req_id: groupId,
        invite_id: inviteId,
        sender_id: senderId,
      }));

      //send notification to sender
      const senderNotification = {
        user_id: senderId,
        invite_state: "invite_sent",
        message: `You sent group invites to ${receiverIds.length} users`,
        type: "sender_notification",
        req_id: groupId,
        invite_id: inviteId,
        sender_id: senderId,
      };

      // Insert multiple notifications
      const { error: notificationError } = await supabaseAdmin
        .from("notification_table")
        .insert([senderNotification, ...notifications])
        .select();

      if (notificationError) throw notificationError;
    }

    return NextResponse.json(
      { message: "Invites sent successfully" },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
