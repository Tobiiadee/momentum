import React from "react";
import { Text } from "../../ui/text";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
// import TaskCreateNewList from "./task-create-new-list";
import useNewTaskStore from "@/modules/store/new-task.store";
// import useAllListStore from "@/modules/store/all-list-store";
import TaskNumber from "../shared/task-number";
import { list } from "@/modules/assets/list";
import useUserStore from "@/modules/store/user-store";
import { useNewTask } from "@/hooks/use-new-task";
import useListAction from "@/hooks/use-list-action";
import Image from "next/image";

const listVariant: Variants = {
  hidden: { opacity: 0, height: 100 },
  visible: { opacity: 1, height: 250, transition: { duration: 0.4 } },
};

export default function AvialableList() {
  //filter home list
  const updatedList = list.filter(
    (list) => list.label !== "completed" && list.label !== "home"
  );

  const user = useUserStore((state) => state.user);
  const { allTasks, isLoadingAllTasks } = useNewTask(user?.id as string);
  const { allLists } = useListAction(user?.id as string);

  // Calculate task counts dynamically
  const modifiedList = updatedList.map((list) => {
    let taskCount: number | undefined = 0;

    if (list.label === "personal") {
      taskCount = allTasks?.filter((task) => task.list_label === "personal").length;
    } else if (list.label === "work") {
      taskCount = allTasks?.filter((task) => task.list_label === "work").length;
    }

    return { ...list, numberOfTask: taskCount }; // Update numberOfTask
  });

  // combine default and custom list into one array
  const allUsersList = [...modifiedList, ...(allLists ?? [])];

  // get the number of task for custom list
  const getListIds = allLists?.map(list => list.list_id) || []; // Ensure it defaults to an empty array
  const customNumberOfTask = allTasks?.filter(task => getListIds.includes(task.list_id)).length;

  console.log(customNumberOfTask);
  
  

  return (
    <motion.div
      variants={listVariant}
      initial='hidden'
      animate='visible'
      className='flex flex-col space-y-2'>
      <div className='flex flex-col space-y-2 pb-4 pr-2 overflow-y-auto'>
        {allUsersList.map((list, index) => (
          <ListItem
            key={index + list.list_id}
            id={list.list_id}
            type={list.type as "list" | "group"}
            isLoading={isLoadingAllTasks}
            {...list}
          />
        ))}
      </div>

      {/* <TaskCreateNewList /> */}
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

function ListItem({ numberOfTask = 0, icon, label, id, type }: ListItemProps) {
  const setSelectedList = useNewTaskStore((state) => state.setSelectedCategory);
  const selectedList = useNewTaskStore((state) => state.selectedCategory);
  const setType = useNewTaskStore((state) => state.setType);
  const setList = useNewTaskStore((state) => state.setList);
  // const setListId = useNewTaskStore((state) => state.setListId);

  const isActive = selectedList?.id === id;

  const handleSelect = () => {
    setSelectedList({ id, label, icon });
    setType(type);
    setList(label);
  };

  // console.log(numberOfTask);

  return (
    <div
      onClick={handleSelect}
      className={cn(
        isActive && "bg-foreground/10",
        "w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-300 cursor-pointer"
      )}>
      <div className=' flex space-x-4 items-center'>
        {typeof icon === "string" ? (
          <div className='relative w-6 aspect-square grid place-items-center'>
            <Image src={icon} alt={label} fill priority />
          </div>
        ) : (
          <div className='w-6 aspect-square grid place-items-center'>
            {icon}
          </div>
        )}

        <Text variant='p' className='text-sm capitalize'>
          {label}
        </Text>
      </div>

      <TaskNumber numberOfTask={numberOfTask} />
    </div>
  );
}
