/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import PreviewWithModal from "../../../shared/preview-with-modal";
import useGroupStore from "@/modules/store/group-store";
import { Trash2 } from "lucide-react";
import { Text } from "@/modules/common/ui/text";
import { Button } from "@/modules/common/ui/button";
import useUserStore from "@/modules/store/user-store";
import useGroupAction from "@/hooks/use-group-action";
import { useNewTask } from "@/hooks/use-new-task";
import { useRouter } from "next/navigation";
import { exitGroup } from "@/modules/supabase/utils/actions";
import { toast } from "sonner";

export default function RemoveGroupModal() {
  const router = useRouter();
  const setIsDeleteGroup = useGroupStore((state) => state.setIsDeleteGroup);
  const deleteGroupObject = useGroupStore((state) => state.deleteGroupObject);

  const user = useUserStore((state) => state.user);
  const { deleteGroupMutate, isDeletingGroup } = useGroupAction(
    user?.id as string
  );

  //fetch tasks in the list
  const { deleteTaskMutate, isDeletingTask, allTasks } = useNewTask(
    user?.id as string
  );

  //filter tasks in the list and get ids
  const filteredTaskIds = allTasks
    ?.filter((task) => task.list_id === deleteGroupObject?.list_Id)
    .map((task) => task.task_id);

  const { fetchedGroup } = useGroupAction(
    user?.id as string,
    deleteGroupObject?.list_Id
  );

  
  const handleDeleteList = async () => {
    if (!deleteGroupObject || !user) {
      toast.error("Invalid operation. Group or user information is missing.");
      return;
    }
  
    const otherAdmins = fetchedGroup?.members.filter(
      (member) => member.role === "Admin" && member.member_id !== user.id
    );
  
    if (otherAdmins?.length === 0) {
      toast.error("You cannot delete the group as there are no other admins.");
      return;
    }
  
    try {
      // Exit group logic
      await exitGroup(user.id, deleteGroupObject.list_Id);
      toast.success("You have successfully exited the group.");
  
      // Delete group
      deleteGroupMutate(deleteGroupObject.list_Id);
  
      // Delete associated tasks
      if (filteredTaskIds?.length) {
        deleteTaskMutate(filteredTaskIds);
      }
  
      // Navigation and cleanup
      if (!isDeletingGroup && !isDeletingTask) {
        setIsDeleteGroup(false);
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while exiting the group.");
    }
  };
  
  return (
    <PreviewWithModal
      title='delete group'
      ariaLabel='delete group'
      width='w-[22rem]'
      modalBackground='bg-foreground/20'
      closeModal={() => setIsDeleteGroup(false)}>
      <div className='flex flex-col space-y-4'>
        <div className='w-full grid place-items-center'>
          <Trash2 strokeWidth={1.5} size={50} />
        </div>
        <div className='flex flex-col space-y-2 justify-center w-full'>
          <Text variant={"h3"} className='text-center'>
            Are you sure you want to delete this group?
          </Text>
          <Text
            variant={"p"}
            className='text-center font-medium text-foreground/60'>
            This action will also delete all tasks in the &quot;
            {deleteGroupObject?.group_label}&quot; group.
          </Text>
        </div>

        <div className='flex justify-between items-center w-full'>
          <Button variant={"outline"} onClick={() => setIsDeleteGroup(false)}>
            Close
          </Button>
          <Button
            variant={"destructive"}
            isLoading={isDeletingGroup && isDeletingTask}
            onClick={handleDeleteList}>
            Delete
          </Button>
        </div>
      </div>
    </PreviewWithModal>
  );
}
