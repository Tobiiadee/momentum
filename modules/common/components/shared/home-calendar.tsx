"use client";

import React from "react";
import CustomCalendar from "../../ui/custom-calendar";
import { useQuery } from "@tanstack/react-query";
import {
  fetchTasks,
  fetchTasksByListId,
} from "@/modules/supabase/utils/actions";
import useUserStore from "@/modules/store/user-store";
import useGroupAction from "@/hooks/use-group-action";

export default function HomeCalendar() {
  const user = useUserStore((state) => state.user);

  const { allGroupsInTable } = useGroupAction(user?.id as string);

  // Filter groups where the user is a member
  const userGroups = allGroupsInTable?.filter((group) =>
    group.members.some((member) => member.member_id === user?.id)
  );

  // Get group list IDs
  const groupListIds = userGroups?.map((group) => group.list_id) ?? [];

  // Fetch tasks from groups
  const { data: fetchedTasks = [] } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      const tasks = await Promise.all(
        groupListIds.map((id) => fetchTasksByListId(id as string))
      );
      return tasks.flat(); // Flatten array
    },
    enabled: groupListIds.length > 0,
  });

  // Fetch user's own tasks
  const { data: allTasks = [] } = useQuery({
    queryKey: ["all-task"],
    queryFn: () => fetchTasks(user?.id as string),
    enabled: !!user?.id,
  });

  // Filter out completed tasks
  const filteredTasks = [...allTasks, ...fetchedTasks].filter(
    (task) => !task.completed
  );

  // Combine and remove duplicate tasks based on list_id
  const uniqueTasks = Array.from(
    new Map(filteredTasks.map((task) => [task.list_id, task])).values()
  );

  return (
    <div className='bg-background rounded-lg w-full h-max'>
      <CustomCalendar tasks={uniqueTasks && uniqueTasks} asTask={true} />
    </div>
  );
}
