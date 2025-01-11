import { Input } from "@/modules/common/ui/input";
import { Text } from "@/modules/common/ui/text";
import React from "react";

export default function GeneralPrefrences() {
  return (
    <div className='flex flex-col space-y-4'>
      <Text variant={"h5"} className='font-medium'>
        Preferences
      </Text>

      <MaxNumberOfTaskPerDay />
    </div>
  );
}

function MaxNumberOfTaskPerDay() {
  return (
    <div className='w-[60%] flex items-center justify-between'>
      <Text variant={"p"} className='font-medium'>
        Maximum number of tasks per day
      </Text>
      <Input type='number' min={1} placeholder='' defaultValue={1} className='w-[80px] border-foreground' />
    </div>
  );
}
