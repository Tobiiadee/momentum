"use client";

import useUserStore from "@/modules/store/user-store";
import React from "react";
import ForgotPassword from "./forgot-password";

export default function ForgotPasswordClient() {
  const isForgotPassword = useUserStore((state) => state.isForgotPassword);

  return (
    <div className=''>{isForgotPassword && <ForgotPassword />}</div>
  );
}
