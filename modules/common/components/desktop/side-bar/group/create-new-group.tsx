"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { useGroupStore } from "@/modules/store/group-store";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/ui/tooltip";

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setIsGroup(true)}
            variant={"ghost"}
            className='full self-center flex rounded-md space-x-4 bg-foreground/10 hover:bg-foreground/15 active:bg-foreground/20 transition-all duration-300'>
            <div className='flex items-center space-x-2 '>
              <Plus strokeWidth={2} size={20} />
              <Text variant={"p"} className='font-medium'>
                New group
              </Text>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <Text
            variant={"p"}
            className='text-xs text-background font-medium'>
            ctrl + G
          </Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
