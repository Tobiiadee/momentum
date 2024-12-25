"use client";

import React from "react";
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
import useAllListStore from "@/modules/store/all-list-store";
import CreateNewTask from "./create-new-task";
import useUserStore from "@/modules/store/user-store";
import { useNewTask } from "@/hooks/use-new-task";
import { today } from "../../shared/todays-task";
import { formatDate } from "@/lib/helpers/format";

export default function SideBar() {
  const isList = useListStore((state) => state.isList);
  const resetList = useListStore((state) => state.reset);

  const isGroup = useGroupStore((state) => state.isGroup);
  const resetGroup = useGroupStore((state) => state.reset);

  const user = useUserStore((state) => state.user);
  const { allTasks, isLoadingAllTasks } = useNewTask(
    user?.id as string
  );

  const todaysTask = allTasks?.filter(
    (task) => formatDate(task.due_date) === today
  );

  // Calculate task counts dynamically
  const updatedList = list.map((list) => {
    let taskCount: number | undefined = 0;

    if (list.label === "home") {
      taskCount = todaysTask?.length; // Total tasks
    } else if (list.label === "completed") {
      taskCount = allTasks?.filter((task) => task.completed === true).length;
    } else if (list.label === "personal") {
      taskCount = allTasks?.filter((task) => task.list === "personal").length;
    } else if (list.label === "work") {
      taskCount = allTasks?.filter((task) => task.list === "work").length;
    }

    return { ...list, numberOfTask: taskCount }; // Update numberOfTask
  });

  const cList = useAllListStore((state) => state.allLists);

  const customList = cList.filter((list) => list.type === "list");

  return (
    <>
      <div className='fixed w-[20rem] flex flex-col space-y-8 h-screen min-h-screen z-40 bg-background px-4 pt-6 pb-10 shadow-md overflow-y-auto'>
        <Logo />
        <div className='flex flex-col space-y-3'>
          <CreateNewTask />
          <nav className='flex flex-col space-y-3'>
            {updatedList.map((list, index) => (
              <SideBarLinks
                key={index + list.id}
                isLoading={isLoadingAllTasks}
                {...list}
              />
            ))}
          </nav>

          <div className='flex flex-col space-y-3 w-full'>
            {customList?.map((list) => (
              <NewListItem
                key={list.id}
                id={list.id}
                name={list.label}
                svgImage={list.icon as string}
                numberOfTask={list.numberOfTask}
              />
            ))}
          </div>
        </div>

        <CreateNewList />
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



