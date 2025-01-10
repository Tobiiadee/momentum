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
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #000000;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header img {
            max-width: 150px;
            margin-bottom: 10px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            color: #000000;
          }
          h2 {
            color: #000000;
            text-align: center;
          }
          p {
            margin: 10px 0;
          }
          .otp-box {
            margin: 20px 0;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #000000;
            padding: 10px;
            border: 2px dashed #000000;
            display: inline-block;
            background-color: #f9f9f9;
          }
          footer {
            margin-top: 20px;
            font-size: 0.8em;
            text-align: center;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://via.placeholder.com/150?text=Momentum+Logo" alt="Momentum Logo" />
            <h1>Momentum</h1>
          </div>
          <h2>Your OTP Code</h2>
          <p>Dear ${recipientName},</p>
          <p>Thank you for choosing Momentum! We are excited to have you on board and appreciate your trust in us to help manage your tasks effectively.</p>
          <p>To proceed, use the OTP code below:</p>
          <div class="otp-box">${otp}</div>
          <p>This code is valid for the next 5 minutes. Please do not share it with anyone.</p>
          <p>If you did not request this code, you can safely ignore this email.</p>
          <p>Once again, thank you for choosing Momentum. We are here to make task management simpler and more efficient for you!</p>
          <p>Best regards,</p>
          <p>The Momentum Team</p>
  
          <footer>&copy; ${new Date().getFullYear()} Momentum. All rights reserved.</footer>
        </div>
      </body>
      </html>
    `;
}
