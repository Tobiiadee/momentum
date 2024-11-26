"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { useListStore } from "@/modules/store/list-store";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";

export default function CreateNewList() {
  const setIsList = useListStore((state) => state.setIsList);

  const handleKeyEvent = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setIsList(true);
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
      onClick={() => setIsList(true)}
      variant={"ghost"}
      className='w-[90%] self-center flex justify-between rounded-3xl space-x-4 bg-foreground/10 hover:bg-foreground/15 active:bg-foreground/20 transition-all duration-300'>
      <div className='flex items-center space-x-2 '>
        <Plus strokeWidth={2} size={20} />
        <Text variant={"p"} className='font-medium'>
          Create new list
        </Text>
      </div>

      <div className='flex items-center space-x-2 px-1.5 py-0.5 rounded-xl bg-foreground/15'>
        <Text variant={"p"} className='text-xs text-foreground/50 font-medium'>
          ctrl + L
        </Text>
      </div>
    </Button>
  );
}
