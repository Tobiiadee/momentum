import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import useUserStore from "@/modules/store/user-store";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface ResendOtpProps {
  isTimerRunning: boolean;
}

export default function ResendOtp({ isTimerRunning }: ResendOtpProps) {
  const [isSendingOTP, setIsSendingOTP] = useState(false);

  const signInData = useUserStore((state) => state.signInData);

  //Resend OTP
  const resendOTP = async () => {
    setIsSendingOTP(true);
    try {
      // Send OTP request
      const res = await fetch("/api/auth/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signInData?.email as string,
          recipientName: signInData?.username as string,
        }),
      });

      if (!res.ok) {
        toast.error(`Error: ${res.status} - ${res.statusText}`);
        setIsSendingOTP(false);
        return;
      }

      const data = await res.json();
      setIsSendingOTP(false);

      console.log("OTP sent successfully:", data);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <div className='w-full flex justify-center items-center space-x-1'>
      <Text variant={"p"} className='text-foreground/50 text-center'>
        Didn&apos;t receive the code?
      </Text>

      <Button
        onClick={resendOTP}
        type='button'
        disabled={isTimerRunning}
        variant={"link"}
        className='p-0 flex items-center space-x-2'>
        <Text variant={"p"} className='font-semibold'>
          Click to resend
        </Text>
        {isSendingOTP && (
          <Loader
            size={16}
            strokeWidth={1.5}
            className='text-foreground/60 animate-spin'
          />
        )}
      </Button>
    </div>
  );
}
