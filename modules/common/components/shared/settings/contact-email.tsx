"use client";

// import { Button } from "@/modules/common/ui/button";
import { Input } from "@/modules/common/ui/input";
import { Text } from "@/modules/common/ui/text";
import React from "react";
import EditButton from "./edit-button";
import useUserStore from "@/modules/store/user-store";

export default function ContactEmail() {
  const { user } = useUserStore();
  const [editEmail, setEditEmail] = React.useState(false);
  const [email, setEmail] = React.useState(user?.email);

  const emailRef = (element: HTMLInputElement) => {
    if (element && editEmail) {
      element.focus();
    }
  };

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex flex-col'>
        <Text variant={"p"} className='font-medium'>
          Contact Email
        </Text>
        <Text variant={"p"} className='font-normal text-foreground/70 text-xs'>
          Manage your contact email
        </Text>
      </div>

      <div className='flex justify-between items-center'>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          pattern='.+@example\.com'
          ref={emailRef}
          value={email}
          placeholder='Email'
          readOnly={!editEmail}
          className='w-1/2'
        />
        {!editEmail ? (
          <EditButton text='Edit' editFn={() => setEditEmail(true)} />
        ) : (
          <EditButton text='Save' editFn={() => setEditEmail(false)} />
        )}
      </div>
    </div>
  );
}
