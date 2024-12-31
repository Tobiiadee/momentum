"use client";

import React from "react";
import { Text } from "@/modules/common/ui/text";
import { AllListItem } from "../../shared/all-list-item";
import useListAction from "@/hooks/use-list-action";
import useUserStore from "@/modules/store/user-store";
import { useNewTask } from "@/hooks/use-new-task";
import { Skeleton } from "@/modules/common/ui/skeleton";
import EmptyTaskModule from "../../shared/empty-state/empty-task-module";

export default function AllListMain() {
  const user = useUserStore((state) => state.user);
  const { allLists, isLoadingAllLists } = useListAction(user?.id as string);
  const { allTasks, isLoadingAllTasks } = useNewTask(user?.id as string);

  const updatedList = allLists?.map((list) => {
    // Count tasks that belong to the current list
    const taskCount =
      allTasks?.filter((task) => task.list_id === list.list_id).length || 0;

    return { ...list, numberOfTask: taskCount }; // Update numberOfTask
  });

  return (
    <div className='flex flex-col space-y-6 w-full'>
      <Text variant={"h4"} className='font-medium'>
        Your custom lists and groups
      </Text>

      {updatedList?.length === 0 && (
        <div className='w-full '>
          <EmptyTaskModule text="Your haven't created any lists yet" />
        </div>
      )}
      <div className='flex flex-col space-y-4'>
        {updatedList?.length !== 0 && <Text variant={"h5"}>Lists</Text>}
        <div className='grid grid-cols-3 gap-4 mt-4 w-full'>
          {isLoadingAllLists &&
            isLoadingAllTasks &&
            Array.from({ length: 6 }).map((_, index) => (
              <AllListItemSkeleton key={index} />
            ))}

          {updatedList?.map((list, index) => (
            <AllListItem
              key={list.list_id}
              id={list.list_id}
              name={list.label}
              svgImage={list.icon as string}
              numberOfTask={list.numberOfTask as number}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AllListItemSkeleton() {
  return <Skeleton className='w-full h-7' />;
}
