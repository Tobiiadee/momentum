/*eslint-disable @typescript-eslint/no-explicit-any*/

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.rpc("get_user_by_email", {
      query: email,
    });

    if (!error) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    return NextResponse.json({ message: "success", data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
