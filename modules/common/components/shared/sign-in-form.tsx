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
import { Checkbox } from "../../ui/checkbox";
import { Text } from "../../ui/text";
import { useRouter } from "next/navigation";
import { GoogleSignIn } from "./sign-in-page";
// import { signIn } from "@/modules/supabase/auth-fn";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignInForm() {
  const router = useRouter();
  const {signInWithEmailPassword, loading, } = useAuth();
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    signInWithEmailPassword(values.email, values.password);
    // router.push("/dashboard");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 w-[80%] lg:w-[60%]'>
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter your password'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between items-center'>
          <div className='flex space-x-2 items-center'>
            <Checkbox name='remember' id='remember' />
            <label htmlFor='remember'>
              <Text
                id='remember'
                variant={"p"}
                className='text-foreground/70 hover:text-foreground cursor-pointer'>
                Remember for 30 days
              </Text>
            </label>
          </div>
          <Button
            variant={"ghost"}
            type='button'
            className='bg-transparent hover:bg-transparent'>
            <Text
              variant={"p"}
              className='font-normal text-foreground/70 text-blue-600'>
              Forgot password?
            </Text>
          </Button>
        </div>
        <Button isLoading={loading} type='submit' className='w-full'>
          Sign in
        </Button>
        <GoogleSignIn className='border border-foreground' />

        <span className='flex items-center space-x-1'>
          <Text variant={"p"} className='font-normal text-foreground/70'>
            Don&apos;t have an account?
          </Text>
          <Button
            onClick={() => router.push("/auth/onboarding")}
            type='button'
            variant={"ghost"}
            className='bg-transparent hover:bg-transparent p-0 hover:underline'>
            <Text variant={"p"} className='font-normal text-foreground'>
              Sign up
            </Text>
          </Button>
        </span>
      </form>
    </Form>
  );
}
