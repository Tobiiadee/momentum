import { useNewTask } from "@/hooks/use-new-task";
import useGroupStore from "@/modules/store/group-store";
import useSortArrayStore from "@/modules/store/sort-array-store";
import useUserStore from "@/modules/store/user-store";
import React, { useEffect } from "react";

interface TasksGroupMainProps {
  group_list_id: string;
}

export default function TasksGroupMain() {
  const user = useUserStore((state) => state.user);
  const {
    refetchAllTasks,
    isLoadingAllTasks,
    isAllTasksError,
    allTasks,
    allTasksError,
  } = useNewTask(user?.id as string);
  const setDataOnLoad = useSortArrayStore((state) => state.setSortData);
  const listIdFromDatabase = useGroupStore((state) => state.listIdFromDatabase);

  const sortedTasks = useSortArrayStore((state) => state.sortData);
  const groupTask = allTasks?.filter(
    (task) => task.list_id === listIdFromDatabase
  );

  useEffect(() => {
    refetchAllTasks();
    if (!isLoadingAllTasks && groupTask) {
      setDataOnLoad(groupTask);
    }
  }, [isLoadingAllTasks]);



  return <div></div>;
}
