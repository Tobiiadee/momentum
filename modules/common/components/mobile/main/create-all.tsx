"use client";

import { Plus } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import useNewTaskStore from "@/modules/store/new-task.store";
import { usePathname, useRouter } from "next/navigation";
import useListStore from "@/modules/store/list-store";
import useGroupStore from "@/modules/store/group-store";

export default function CreateAll() {
  const pathname = usePathname();

  const isExcluded =
  pathname.startsWith("/dashboard/create-new-task") ||
  pathname.startsWith("/dashboard/group") ||
  pathname.startsWith("/dashboard/list");
  return (
    <>
      {!isExcluded && (
        <div className='lg:hidden absolute bottom-0 left-0 z-40 w-full grid place-items-center h-max pb-5'>
          <CreateAllTab />
        </div>
      )}
    </>
  );
}

function CreateAllTab() {
  const router = useRouter();
  const setIsTask = useNewTaskStore((state) => state.setIsTask);
  const setIsList = useListStore((state) => state.setIsList);
  const setIsGroup = useGroupStore((state) => state.setIsGroup);

  const handleCreateTask = () => {
    setIsTask(true);
    router.push("/dashboard/create-new-task");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          role='button'
          title='Create new events'
          className='w-14 aspect-square shadow-md bg-foreground text-background rounded-full grid place-items-center'>
          <Plus size={28} strokeWidth={1.5} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='ml-32'>
        <DropdownMenuItem onClick={handleCreateTask}>
          Create Task
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsList(true)}>
          Create List
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsGroup(true)}>
          Create Group
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
