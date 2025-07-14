import React from "react";
import { cn } from "@/lib/utils";
import { Text } from "../../ui/text";
import { Loader } from "lucide-react";

export default function TaskNumber({
  numberOfTask,
  className,
  isLoading,
}: {
  numberOfTask?: string | number;
  className?: string;
  isLoading?: boolean;
}) {
  return (
    <div
      className={cn(
        className,
        "w-6 aspect-square rounded-full bg-foreground/5 flex items-center justify-center"
      )}>
      {!isLoading && (
        <Text variant='p' className='text-xs font-semibold text-primary'>
          {numberOfTask}
        </Text>
      )}
      {isLoading && (
        <Loader className='h-4 w-4 animate-spin text-foreground/60' />
      )}
    </div>
  );
}
