"use client";

import React, { useEffect } from "react";
import DaySelector from "../../shared/day-selector";
import SelectFilter from "../../shared/select-filter";
import PersonalTask from "../../task/personal-task";
import useUserStore from "@/modules/store/user-store";
import { useNewTask } from "@/hooks/use-new-task";
import useSortArrayStore from "@/modules/store/sort-array-store";

export default function PersonalMain() {
  const user = useUserStore((state) => state.user);
  const {
    refetchAllTasks,
    isLoadingAllTasks,
    isAllTasksError,
    allTasks,
    allTasksError,
  } = useNewTask(user?.id as string);
  const setDataOnLoad = useSortArrayStore((state) => state.setSortData);

  const sortedTasks = useSortArrayStore((state) => state.sortData);
  const personalTask = allTasks?.filter((task) => task.list_label === "personal");

  useEffect(() => {
    refetchAllTasks();
    if (!isLoadingAllTasks && personalTask) {
      setDataOnLoad(personalTask);
    }
  }, [isLoadingAllTasks]);

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex justify-end'>
        <div className='flex space-x-2 items-center'>
          <DaySelector />
          <SelectFilter sortData={personalTask} />
        </div>
      </div>

      <div className='flex flex-col space-y-2 overflow-y-auto pb-14 h-[75vh] pl-2 py-2 pr-2'>
        <PersonalTask
          task={sortedTasks ? sortedTasks : personalTask}
          isError={isAllTasksError}
          isLoading={isLoadingAllTasks}
          error={allTasksError}
        />
      </div>
    </div>
  );
}
