"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { useGroupStore } from "@/modules/store/group-store";
import { Plus } from "lucide-react";
import { useEffect } from "react";


export default function CreateNewGroup() {
  const setIsGroup = useGroupStore((state) => state.setIsGroup);

  const handleKeyEvent = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "g") {
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
      title='ctrl + G | Create new group'
      variant={"ghost"}
      className='w-full self-center flex rounded-md space-x-4 bg-secondary hover:bg-secondary-hover transition-all duration-300'>
      <div className='flex items-center space-x-2 text-foreground'>
        <Plus strokeWidth={2} size={20} />
        <Text variant={"p"} className='font-medium '>
          New Group
        </Text>
      </div>
    </Button>
  );
}
