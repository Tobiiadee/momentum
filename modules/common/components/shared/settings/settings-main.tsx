import { Text } from "@/modules/common/ui/text";
import React from "react";
import SettingsNav from "./settings-nav";
import { WrenchIcon } from "lucide-react";
// import ProfileBio from "./profile-bio";

export default function SettingsMain() {
  return (
    <div className='w-full flex flex-col space-y-4 h-[84vh] overflow-y-auto overflow-x-hidden'>
      <div className='flex flex-col border-b border-foreground/10 pb-2'>
        <Text variant={"h2"} className=''>
          Settings
        </Text>
        <div className='flex items-center space-x-1'>
          <Text variant={"h5"} className='text-foreground/60'>
            Manage your account settings and prefrences
          </Text>
          <WrenchIcon
            strokeWidth={1.5}
            size={16}
            className='text-foreground/60'
          />
        </div>
      </div>

      <SettingsNav />

      {/* <ProfileBio /> */}
    </div>
  );
}
