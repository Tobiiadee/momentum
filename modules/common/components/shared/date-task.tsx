import React from "react";
import { Text } from "../../ui/text";

export default function DateTask() {
  return (
    <div className='flex flex-col space-y-4'>
      <Text variant={"p"} className='text-center'>
        You have 4 tasks due today
      </Text>
      <div className='flex flex-col space-y-2'>
        <DateTaskItem />
        <DateTaskItem />
        <DateTaskItem />
      </div>
    </div>
  );
}

function DateTaskItem() {
  return (
    <div className='bg-background px-2 py-1 flex justify-between items-center shadow cursor-pointer rounded'>
      <Text variant={"p"} className=''>
        Starting my clearance
      </Text>

      <div className='grid place-items-center p-1 bg-foreground/10 rounded'>
        <Text variant={"p"} className='text-xs'>
          10am - 12pm
        </Text>
      </div>
    </div>
  );
}
