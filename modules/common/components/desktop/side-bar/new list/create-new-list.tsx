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
      title='ctrl + L | Create new list'
      variant={"default"}
      className='w-full self-center flex rounded-md space-x-4  transition-all duration-300'>
      <div className='flex items-center space-x-2 '>
        <Plus strokeWidth={2} size={20} />
        <Text variant={"p"} className='font-medium'>
          New List
        </Text>
      </div>
    </Button>
  );
}
