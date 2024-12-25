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
import { Text } from "@/modules/common/ui/text";

const verifyEmailSchema = z.object({
  pin: z.string().min(6, {
    message: "The code you entered is invalid.",
  }),
});

export function VerifyEmail() {
  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    console.log(data);
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
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex justify-center items-center space-x-1'>
          <Text variant={"p"} className='text-foreground/50 text-center'>
            Didn&apos;t receive the code?
          </Text>

          <Button type='button' variant={"link"} className='p-0'>
            <Text variant={"p"} className='font-semibold'>
              Click to resend
            </Text>
          </Button>
        </div>
        <div className='w-full flex justify-center'>
          <Button type='submit' className='w-[60%]'>
            Continue
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
