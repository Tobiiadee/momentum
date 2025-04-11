import React from "react";
import TodaysTask from "../../task/todays-task";
import SelectFilter from "../../shared/select-filter";
import { Text } from "@/modules/common/ui/text";
import HomeCalendar from "../../shared/home-calendar";
import HomeTimer from "../../shared/home-timer";

export default function HomeMain() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 h-full w-full'>
      <div className='flex flex-col space-y-4 col-span-1 md:col-span-2 w-full'>
        <div className='flex justify-between items-center'>
          <Text variant={"h4"}>Today&apos;s task</Text>
          <div className='flex space-x-2 items-center'>
            <SelectFilter />
          </div>
        </div>

        <div className='flex flex-col space-y-2 overflow-y-auto pb-14 h-[75vh] pl-2 px-2 md:px-0'>
          <TodaysTask />
        </div>
      </div>
      <div className='col-span-1 w-full flex flex-col space-y-4 '>
        <HomeCalendar />
        <HomeTimer />
      </div>
    </div>
  );
}
