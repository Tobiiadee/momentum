"use client";

import useSettingsStore from "@/modules/store/use-settings-store";
import React from "react";
import EditProfile from "./edit-profile";
import { AnimatePresence } from "framer-motion";

export default function EditClient() {
  const editProfile = useSettingsStore((state) => state.editMyProfile);

  return (
    <div>
      <AnimatePresence mode='wait'>
        {editProfile && <EditProfile />}
      </AnimatePresence>
    </div>
  );
}
