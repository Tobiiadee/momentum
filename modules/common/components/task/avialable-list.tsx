"use client";

import React from "react";
import { Text } from "../../ui/text";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import useNewTaskStore from "@/modules/store/new-task.store";
import TaskNumber from "./task-number";
import { list as defaultList } from "@/modules/assets/list";
import useUserStore from "@/modules/store/user-store";
import { useNewTask } from "@/hooks/use-new-task";
import useListAction from "@/hooks/use-list-action";
import Image from "next/image";
import useGroupAction from "@/hooks/use-group-action";

const listVariant: Variants = {
  hidden: { opacity: 0, height: 100 },
  visible: { opacity: 1, height: 250, transition: { duration: 0.4 } },
};

export default function AvailableList() {
  const user = useUserStore((state) => state.user);
  const { allTasks, isLoadingAllTasks } = useNewTask(user?.id as string);
  const { allLists } = useListAction(user?.id as string);
  const { allGroups } = useGroupAction(user?.id as string);

  // Combine and calculate task counts for default and custom lists
  const combinedList = [
    ...defaultList.filter(
      (list) => list.label !== "completed" && list.label !== "home"
    ),
    ...(allLists ?? []),
  ].map((list) => {
    const taskCount =
      list.type === "list"
        ? allTasks?.filter((task) => task.list_label === list.label).length || 0
        : allTasks?.filter((task) => task.list_id === list.list_id).length || 0;

    return { ...list, numberOfTask: taskCount };
  });

  // Merge groups into the combined list
  const allUsersList = [...combinedList, ...(allGroups ?? [])];

  return (
    <motion.div
      variants={listVariant}
      initial="hidden"
      animate="visible"
      className="flex flex-col space-y-2"
    >
      <div className="flex flex-col space-y-2 pb-4 pr-2 overflow-y-auto">
        {allUsersList.map((list, index) => (
          <ListItem
            key={`${index}-${list.list_id}`}
            id={list.list_id}
            type={list.type as "list" | "group"}
            isLoading={isLoadingAllTasks}
            {...list}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface ListItemProps {
  icon?: React.ReactNode | string;
  label: string;
  numberOfTask?: string | number;
  id: string;
  type: "list" | "group";
  isLoading?: boolean;
}

function ListItem({
  numberOfTask = 0,
  icon,
  label,
  id,
  type,
  isLoading,
}: ListItemProps) {
  const setSelectedList = useNewTaskStore((state) => state.setSelectedCategory);
  const selectedList = useNewTaskStore((state) => state.selectedCategory);
  const setType = useNewTaskStore((state) => state.setType);
  const setList = useNewTaskStore((state) => state.setList);

  const isActive = selectedList?.id === id;

  const handleSelect = () => {
    setSelectedList({ id, label, icon });
    setType(type);
    setList(label);
  };

  return (
    <div
      onClick={handleSelect}
      className={cn(
        isActive && "bg-foreground/10",
        "w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-300 cursor-pointer"
      )}
    >
      <div className="flex space-x-4 items-center">
        {type === "group" && (
          <div className="w-5 aspect-square rounded bg-foreground/10"></div>
        )}

        {type === "list" && (
          <div className="flex space-x-4 items-center w-max">
            {typeof icon === "string" ? (
              <div className="relative w-6 aspect-square grid place-items-center">
                <Image src={icon} alt={label} fill priority />
              </div>
            ) : (
              <div className="w-6 aspect-square grid place-items-center">
                {icon}
              </div>
            )}
          </div>
        )}

        <Text variant="p" className="text-sm capitalize w-max">
          {label}
        </Text>
      </div>

      <TaskNumber isLoading={isLoading} numberOfTask={numberOfTask} />
    </div>
  );
}
