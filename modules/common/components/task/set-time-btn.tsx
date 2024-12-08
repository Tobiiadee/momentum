import React from "react";
import { Button } from "../../ui/button";
import { Text } from "../../ui/text";
import useNewTaskStore from "@/modules/store/new-task.store";

export default function SetTimesBtn() {
  const setIsTaskTime = useNewTaskStore((state) => state.setIsTaskTime);
  const taskDate = useNewTaskStore((state) => state.taskDate);

  return (
    <Button
      onClick={() => {
        if (taskDate) setIsTaskTime(true);
      }}
      variant={"ghost"}
      className='w-full bg-foreground/5 hover:bg-foreground/10 active:bg-foreground/15'>
      <Text variant={"p"} className='text-center'>
        Set Time
      </Text>
    </Button>
  );
}
