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
import { Checkbox } from "../../common/ui/checkbox";
import { Text } from "../../common/ui/text";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import ErrorTemp from "../../common/components/shared/error-temp";
import InputPassword from "../../common/ui/input-password";
import GoogleSignIn from "../google-sign-in/google-sign-in";
import useUserStore from "@/modules/store/user-store";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const { signInWithEmailPassword, loading, error } = useAuth();
  const setIsForgotPassword = useUserStore(
    (state) => state.setIsForgotPassword
  );
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
        <InputPassword control={form.control} />

        {!!error && (
          <ErrorTemp
            error={
              error === "fetch failed"
                ? "Oops...Network error!"
                : (error as string)
            }
          />
        )}

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
            onClick={() => setIsForgotPassword(true)}
            type='button'
            className='bg-transparent hover:bg-transparent'>
            <Text
              variant={"p"}
              className='font-normal text-foreground/70 text-blue-600 active:scale-95 transition'>
              Forgot password?
            </Text>
          </Button>
        </div>
        <Button isLoading={loading} type='submit' className='w-full'>
          Login
        </Button>
        <GoogleSignIn className='border border-foreground' />

        <span className='flex items-center space-x-1'>
          <Text variant={"p"} className='font-normal text-foreground/70'>
            Don&apos;t have an account?
          </Text>
          <Button
            onClick={() => router.push("/auth/create-account")}
            type='button'
            variant={"ghost"}
            className='bg-transparent hover:bg-transparent p-0 hover:underline'>
            <Text variant={"p"} className='font-normal text-foreground'>
              Create account
            </Text>
          </Button>
        </span>
      </form>
    </Form>
  );
}
