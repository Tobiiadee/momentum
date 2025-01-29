/*eslint-disable @typescript-eslint/no-explicit-any*/

import { fetchGroup, fetchUser } from "@/modules/supabase/utils/actions";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const body = await req.json();
    const { invite_id, group_id, reciever_id } = body;

    // Validate input
    if (!invite_id || !group_id || !reciever_id) {
      return NextResponse.json(
        { error: "invite_id, sender_id, and group_id are required" },
        { status: 400 }
      );
    }

    //fetch group
    const group = await fetchGroup(group_id);

    //fetch user
    const reciever_data = await fetchUser(reciever_id);

    // Update invite status to "cancelled"
    const { data: invite, error: updateError } = await supabaseAdmin
      .from("invite_table")
      .update({ status: "cancelled" })
      .eq("group_id", group_id)
      .eq("invite_id", invite_id)
      .eq("reciever_id", reciever_id)
      .select()
      .single();

    if (updateError) throw updateError;

    //remove notification from notification table
    const { error: removeError } = await supabaseAdmin
      .from("notification_table")
      .delete()
      .eq("user_id", reciever_id)
      .eq("req_id", group_id)
      .eq("invite_id", invite_id);

    if (removeError) throw removeError;

    // Notify the sender
    const { error: notifyError } = await supabaseAdmin
      .from("notification_table")
      .insert([
        {
          user_id: invite.sender_id,
          type: "invite_response",
          message: `You cancelled ${reciever_data.username}'s invite to ${group?.label}`,
          status: "cancelled",
          invite_state: "invite_cancelled",
          invite_id: invite_id,
          reciever_id: reciever_id,
        },
      ]);

    if (notifyError) throw notifyError;

    return NextResponse.json(
      { message: "Invite cancelled successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
