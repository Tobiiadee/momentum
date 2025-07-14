"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import useNewTaskStore from "@/modules/store/new-task.store";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateNewTask() {
    const router = useRouter()
    const setIsTask = useNewTaskStore((state) => state.setIsTask);

  const handleTask = () => {
    setIsTask(true);
    router.push("/dashboard/create-new-task");
  };

  return (
    <Button
      onClick={handleTask}
      variant={"default"}
      className='w-[90%] self-center flex justify-center rounded-3xl space-x-4 transition-all duration-300 mb-4'>
      <div className='flex items-center space-x-2 '>
        <Plus strokeWidth={2} size={20} />
        <Text variant={"p"} className='font-medium'>
          Create new task
        </Text>
      </div>
    </Button>
  );
}
