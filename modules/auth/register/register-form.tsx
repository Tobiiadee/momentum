"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/modules/common/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/common/ui/form";
import { Input } from "@/modules/common/ui/input";
import { Text } from "../../common/ui/text";
import { useRouter } from "next/navigation";
import InputPassword from "../../common/ui/input-password";
import GoogleSignIn from "../google-sign-in/google-sign-in";
import useUserStore from "@/modules/store/user-store";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Enter a valid username.",
  }),
  email: z.string().min(2, {
    message: "Enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const setUserConfirmation = useUserStore(
    (state) => state.setUserConfirmation
  );
  const setSignInData = useUserStore((state) => state.setSignInData);

  const date = new Date(Date.now() + 5 * 60 * 1000);
  console.log(date);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Send OTP request
      const res = await fetch("/api/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          recipientName: values.username,
        }),
      });

      if (!res.ok) {
        toast.error(`Error: ${res.status} - ${res.statusText}`);
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setIsLoading(false);

      // Set confirmation state
      setUserConfirmation(true);
      setSignInData({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      console.log("OTP sent successfully:", data);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      // Optionally, you can show an error message to the user here
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 w-[80%] lg:w-[60%]'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Choose a username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <InputPassword control={form.control} />

        <Button isLoading={isLoading} type='submit' className='w-full'>
          Create account
        </Button>
        <GoogleSignIn className='border border-foreground' />

        <span className='flex items-center space-x-1'>
          <Text variant={"p"} className='font-normal text-foreground/70'>
            Already have an account?
          </Text>
          <Button
            onClick={() => router.push("/auth/login")}
            type='button'
            variant={"ghost"}
            className='bg-transparent hover:bg-transparent p-0 hover:underline'>
            <Text variant={"p"} className='font-normal text-foreground'>
              Login
            </Text>
          </Button>
        </span>
      </form>
    </Form>
  );
}
