/*eslint-disable @typescript-eslint/no-explicit-any*/

import { addMembersToGroup } from "@/modules/supabase/utils/actions";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await req.json();

  const { user_id, status } = body;

  try {
    const { data: invite, error: statusUpdateError } = await supabaseAdmin
      .from("invite_table")
      .update({ status })
      .eq("reciever_id", user_id)
      .select()
      .single();

    if (statusUpdateError) throw statusUpdateError;

    if (status === "accepted") {
      //add user to the group

      const newMember: AddMemberType = {
        member_id: invite.reciever_id,
        role: "Member",
        created_at: new Date().toISOString(),
      };
      await addMembersToGroup(invite.group_id, [newMember]);

      //notify sender
      const { error: notifyError } = await supabaseAdmin
        .from("notification_table")
        .insert([
          {
            user_id: invite.sender_id,
            type: `invite_${status}`,
            message: `User ${
              invite.reciever_id
            } has ${status.toLowerCase()} your invite.`,
          },
        ]);

      if (notifyError) throw notifyError.message;
    }

    return NextResponse.json(
      { message: `invite ${status}` },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
