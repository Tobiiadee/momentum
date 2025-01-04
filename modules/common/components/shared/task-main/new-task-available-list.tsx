"use client";

import React from "react";
import AvialableList from "../../task/avialable-list";
import { Text } from "@/modules/common/ui/text";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import useListStore from "@/modules/store/list-store";
import useGroupStore from "@/modules/store/group-store";

export default function NewTaskAvailableList() {
  return (
    <div className='flex flex-col space-y-2 w-full bg-background py-4 px-2 rounded-lg'>
      <div className='flex items-center justify-between border-b pb-2 pl-2 pr-4'>
        <Text variant={"p"} className='font-medium '>
          Choose where to add your task
        </Text>

        <AddNewList />
      </div>
      <AvialableList />
    </div>
  );
}

function AddNewList() {
  const setIsList = useListStore((state) => state.setIsList);
  const setIsGroup = useGroupStore((state) => state.setIsGroup);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PlusIcon
          size={20}
          strokeWidth={1.5}
          className='text-foreground/60 hover:text-foreground transition-all'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-14'>
        <DropdownMenuLabel>Add new list</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsList(true)}>
          New list
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsGroup(true)}>
          New group
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
