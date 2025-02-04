interface OtpMailProps {
  otp: string;
  recipientName: string;
}

export function OtpEmailTemplate({ otp, recipientName }: OtpMailProps) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://sszfkjhhhrlgppwepmlv.supabase.co/storage/v1/object/public/logo/momentum_logo.png" alt="Momentum Logo" width="100" style="display: block; margin: 0 auto;" />
            <h1 style="font-size: 24px; color: #000000;">Momentum</h1>
          </div>

          <h2 style="color: #000000; text-align: center;">Your OTP Code</h2>
          <p>Dear ${recipientName},</p>
          <p>Use the OTP code below to complete your request:</p>

          <div style="text-align: center; font-size: 24px; font-weight: bold; color: #000000; padding: 10px; border: 2px dashed #000000; background-color: #f9f9f9; display: inline-block;">
            ${otp}
          </div>

          <p>This code is valid for the next <strong>5 minutes</strong>. Please do not share it with anyone.</p>
          <p>If you did not request this code, you can ignore this email.</p>

          <p style="text-align: center; font-size: 0.8em; color: #666; margin-top: 20px;">
            &copy; ${new Date().getFullYear()} Momentum. All rights reserved.
            <br />
            <small>If you believe this email was sent in error, you can <a href="#" style="color: #666;">unsubscribe</a>.</small>
          </p>

        </div>
      </body>
      </html>
    `;
}
