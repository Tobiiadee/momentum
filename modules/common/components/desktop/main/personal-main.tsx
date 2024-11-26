import React from "react";
import DaySelector from "../../shared/day-selector";
import SelectFilter from "../../shared/select-filter";
import PersonalTask from "../../shared/personal-task";

export default function PersonalMain() {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex justify-end'>
        <div className='flex space-x-2 items-center'>
          <DaySelector />
          <SelectFilter />
        </div>
      </div>

      <div className='flex flex-col space-y-2 overflow-y-auto h-[60vh] pl-2 py-2 pr-2'>
        <PersonalTask />
      </div>
    </div>
  );
}
