import DaySelector from "@/modules/common/components/shared/day-selector";
import SelectFilter from "@/modules/common/components/shared/select-filter";
import React from "react";

export default function GroupTasks() {
  return (
    <div>
      <div className='flex justify-end'>
        <div className='flex space-x-2 items-center'>
          <DaySelector />
          <SelectFilter />
        </div>
      </div>
    </div>
  );
}
