"use client";

import { useNewTask } from "@/hooks/use-new-task";
import { Skeleton } from "@/modules/common/ui/skeleton";
import { Text } from "@/modules/common/ui/text";
import useUserStore from "@/modules/store/user-store";
import {
  fetchGroup,
  fetchTasksByListId,
} from "@/modules/supabase/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import GroupAllFilesItem from "./components/group-all-files-item";
import EmptyTaskModule from "@/modules/common/components/shared/empty-state/empty-task-module";

export default function GroupFiles() {
  const user = useUserStore((state) => state.user);
  const { groupId } = useParams();
  const router = useRouter();

  //Fetch group
  const { data: group, isLoading: isLoadingGroup } = useQuery({
    queryKey: [groupId],
    queryFn: async () => fetchGroup(groupId as string),
  });

  const listId = group?.list_id;

  // Check if the user is a member of the group
  const isUserMember = group?.members.some(
    (member) => member.member_id === user?.id
  );

  // Redirect if the user is not a member
  useEffect(() => {
    if (!isLoadingGroup && !isUserMember) {
      router.replace("/dashboard");
    }
  }, [isLoadingGroup, isUserMember, router]);

  // Fetch tasks by list_id
  const {
    data: fetchedTasksByListId,
    isLoading: isLoadingFetchedTasksByListId,
    isError: isFetchedTasksErrorByListId,
    error: fetchedTasksErrorByListId,
    refetch: refetchFetchedTasksByListId,
  } = useQuery({
    queryKey: ["tasks-by-list-id", listId],
    queryFn: async () => {
      if (!listId) throw new Error("List ID is required");
      return fetchTasksByListId(listId as string);
    },
    enabled: !!listId && isUserMember,
  });

  const taskIds = fetchedTasksByListId?.map((task) => task.task_id);

  // Fetch task files
  const { isFetchingTaskFiles, isFetchTaskFilesError, taskFiles } = useNewTask(
    user?.id as string,
    taskIds
  );

  const numberOfFiles = taskFiles?.length;

  // Refetch tasks when the component mounts or `listId` changes
  useEffect(() => {
    if (listId) refetchFetchedTasksByListId();
  }, [listId, refetchFetchedTasksByListId]);

  if (!isUserMember) return null;

  // Render content
  return (
    <div className='flex flex-col space-y-4'>
      <Text variant={"h3"} className='font-medium'>
        Files({numberOfFiles || 0})
      </Text>
      {isLoadingGroup &&
        isFetchedTasksErrorByListId &&
        fetchedTasksErrorByListId &&
        isFetchTaskFilesError && (
          <div className='w-full '>
            <EmptyTaskModule height='h-[40vh]' text='An error occured' />
          </div>
        )}

      {!isFetchingTaskFiles && !taskFiles && (
        <div className='w-full '>
          <EmptyTaskModule height='h-[40vh]' text='No files uploaded yet' />
        </div>
      )}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {isLoadingFetchedTasksByListId &&
          isFetchingTaskFiles &&
          Array.from({ length: 4 }).map((_, i) => (
            <GroupFilesSkeleton key={i} />
          ))}
        {taskFiles?.map((file, index) => (
          <GroupAllFilesItem
            key={file.id}
            file_name={file.file_name}
            file_url={file.file_url}
            index={index}
            created_at={file.created_at}
            task_id={file.task_id}
            uploaded_at={file.uploaded_at}
            id={file.id}
          />
        ))}
      </div>
    </div>
  );
}

function GroupFilesSkeleton() {
  return <Skeleton className='w-full h-full rounded-md' />;
}
