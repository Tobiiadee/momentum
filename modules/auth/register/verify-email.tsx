"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";

// import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/modules/common/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/common/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/modules/common/ui/input-otp";
import { useAuth } from "@/hooks/use-auth";
import useUserStore from "@/modules/store/user-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CountdownTimer from "@/modules/common/components/shared/countdown-timer";
import ResendOtp from "./resend-otp";

const verifyEmailSchema = z.object({
  pin: z.string().min(6, {
    message: "The code you entered is invalid.",
  }),
});

export function VerifyEmail() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const { signUpWithUsername, loading, error } = useAuth();
  const signInData = useUserStore((state) => state.signInData);

  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      pin: "",
    },
  });

  const isTimerRunningHandler = (value: boolean) => {
    setIsTimerRunning(value);
  };

  async function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    setIsLoading(true);

    try {
      // Verify OTP
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signInData?.email as string,
          otp: data.pin,
        }),
      });

      if (!res.ok) {
        toast.error(`Error: ${res.status} - ${res.statusText}`);
        setIsLoading(false);
        return;
      }

      const responseData = await res.json();
      setIsLoading(false);

      // Proceed with user signup
      await signUpWithUsername({
        email: signInData?.email as string,
        password: signInData?.password as string,
        username: signInData?.username as string,
      });

      if (error) {
        toast.error(error.toString());
        return;
      }

      router.push("/dashboard");
      console.log("OTP verified successfully:", responseData);
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      toast.error(`Error: ${error}`);
      setIsLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full flex flex-col justify-center items-center space-y-4'>
        <FormField
          control={form.control}
          name='pin'
          render={({ field }) => (
            <FormItem className='w-full flex flex-col justify-center items-center'>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                  <InputOTPGroup className='flex items-center'>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ResendOtp isTimerRunning={isTimerRunning} />

        <div className='flex justify-end'>
          <CountdownTimer
            initialTime={300}
            isTimerRunning={isTimerRunningHandler}
          />
        </div>

        <div className='w-full flex justify-center'>
          <Button
            isLoading={loading || isLoading}
            type='submit'
            className='w-[60%]'>
            Continue
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
