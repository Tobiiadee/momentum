"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/modules/common/ui/button";
import { Form } from "@/modules/common/ui/form";
import InputPassword from "@/modules/common/ui/input-password";
import { Text } from "@/modules/common/ui/text";

const formSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
  });

export default function PasswordChange() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col'>
        <Text variant={"p"} className='font-medium'>
          Password
        </Text>
        <Text variant={"p"} className='font-normal text-foreground/70 text-xs'>
          Modify your password
        </Text>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2 w-1/2'>
          <InputPassword
            control={form.control}
            placeholder='Enter your current password'
            label='Current Password'
          />
          <InputPassword
            control={form.control}
            placeholder='Enter your new password'
            label='New Password'
          />
          <InputPassword
            control={form.control}
            placeholder='Confirm your password'
            label='Confirm New Password'
          />
          <div className=''>
            <Button type='submit' className="mt-4">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
