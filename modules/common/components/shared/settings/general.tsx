import React from "react";
import ProfileBio from "./profile-bio";
import { Text } from "@/modules/common/ui/text";
import PersonalInfo from "./personal-info";
import GeneralPrefrences from "./general-prefrences";
import { Separator } from "@/modules/common/ui/separator";

export default function General() {
  return (
    <div className='flex flex-col space-y-4'>
      <Text variant={"h5"} className='font-medium'>
        My Profile
      </Text>
      <ProfileBio />
      <Separator className='w-full' />
      <PersonalInfo />
      <Separator className='w-full' />
      <GeneralPrefrences />
    </div>
  );
}
