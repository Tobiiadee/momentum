import React from "react";
import { Button } from "../../ui/button";
import { Text } from "../../ui/text";
import useNewTaskStore from "@/modules/store/new-task.store";

export default function TaskSaveBtn() {
  const setTask = useNewTaskStore((state) => state.setTask);
  const setIsNewTask = useNewTaskStore((state) => state.setIsNewTask);
  const resetTask = useNewTaskStore((state) => state.reset);
  const taskTitle = useNewTaskStore((state) => state.title);

  const handerSaveTask = () => {
    const task: TaskItem = {
      id: crypto.randomUUID(),
      title: useNewTaskStore.getState().title,
      description: useNewTaskStore.getState().description,
      timeRange: `${useNewTaskStore.getState().taskTimeFrom} - ${
        useNewTaskStore.getState().taskTimeUntil
      }`,
      date: useNewTaskStore.getState().taskDate,
      category: useNewTaskStore.getState().selectedCategory!,
      completed: false,
      type: useNewTaskStore.getState().type,
    };

    setTask(task);
    setIsNewTask(false);
    resetTask();
  };

  return (
    <Button disabled={!taskTitle} onClick={handerSaveTask} variant={"default"} className='w-full'>
      <Text variant={"p"} className='text-center'>
        Save Task
      </Text>
    </Button>
  );
}
