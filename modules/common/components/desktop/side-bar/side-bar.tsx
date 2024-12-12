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
import { tasks } from "@/modules/assets/DUMMY_TASK";
import NewGroup from "./group/new-group";
import { list } from "@/modules/assets/list";
import useAllListStore from "@/modules/store/all-list-store";



export default function SideBar() {
  const isList = useListStore((state) => state.isList);
  const setIsList = useListStore((state) => state.setIsList);

  const isGroup = useGroupStore((state) => state.isGroup);
  const setIsGroup = useGroupStore((state) => state.setIsGroup);

  // Calculate task counts dynamically
  const updatedList = list.map((list) => {
    let taskCount = 0;

    if (list.label === "home") {
      taskCount = tasks.length; // Total tasks
    } else if (list.label === "completed") {
      taskCount = tasks.filter((task) => task.completed).length;
    } else if (list.label === "personal") {
      taskCount = tasks.filter((task) => task.category.label === "personal").length;
    } else if (list.label === "work") {
      taskCount = tasks.filter((task) => task.category.label === "work").length;
    }

    return { ...list, numberOfTask: taskCount }; // Update numberOfTask
  });

  const cList = useAllListStore(state => state.allLists)

  const customList = cList.filter((list) => list.type === "list")


  return (
    <>
      <div className="fixed w-[20rem] flex flex-col space-y-8 h-screen min-h-screen z-40 bg-background px-4 pt-6 pb-10 shadow-md overflow-y-auto">
        <Logo />
        <div className="flex flex-col space-y-3">
          <nav className="flex flex-col space-y-3">
            {updatedList.map((list, index) => (
              <SideBarLinks key={index + list.id} {...list} />
            ))}
          </nav>

          <div className="flex flex-col space-y-3 w-full">
            {customList?.map((list) => (
              <NewListItem key={list.id} id={list.id} name={list.label} icon={list.icon} numberOfTask={list.numberOfTask} />
            ))}
          </div>
        </div>

        <CreateNewList />
        <Group />
      </div>

      <AnimatePresence mode="wait">
        {isList && (
          <Modal onClick={() => setIsList(false)}>
            <NewList />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isGroup && (
          <Modal onClick={() => setIsGroup(false)}>
            <NewGroup />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
