"use client";

import React, { useEffect } from "react";
import DaySelector from "../../shared/day-selector";
import SelectFilter from "../../shared/select-filter";
import { useParams } from "next/navigation";
import useUserStore from "@/modules/store/user-store";
import useSortArrayStore from "@/modules/store/sort-array-store";
import { useNewTask } from "@/hooks/use-new-task";
import ListIdtask from "../../task/list-id-task";

export default function ListMain() {
  const { listId } = useParams();

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
  const listTasks = allTasks?.filter(
    (task) =>
      task.list_label.toLowerCase() === (decodeURIComponent(listId as string) as string)
  );

  // console.log(listId);

  useEffect(() => {
    refetchAllTasks();
    if (!isLoadingAllTasks && listTasks) {
      setDataOnLoad(listTasks);
    }
  }, [isLoadingAllTasks]);

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex justify-end'>
        <div className='flex space-x-2 items-center'>
          <DaySelector />
          <SelectFilter />
        </div>
      </div>

      {/* <EmptyTaskModule module={listId as string} /> */}

      <div className='flex flex-col space-y-2 overflow-y-auto pb-14 h-[70vh] pl-2 py-2 pr-2'>
        <ListIdtask
          task={sortedTasks ? sortedTasks : listTasks}
          isError={isAllTasksError}
          isLoading={isLoadingAllTasks}
          error={allTasksError}
        />
      </div>
    </div>
  );
}
