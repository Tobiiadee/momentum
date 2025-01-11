import { sendEmail } from "@/lib/utils/send-mail";
import { OtpEmailTemplate } from "@/modules/email/otp-mail-template";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { NextResponse } from "next/server";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Generate a random OTP
const generateOTP = (length = 6): string => {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
};

// Define the POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, recipientName } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
    // const expiresAtISOString = `${expiresAt.toISOString()}`;

  
    // Save OTP to the database
    const { error } = await supabase
      .from("otp_codes")
      .insert({ email, otp, expires_at: expiresAt });

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json(
        { error: "Failed to insert OTP into the database" },
        { status: 500 }
      );
    }

    // Send OTP email
    await sendEmail(
      email,
      "Your Momentum Verification Code is Here",
      OtpEmailTemplate({ otp, recipientName })
    );

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
