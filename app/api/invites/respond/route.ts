/*eslint-disable @typescript-eslint/no-explicit-any*/

import {
  addMembersToGroup,
  fetchGroup,
  fetchUser,
} from "@/modules/supabase/utils/actions";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const body = await req.json();
    const { user_id, status } = body;

    if (!user_id || !status) {
      return NextResponse.json(
        { error: "user_id and status are required" },
        { status: 400 }
      );
    }

    //fetch user
    const user = await fetchUser(user_id);

    // Update invite status
    const { data: invite, error: statusUpdateError } = await supabaseAdmin
      .from("invite_table")
      .update({ status })
      .eq("reciever_id", user_id)
      .select()
      .single();

    if (statusUpdateError) throw new Error(statusUpdateError.message);

    //fetch group
    const group = await fetchGroup(invite.group_id);

    if (status === "accepted") {
      // Add user to the group
      const newMember: AddMemberType = {
        member_id: invite.reciever_id,
        role: "Member",
        created_at: new Date().toISOString(),
      };

      await addMembersToGroup(invite.group_id, [newMember]);

      //remove notification from table
      const { error: removeError } = await supabaseAdmin
        .from("notification_table")
        .delete()
        .eq("user_id", user_id)
        .eq("invite_id", invite.invite_id);

      if (removeError) throw new Error(removeError.message);

      // Notify sender
      const { error: notifyError } = await supabaseAdmin
        .from("notification_table")
        .insert([
          {
            user_id: invite.sender_id,
            type: `invite_response`,
            message: `User ${
              user.username
            } has ${status.toLowerCase()} your invite.`,
            invite_state: "invite_accepted",
          },
        ]);

      if (notifyError) throw new Error(notifyError.message);

      //notify user
      const { error: notifyUserError } = await supabaseAdmin
        .from("notification_table")
        .insert([
          {
            user_id: user_id,
            type: `invite_response_user`,
            message: `You have ${status.toLowerCase()} the invite from ${
              group?.label
            }.`,
            invite_state: "invite_accepted",
          },
        ]);

      if (notifyError) throw new Error(notifyUserError?.message);
    }

    if (status === "declined") {
      //remove notification from table
      const { error: removeError } = await supabaseAdmin
        .from("notification_table")
        .delete()
        .eq("user_id", user_id)
        .eq("invite_id", invite.invite_id);

      if (removeError) throw new Error(removeError.message);

      // Notify sender
      const { error: notifyError } = await supabaseAdmin
        .from("notification_table")
        .insert([
          {
            user_id: invite.sender_id,
            type: `invite_response`,
            message: `User ${
              user.username
            } has ${status.toLowerCase()} your invite.`,
            invite_state: "invite_declined",
          },
        ]);

      if (notifyError) throw new Error(notifyError.message);

      //notify user
      const { error: notifyUserError } = await supabaseAdmin
        .from("notification_table")
        .insert([
          {
            user_id: user_id,
            type: `invite_response_user`,
            message: `You have ${status.toLowerCase()} the invite. from ${
              group?.label
            }`,
            invite_state: "invite_declined",
          },
        ]);

      if (notifyError) throw new Error(notifyUserError?.message);
    }

    return NextResponse.json({ message: `Invite ${status}` }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
