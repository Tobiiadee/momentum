import React from "react";
import { Button } from "../../ui/button";
import { Text } from "../../ui/text";
import { Calendar, ChevronDown } from "lucide-react";
import useNewTaskStore from "@/modules/store/new-task.store";
import { cn } from "@/lib/utils";

export default function ListSelect() {
  const isTaskList = useNewTaskStore((state) => state.isTaskList);
  const setIsTaskList = useNewTaskStore((state) => state.setIsTaskList);
  const selectedList = useNewTaskStore((state) => state.selectedCategory);
  const isTaskTimeFrom = useNewTaskStore((state) => state.taskTimeFrom);
  const isTaskTimUntil = useNewTaskStore((state) => state.taskTimeUntil);

  const listHandler = () => {
    if (!!isTaskTimUntil && !!isTaskTimeFrom) setIsTaskList(true);
  };

  return (
    <div className='w-full flex items-center space-x-2'>
      <Button
        onClick={listHandler}
        variant={"ghost"}
        className='flex items-center justify-between bg-transparent hover:bg-transparent w-full border'>
        <div className='flex items-center space-x-4'>
          <div className='border bg-foreground/10 w-6 p-[2px] aspect-square flex items-center justify-center rounded'>
            {selectedList?.icon}
          </div>
          <Text variant={"p"} className='text-xs capitalize'>
            {selectedList?.label || "No list"}
          </Text>
        </div>
        <ChevronDown
          strokeWidth={1.5}
          size={16}
          className={cn(isTaskList && "rotate-180 transition")}
        />
      </Button>

      <Button variant={"default"} size={"sm"} className=''>
        <Calendar strokeWidth={1.5} size={16} />
      </Button>
    </div>
  );
}
