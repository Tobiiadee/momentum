"use client";

import useSettingsStore from "@/modules/store/use-settings-store";
import React from "react";
import PreviewWithModal from "../preview-with-modal";
import { EditProfileForm } from "./edit-profile-form";

export default function EditProfile() {
  const setEditMyProfile = useSettingsStore((state) => state.setEditMyProfile);
  return (
    <PreviewWithModal
      title='Edit your Profile'
      ariaLabel='close edit profile'
      closeModal={() => setEditMyProfile(false)}
      width='w-[90vw] md:w-[80vw] lg:w-[50vw]'
      >
      <EditProfileForm />
    </PreviewWithModal>
  );
}
