"use client";

import React from "react";
import PreviewWithModal from "../../../shared/preview-with-modal";
import useListStore from "@/modules/store/list-store";
import { Text } from "@/modules/common/ui/text";
import { Trash2 } from "lucide-react";
import { Button } from "@/modules/common/ui/button";
import useUserStore from "@/modules/store/user-store";
import useListAction from "@/hooks/use-list-action";
import { useRouter } from "next/navigation";
import { useNewTask } from "@/hooks/use-new-task";

export default function RemoveListModal() {
  const setIsDeleteList = useListStore((state) => state.setIsDeleteList);
  const deleteObject = useListStore((state) => state.deleteObject);
  const router = useRouter();

  //get user's id
  const userId = useUserStore((state) => state.user?.id);

  //fetch user's list
  const { deleteListMutate, isDeletingList } = useListAction(userId as string);

  //fetch tasks in the list
  const { deleteTaskMutate, isDeletingTask, allTasks } = useNewTask(
    userId as string
  );

  //filter tasks in the list and get ids
  const filteredTaskIds = allTasks
    ?.filter((task) => task.list_id === deleteObject?.list_Id)
    .map((task) => task.task_id);

  // handle delete
  const handleDeleteList = () => {
    if (deleteObject === null) return;
    deleteListMutate(deleteObject?.list_Id);
    deleteTaskMutate(filteredTaskIds as []);
    if (!isDeletingList && !isDeletingTask) {
      setIsDeleteList(false);
      router.push("/dashboard");
    }
  };

  return (
    <PreviewWithModal
      title='delete list'
      ariaLabel='delete list'
      width='w-[22rem]'
      modalBackground='bg-foreground/20'
      closeModal={() => setIsDeleteList(false)}>
      <div className='flex flex-col space-y-4'>
        <div className='w-full grid place-items-center'>
          <Trash2 strokeWidth={1.5} size={50} />
        </div>
        <div className='flex flex-col space-y-2 justify-center w-full'>
          <Text variant={"h3"} className='text-center'>
            Are you sure you want to delete this list?
          </Text>
          <Text
            variant={"p"}
            className='text-center font-medium text-foreground/60'>
            This action will also delete all tasks in the{" "}
            "{deleteObject?.list_label}" list.
          </Text>
        </div>

        <div className='flex justify-between items-center w-full'>
          <Button variant={"outline"} onClick={() => setIsDeleteList(false)}>
            Close
          </Button>
          <Button
            isLoading={isDeletingList && isDeletingTask}
            onClick={handleDeleteList}
            className='bg-red-500 hover:bg-red-600'>
            Delete
          </Button>
        </div>
      </div>
    </PreviewWithModal>
  );
}
