import { Input } from "@/modules/common/ui/input";
import { Text } from "@/modules/common/ui/text";
import { Textarea } from "@/modules/common/ui/textarea";
import React from "react";

export default function NewTaskInputs() {
  return (
    <div className='flex flex-col space-y-4 w-full bg-background py-4 px-4 rounded-lg'>
      <Text variant={"p"} className='font-medium border-b pb-2'>
        Name your task and add notes 
      </Text>
      <div className='flex flex-col space-y-4'>
        <Input placeholder='Task title...' className='placeholder:text-xs' />
        <Textarea
          placeholder='Add notes...'
          className='placeholder:text-xs min-h-44 max-h-44'
        />
      </div>
    </div>
  );
}
