"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { useGroupStore } from "@/modules/store/group-store";
import { Plus } from "lucide-react";
import { useEffect } from "react";

export default function CreateNewTask() {
  const setIsGroup = useGroupStore((state) => state.setIsGroup);

  const handleKeyEvent = (e: KeyboardEvent) => {
    if (e.altKey && e.key === "n") {
      e.preventDefault();
      setIsGroup(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  });

  return (
    <Button
      onClick={() => setIsGroup(true)}
      variant={"ghost"}
      className='absolute left-1/2 -translate-x-1/2 bottom-8 w-[30%] h-11 z-40 flex justify-between rounded-3xl space-x-4 bg-foreground text-background hover:text-background hover:bg-foreground/80 active:bg-foreground/90 transition-all duration-300'>
      <div className='flex items-center space-x-2 '>
        <Plus strokeWidth={2} size={20} />
        <Text variant={"p"} className='font-medium'>
          Create new task
        </Text>
      </div>

      <div className='flex items-center space-x-2 px-1.5 py-0.5 rounded-xl bg-foreground/15'>
        <Text variant={"p"} className='text-xs font-medium'>
          alt + N
        </Text>
      </div>
    </Button>
  );
}
