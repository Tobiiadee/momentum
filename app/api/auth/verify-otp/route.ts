import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Initialize Supabase client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// API handler for POST request
export async function POST(request: NextRequest) {
  try {
    // Parse the body content
    const { email, otp } = await request.json(); // Parse request body

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Check OTP in the database
    const { data, error } = await supabaseAdmin
      .from("otp_codes")
      .select("*")
      .eq("email", email)
      .eq("otp", otp)
      .single();


    if (error || !data) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Check if OTP has expired
    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // Delete OTP from the database after verification
    const { error: deleteOtpError } = await supabaseAdmin
      .from("otp_codes")
      .delete()
      .eq("email", email).single();

    if (deleteOtpError) {
      return NextResponse.json(
        { error: "Failed to delete OTP" },
        { status: 500 }
      );
    }

    // OTP is valid, return success response
    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
