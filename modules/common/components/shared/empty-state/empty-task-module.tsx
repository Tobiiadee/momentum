"use client"

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { useRouter } from "next/navigation";
import React from "react";

interface EmptyTaskModuleProps {
  module?: string;
  text?: string;
}

export default function EmptyTaskModule({
  module,
  text: state,
}: EmptyTaskModuleProps) {

  const router = useRouter();

  return (
    <div className='grid place-items-center h-[60vh]'>
      {!!state ? (
        <Text variant={"h4"}>{state}</Text>
      ) : (
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col'>
            <Text variant={"h2"} className='font-normal'>
              You have no task on {!!module && module} list.
            </Text>
            <Text variant={"h5"} className='text-center'>
              Start by adding a task to this list.
            </Text>
          </div>
          <div className='w-full grid place-items-center'>
            <Button onClick={() => router.push("/dashboard/create-new-task")} variant={"default"} className='w-[40%]'>
              Add Task
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
