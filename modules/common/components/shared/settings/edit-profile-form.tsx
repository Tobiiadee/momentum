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
import { Textarea } from "@/modules/common/ui/textarea";
import { useEditProfile } from "@/hooks/use-edit-profile";
import useUserStore from "@/modules/store/user-store";
import useSettingsStore from "@/modules/store/use-settings-store";
// import { toast } from "sonner";

const profileFormSchema = z.object({
  fullName: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  bio: z.string(),
  country: z.string(),
  cityState: z.string(),
});

export function EditProfileForm() {
  const userId = useUserStore((state) => state.user?.id);
  const user = useUserStore((state) => state.user);
  const { editProfileMutate, isEditingProfile } = useEditProfile(
    userId as string
  );
  const setEditMyProfile = useSettingsStore((state) => state.setEditMyProfile);
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: user?.full_name,
      username: user?.username,
      email: user?.email,
      phone: user?.phone_number,
      bio: user?.bio,
      country: user?.country,
      cityState: user?.city_state,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    if (!userId) return;

    const updatedProfile: Partial<UserDataType> = {
      full_name: values.fullName,
      username: values.username,
      email: values.email,
      phone_number: values.phone,
      bio: values.bio,
      country: values.country,
      city_state: values.cityState,
    };
    editProfileMutate(updatedProfile);

    if (!isEditingProfile) {
      setEditMyProfile(false);
    }
  }

  // if (isEditProfileError) {
  //   toast.error("Error updating profile: " + editProfileError?.message);
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
        <div className='flex items-center space-x-4 w-full'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    className='w-full'
                    placeholder='Enter your full name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder='This will be your display name'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex items-center space-x-4 w-full'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    className='w-full'
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    className='w-full'
                    placeholder='Enter your phone number'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex items-center space-x-4 w-full'>
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    className='w-full'
                    placeholder='Enter your country'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cityState'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>City/State</FormLabel>
                <FormControl>
                  <Input
                    className='w-full'
                    placeholder='Enter your city'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='w-full'>
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className='w-full h-32'
                    placeholder='Enter your bio...'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={!form.formState.isValid || isEditingProfile}
          isLoading={isEditingProfile}
          type='submit'>
          Save
        </Button>
      </form>
    </Form>
  );
}
