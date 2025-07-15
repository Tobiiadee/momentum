"use client";

import React, { useEffect } from "react";
import DaySelector from "../../shared/day-selector";
// import SelectFilter from "../../shared/select-filter";
import { useParams } from "next/navigation";
import useSortArrayStore from "@/modules/store/sort-array-store";
import ListIdtask from "../../task/list-id-task";
import { useQuery } from "@tanstack/react-query";
import {
  fetchList,
  fetchTasksByListId,
} from "@/modules/supabase/utils/actions";
import { toast } from "sonner";
import ListDropdown from "../side-bar/new list/list-dropdown";
import { Text } from "@/modules/common/ui/text";

export default function ListMain() {
  const { listId } = useParams();

  const setDataOnLoad = useSortArrayStore((state) => state.setSortData);

  const sortedTasks = useSortArrayStore((state) => state.sortData);

  const {
    data: list,
    error: listError,
    isLoading: isLoadingList,
    isError: isListError,
  } = useQuery({
    queryKey: ["list_label", listId],
    queryFn: () => fetchList(listId as string),
    enabled: !!listId,
  });

  const {
    data: tasks,
    error: tasksError,
    isLoading: isLoadingTasks,
    isError: isTasksError,
  } = useQuery({
    queryKey: ["list", listId],
    queryFn: () => fetchTasksByListId(listId as string),
    enabled: !!listId,
  });

  useEffect(() => {
    if (!isLoadingTasks && tasks) {
      setDataOnLoad(tasks);
    }
  }, [isLoadingTasks, setDataOnLoad, tasks]);

  if (isListError) {
    return toast.error(listError?.message);
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <Text variant={"h2"} className="text-primary font-normal">
          {list?.label}
        </Text>
        <div className="flex space-x-2 items-center">
          <ListDropdown />
          <DaySelector />
          {/* <SelectFilter /> */}
        </div>
      </div>

      {/* <EmptyTaskModule module={listId as string} /> */}

      <div className="flex flex-col space-y-2 overflow-y-auto pb-14 h-[70vh] pl-2 py-2 pr-2">
        <ListIdtask
          task={sortedTasks ? sortedTasks : tasks}
          isError={isTasksError}
          isLoading={isLoadingTasks || isLoadingList}
          error={tasksError}
          list_lable={list?.label}
        />
      </div>
    </div>
  );
}
