"use client";

import React, { useEffect } from "react";
import { useListStore } from "@/modules/store/list-store";
import useGroupStore from "@/modules/store/group-store";
import Modal from "@/modules/common/ui/modal";
import { AnimatePresence, useAnimation } from "framer-motion";

import { list } from "@/modules/assets/list";
import useUserStore from "@/modules/store/user-store";
import { useNewTask } from "@/hooks/use-new-task";
import { today } from "../../task/todays-task";
import { formatDate } from "@/lib/helpers/format";
import useListAction from "@/hooks/use-list-action";
import { Skeleton } from "@/modules/common/ui/skeleton";
import { Button } from "@/modules/common/ui/button";
import { useRouter } from "next/navigation";
import SideBarLinks from "../../desktop/side-bar/side-bar-links";
import NewListItem from "../../desktop/side-bar/new list/new-list-item";

import Group from "../../desktop/side-bar/group/group";
import NewList from "../../desktop/side-bar/new list/new-list";
import NewGroup from "../../desktop/side-bar/group/new-group";
import { motion, Variants } from "framer-motion";
import { X } from "lucide-react";
import useSidebarStore from "@/modules/store/sidebar-store";
import AdminProfile from "../../desktop/header/admin-profile";
import { Text } from "@/modules/common/ui/text";

const slideInAnim: Variants = {
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    x: -600,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function SideBarMobile() {
  const router = useRouter();
  const controls = useAnimation();

  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  // Animate sidebar when state changes
  useEffect(() => {
    controls.start(isSidebarOpen ? "visible" : "hidden");
  }, [isSidebarOpen, controls]);

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
      <motion.div
        variants={slideInAnim}
        initial='hidden'
        animate={controls}
        exit={"exit"}
        drag='x'
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          if (info.offset.x > 100) {
            setIsSidebarOpen(false); // Close on swipe right
          } else if (info.offset.x < -100) {
            setIsSidebarOpen(true); // Open on swipe left
          }
        }}
        className='fixed w-full md:w-[70%] lg:hidden flex flex-col space-y-8 h-screen min-h-screen z-50 bg-background px-4 pt-6 pb-10 shadow-md overflow-x-hidden overflow-y-auto'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col -space-y-1'>
            <Text variant={"h4"} className='font-semibold'>
              {user?.username}
            </Text>
            <Text variant={"p"} className='text-xs text-foreground/60'>
              {user?.email}
            </Text>
          </div>

          <Button
            onClick={() => setIsSidebarOpen(false)}
            variant={"ghost"}
            size={"sm"}
            className=''>
            <X size={26} strokeWidth={1.5} />
          </Button>
        </div>

        <div className='flex flex-col space-y-3'>
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

        <Group />

        <div>
          <AdminProfile />
        </div>
      </motion.div>
      {/* <Modal onClick={() => setIsSidebarOpen(false)} className='bg-foreground/20'></Modal> */}

      <AnimatePresence mode='wait'>
        {isList && (
          <Modal className='bg-foreground/20' onClick={() => resetList()}>
            <NewList />
          </Modal>
        )}

        {isGroup && (
          <Modal className='bg-foreground/20' onClick={() => resetGroup()}>
            <NewGroup />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
