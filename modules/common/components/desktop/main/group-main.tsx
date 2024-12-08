import React from "react";
import DaySelector from "../../shared/day-selector";
import SelectFilter from "../../shared/select-filter";
import NoTask from "../../shared/no-task";

export default function GroupMain() {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex justify-end'>
        <div className='flex space-x-2 items-center'>
          <DaySelector />
          <SelectFilter />
        </div>
      </div>

      <NoTask module='group' />

      <div className='flex flex-col space-y-2 overflow-y-auto pb-14 h-[70vh] pl-2 py-2 pr-2'></div>
    </div>
  );
}
