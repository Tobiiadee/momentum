import React from "react";
import { cn } from "@/lib/utils";
import { Text } from "../../ui/text";

export default function TaskNumber({
    numberOfTask,
    className,
  }: {
    numberOfTask?: string | number;
    className?: string;
  }) {
    return (
      <div
        className={cn(
          className,
          "w-6 aspect-square rounded-full bg-foreground/5 flex items-center justify-center"
        )}>
        <Text variant='p' className='text-xs font-semibold text-foreground/80'>
          {numberOfTask}
        </Text>
      </div>
    );
  }