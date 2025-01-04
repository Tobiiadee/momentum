"use client";

import { Button } from "@/modules/common/ui/button";
import { FormLabel } from "@/modules/common/ui/form";
import { Input } from "@/modules/common/ui/input";
import Modal from "@/modules/common/ui/modal";
import { Text } from "@/modules/common/ui/text";
import useUserStore from "@/modules/store/user-store";
import { X } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { previewVariant } from "@/modules/common/components/shared/task-main/preview-task";

export default function ForgotPassword() {
  const setIsForgotPassword = useUserStore(
    (state) => state.setIsForgotPassword
  );

  return (
    <Modal
      onClick={() => setIsForgotPassword(false)}
      className='bg-foreground/30 backdrop-blur-sm'>
      <motion.div
        variants={previewVariant}
        initial='hidden'
        animate='visible'
        exit={"exit"}
        className='absolute top-1/3 -translate-y-1/3 left-1/3 -translate-x-1/3 z-50 w-96 h-max bg-background rounded-lg shadow-md pb-4'>
        <div className='flex items-center justify-between px-4 border-b py-1'>
          <Text variant={"p"} className='font-semibold'>
            Reset your password
          </Text>
          <Button
            onClick={() => setIsForgotPassword(false)}
            variant={"ghost"}
            size={"sm"}
            className='rounded-full group px-[7px]'>
            <X
              size={20}
              strokeWidth={1.5}
              className='text-foreground/60 group-hover:text-foreground'
            />
          </Button>
        </div>

        <form className='px-4 mt-4 flex flex-col space-y-4'>
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
      </motion.div>
    </Modal>
  );
}
