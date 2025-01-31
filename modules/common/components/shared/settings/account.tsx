import { Text } from "@/modules/common/ui/text";
import React from "react";
import ContactEmail from "./contact-email";
import PasswordChange from "./password-change";
import { Separator } from "@/modules/common/ui/separator";
import AccountIntegration from "./account-integration";
import DeleteAccount from "./delete-account";

export default function Account() {
  return (
    <div className='flex flex-col space-y-6'>
      <Text variant={"h5"} className='font-medium'>
        Account Settings
      </Text>
      <ContactEmail />
      <Separator className='w-full' />
      <PasswordChange />
      <Separator className='w-full' />
      <AccountIntegration />
      <Separator className='w-full' />
      <div className='flex flex-col space-y-4'>
        <Text variant={"h5"} className='font-semibold text-red-600'>
          Danger Zone
        </Text>
        <DeleteAccount />
      </div>
    </div>
  );
}
