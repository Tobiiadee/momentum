import React from "react";
import { Text } from "../../ui/text";
import { TaskNumber } from "../desktop/side-bar/side-bar-links";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
// import TaskCreateNewList from "./task-create-new-list";
import useNewTaskStore from "@/modules/store/new-task.store";
// import useAllListStore from "@/modules/store/all-list-store";
import { updatedList } from "@/lib/helpers/helpers";

const listVariant: Variants = {
  hidden: { opacity: 0, height: 100 },
  visible: { opacity: 1, height: 300, transition: { duration: 0.4 } },
};

export default function AvialableList() {
  const modifiedList = updatedList.filter((list) => list.label !== "completed");  

  return (
    <motion.div
      variants={listVariant}
      initial='hidden'
      animate='visible'
      className='flex flex-col space-y-2'>
      <div className='flex flex-col space-y-2'>
        {modifiedList.map((list, index) => (
          <ListItem key={index + list.id} {...list} />
        ))}
      </div>

      {/* <TaskCreateNewList /> */}
    </motion.div>
  );
}

interface ListItemProps {
  icon?: React.ReactNode;
  label: string;
  numberOfTask?: string | number;
  id: string;
}

function ListItem({ numberOfTask, icon, label, id }: ListItemProps) {
  const setSelectedList = useNewTaskStore((state) => state.setSelectedCategory);
  const selectedList = useNewTaskStore((state) => state.selectedCategory);

  const isActive = selectedList?.id === id;

  return (
    <div
      onClick={() => setSelectedList({ id, label, icon })}
      className={cn(isActive && "bg-foreground/10",
        "w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-300 cursor-pointer"
      )}>
      <div className='flex space-x-4 items-center'>
        {icon && icon}
        <Text variant='p' className='text-sm capitalize'>
          {label}
        </Text>
      </div>

      {numberOfTask && <TaskNumber numberOfTask={numberOfTask} />}
    </div>
  );
}
