"use client";

import React, { useEffect } from "react";
import Logo from "../../shared/logo";
import SideBarLinks from "./side-bar-links";
import CreateNewList from "./new list/create-new-list";
import Group from "./group/group";
import { useListStore } from "@/modules/store/list-store";
import useGroupStore from "@/modules/store/group-store";
import Modal from "@/modules/common/ui/modal";
import NewList from "./new list/new-list";
import { AnimatePresence } from "framer-motion";
import NewListItem from "./new list/new-list-item";
import NewGroup from "./group/new-group";
import { list } from "@/modules/assets/list";
import CreateNewTask from "./create-new-task";
import useUserStore from "@/modules/store/user-store";
import { useNewTask } from "@/hooks/use-new-task";
import { today } from "../../shared/todays-task";
import { formatDate } from "@/lib/helpers/format";
import CreateNewGroup from "./group/create-new-group";
import useListAction from "@/hooks/use-list-action";
import { Skeleton } from "@/modules/common/ui/skeleton";
import { Button } from "@/modules/common/ui/button";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const router = useRouter();

  const isList = useListStore((state) => state.isList);
  const resetList = useListStore((state) => state.reset);

  const isGroup = useGroupStore((state) => state.isGroup);
  const resetGroup = useGroupStore((state) => state.reset);

  const user = useUserStore((state) => state.user);
  const { allTasks, isLoadingAllTasks } = useNewTask(user?.id as string);

  const todaysTask = allTasks?.filter(
    (task) => formatDate(task.due_date) === today
  );

  //get user's id
  const userId = useUserStore((state) => state.user?.id);

  //fetch user's list
  const { refetchAllLists, allLists, isLoadingAllLists, isDeletingList } =
    useListAction(userId as string);

  //fetch list on component mount
  useEffect(() => {
    refetchAllLists();
  }, [refetchAllLists]);

  // Calculate task counts dynamically
  const updatedList = list.map((list) => {
    let taskCount: number | undefined = 0;

    if (list.label === "home") {
      taskCount = todaysTask?.length; // Total tasks
    } else if (list.label === "completed") {
      taskCount = allTasks?.filter((task) => task.completed === true).length;
    } else if (list.label === "personal") {
      taskCount = allTasks?.filter(
        (task) => task.list_label === "personal"
      ).length;
    } else if (list.label === "work") {
      taskCount = allTasks?.filter((task) => task.list_label === "work").length;
    }

    return { ...list, numberOfTask: taskCount }; // Update numberOfTask
  });

  // Get number of tasks for custom list
  const updatedCustomList = allLists?.map((list) => {
    // Count tasks that belong to the current list
    const taskCount =
      allTasks?.filter((task) => task.list_id === list.list_id).length || 0;

    return { ...list, numberOfTask: taskCount }; // Update numberOfTask
  });

  //Get first 4 lists
  // const first = updatedCustomList?.slice(0, 4);

  return (
    <>
      <div className='fixed w-[20rem] flex flex-col space-y-8 h-screen min-h-screen z-40 bg-background px-4 pt-6 pb-10 shadow-md overflow-y-auto'>
        <Logo />
        <div className='flex flex-col space-y-3'>
          <CreateNewTask />
          <nav className='flex flex-col space-y-3'>
            {updatedList?.map((list, index) => (
              <SideBarLinks
                key={index + list.list_id}
                isLoading={isLoadingAllTasks}
                {...list}
              />
            ))}
          </nav>

          <div className='flex flex-col space-y-3 w-full'>
            {isLoadingAllLists && (
              <div className='flex flex-col space-y-3'>
                {Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton className='w-full h-6' key={index} />
                ))}
              </div>
            )}
            {updatedCustomList?.slice(0, 4).map((list, index) => (
              <NewListItem
                key={list.list_id || index}
                id={list.list_id}
                name={list.label}
                svgImage={list.icon as string}
                numberOfTask={list.numberOfTask as number}
                isRemoving={isDeletingList}
              />
            ))}

            {allLists && allLists?.length > 4 && (
              <div className='w-full flex justify-end'>
                <Button
                  onClick={() => router.push("/dashboard/all-list")}
                  variant={"link"}>
                  View all list
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <CreateNewList />
          <CreateNewGroup />
        </div>
        <Group />
      </div>

      <AnimatePresence mode='wait'>
        {isList && (
          <Modal onClick={() => resetList()}>
            <NewList />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {isGroup && (
          <Modal onClick={() => resetGroup()}>
            <NewGroup />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
