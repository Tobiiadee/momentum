"use client";

import useUserStore from "@/modules/store/user-store";
import React from "react";
import ForgotPassword from "./forgot-password";
import { AnimatePresence } from "framer-motion";

export default function ForgotPasswordClient() {
  const isForgotPassword = useUserStore((state) => state.isForgotPassword);

  return (
    <div className=''>
      <AnimatePresence mode='wait'>
        {isForgotPassword && <ForgotPassword />}
      </AnimatePresence>
    </div>
  );
}
