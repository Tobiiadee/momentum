import React from "react";
import ProfileBio from "./profile-bio";
import { Text } from "@/modules/common/ui/text";
import PersonalInfo from "./personal-info";

export default function Profile() {
  return (
    <div className='flex flex-col space-y-4'>
      <Text variant={"h5"} className='font-medium'>
        My Profile
      </Text>
      <ProfileBio />
      <PersonalInfo />
    </div>
  );
}
