import React from "react";
import TodaysTask from "../../shared/todays-task";
import DaySelector from "../../shared/day-selector";
import SelectFilter from "../../shared/select-filter";
import { Text } from "@/modules/common/ui/text";

export default function HomeMain() {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex justify-between items-center'>
        <Text variant={"h4"}>Today&apos;s task</Text>
        <div className='flex space-x-2 items-center'>
          <DaySelector />
          <SelectFilter />
        </div>
      </div>

      <div className='flex flex-col space-y-2 overflow-y-auto pb-14 h-[75vh] pl-2 py-2 pr-2'>
        <TodaysTask />
      </div>
    </div>
  );
}
