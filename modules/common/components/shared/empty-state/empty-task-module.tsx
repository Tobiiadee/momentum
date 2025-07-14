"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { useRouter } from "next/navigation";
import React from "react";

interface EmptyTaskModuleProps {
  module?: string;
  text?: string;
  height?: string;
  isAdmin?: boolean;
}

export default function EmptyTaskModule({
  module,
  isAdmin = true,
  text: state,
  height = "h-[50vh] lg:h-[45vh]",
}: EmptyTaskModuleProps) {
  const router = useRouter();

  // const lowerCaseModule = module?.toLowerCase();

  const handleAddTask = () => {
    router.push("/dashboard/create-new-task");
  };

  return (
    <div className={cn(height, "grid place-items-center w-full")}>
      {!!state ? (
        <Text variant={"h4"}>{state}</Text>
      ) : (
        <div className='flex flex-col space-y-4 '>
          <div className='flex flex-col text-center'>
            <Text variant={"h2"} className='font-normal text-center w-full'>
              You have no task on{" "}
              <span className="capitalize">
                {!!module && decodeURIComponent(module as string)}
              </span>{" "}
              list.
            </Text>
            <Text variant={"h5"} className='text-center'>
              Start by adding a task to this list.
            </Text>
          </div>
          {isAdmin && (
            <div className='w-full grid place-items-center'>
              <Button
                onClick={handleAddTask}
                variant={"default"}
                className='w-[40%]'>
                Add Task
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
