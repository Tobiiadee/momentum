import React from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { Text } from "../../ui/text";

export default function TaskCreateNewList() {
  return (
    <Button
      variant={"ghost"}
      className='w-full self-center flex justify-between rounded-3xl space-x-4 bg-foreground/10 hover:bg-foreground/15 active:bg-foreground/20 transition-all duration-300'>
      <div className='flex items-center space-x-2 '>
        <Plus strokeWidth={2} size={20} />
        <Text variant={"p"} className='font-medium'>
          Create new list
        </Text>
      </div>

      <div className='flex items-center space-x-2 px-1.5 py-0.5 rounded-xl bg-foreground/10'>
        <Text variant={"p"} className='text-xs text-foreground/50 font-medium'>
          ctrl + L
        </Text>
      </div>
    </Button>
  );
}
