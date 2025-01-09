import AllGroupsMain from "@/modules/common/components/desktop/main/all-groups-main";
import AllListMain from "@/modules/common/components/desktop/main/all-list-main";
import { Separator } from "@/modules/common/ui/separator";
import { Text } from "@/modules/common/ui/text";
import React from "react";

export default function Page() {
  return (
    <div className='flex flex-col space-y-10 w-full h-[80vh] overflow-y-auto pb-6'> 
      <Text variant={"h4"} className='font-medium'>
        Your custom lists and groups
      </Text>
      <AllListMain />
      <Separator className='w-full' />
      <AllGroupsMain />
    </div>
  );
}
