"use client";

import { Button } from "@/modules/common/ui/button";
import { Input } from "@/modules/common/ui/input";
import Modal from "@/modules/common/ui/modal";
import { Text } from "@/modules/common/ui/text";
import useUserStore from "@/modules/store/user-store";
import React from "react";
import PreviewWithModal from "@/modules/common/components/shared/preview-with-modal";

export default function ForgotPassword() {
  const setIsForgotPassword = useUserStore(
    (state) => state.setIsForgotPassword
  );

  return (
    <Modal
      onClick={() => setIsForgotPassword(false)}
      className='bg-foreground/30 backdrop-blur-sm'>
      <PreviewWithModal
        title='Reset your password'
        width="w-[25rem]"
        closeModal={() => setIsForgotPassword(false)}
        ariaLabel='close modal'>
        <form className='flex flex-col space-y-4'>
          <div className='flex flex-col space-y-1'>
            <label htmlFor='email'>
              <Text variant={"p"}>Email</Text>
            </label>
            <Input name='email' placeholder='Enter your email' />
          </div>

          <Button variant={"default"}>Reset Password</Button>
        </form>
        <div className='w-full px-4 mt-4'>
          <Text variant={"p"} className='text-foreground/60 italic text-xs'>
            We will send you a link to your email to reset your password.
          </Text>
        </div>
      </PreviewWithModal>
    </Modal>
  );
}
