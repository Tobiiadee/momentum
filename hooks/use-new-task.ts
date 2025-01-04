import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateTask,
  deleteTask,
  fetchTasks,
  addTask,
  uploadTaskFiles,
  deleteTaskFiles,
  fetchTaskFiles,
} from "@/modules/supabase/utils/actions";
import { useRouter } from "next/navigation";

export interface UpdateTaskType {
  updatedTask: Partial<Task>;
  task_id: string;
}

export function useNewTask(user_id: string, task_id?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  // Fetch all tasks
  const {
    isLoading: isLoadingAllTasks,
    isError: isAllTasksError,
    data: allTasks,
    error: allTasksError,
    refetch: refetchAllTasks,
  } = useQuery({
    queryKey: ["all-task", user_id],
    queryFn: async () => {
      if (!user_id) throw new Error("User ID is required");
      return fetchTasks(user_id);
    },
    enabled: !!user_id,
  });

  // Add a task
  const {
    isPending: isAddingTask,
    mutate: addTaskMutate,
    isError: isAddTaskError,
    error: addTaskError,
  } = useMutation({
    mutationFn: (task: Task) => addTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-task", user_id] });

      router.push("/dashboard");
    },
  });

  // Update a task
  const {
    isPending: isUpdatingTask,
    mutate: updateTaskMutate,
    isError: isUpdateTaskError,
    error: updateTaskError,
    isSuccess: isUpdateTaskSuccess,
  } = useMutation({
    mutationFn: ({ task_id, updatedTask }: UpdateTaskType) =>
      updateTask(task_id, updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-task", user_id] });
    },
  });

  // Delete a task
  const {
    isPending: isDeletingTask,
    mutate: deleteTaskMutate,
    isError: isDeleteTaskError,
    error: deleteTaskError,
  } = useMutation({
    mutationFn: (task_id: string | string[]) => deleteTask(task_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-task", user_id] });
    },
  });

  //upload task files

  type UploadTaskFilesType = {
    task_id: string;
    files: File[];
  };

  const {
    mutate: uploadTaskFilesMutate,
    isPending: isUploadingTaskFiles,
    isSuccess: isUploadTaskFilesSuccess,
    isError: isUploadTaskFilesError,
    error: uploadTaskFilesError,
  } = useMutation({
    mutationFn: ({ task_id, files }: UploadTaskFilesType) =>
      uploadTaskFiles(task_id, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-task", user_id] });
    },
  });

  //fetch task files

  const {
    isLoading: isFetchingTaskFiles,
    isError: isFetchTaskFilesError,
    data: taskFiles,
    error: fetchTaskFilesError,
    refetch: refetchTaskFiles,
  } = useQuery({
    queryKey: ["task-files", task_id],
    queryFn: async () => {
      if (!user_id) throw new Error("User ID is required");
      if (!task_id) throw new Error("Task ID is required");
      return fetchTaskFiles(task_id as string);
    },
    enabled: !!user_id && !!task_id,
  });

  // Delete a task file
  type DeleteTaskFileType = {
    fileUrls: string[];
    taskId: string;
  };

  const {
    mutate: deleteTaskFileMutate,
    isPending: isDeletingTaskFile,
    isError: isDeleteTaskFileError,
    isSuccess: isDeleteTaskFileSuccess,
  } = useMutation({
    mutationFn: ({ fileUrls, taskId }: DeleteTaskFileType) =>
      deleteTaskFiles(fileUrls, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-task", user_id] });
    },
  });

  return {
    // Tasks
    allTasks,
    isLoadingAllTasks,
    isAllTasksError,
    allTasksError,
    refetchAllTasks,

    // Add task
    isAddingTask,
    addTaskMutate,
    isAddTaskError,
    addTaskError,

    // Update task
    isUpdatingTask,
    updateTaskMutate,
    isUpdateTaskError,
    updateTaskError,
    isUpdateTaskSuccess,

    // Delete task
    isDeletingTask,
    deleteTaskMutate,
    isDeleteTaskError,
    deleteTaskError,

    // Upload task files
    isUploadingTaskFiles,
    uploadTaskFilesMutate,
    isUploadTaskFilesSuccess,
    isUploadTaskFilesError,
    uploadTaskFilesError,

    // Delete task file
    isDeletingTaskFile,
    deleteTaskFileMutate,
    isDeleteTaskFileError,
    isDeleteTaskFileSuccess,

    // Fetch task files
    isFetchingTaskFiles,
    refetchTaskFiles,
    isFetchTaskFilesError,
    fetchTaskFilesError,
    taskFiles,
  };
}
