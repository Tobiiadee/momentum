import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateTask,
  deleteTask,
  fetchTasks,
  addTask,
} from "@/modules/supabase/utils/actions";
import { useRouter } from "next/navigation";

interface UpdateTaskType {
  updatedTask: Partial<Task>;
  task_id: string;
}

export function useNewTask(user_id: string) {
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
    mutationFn: (task_id: string) => deleteTask(task_id),
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

    // Delete task
    isDeletingTask,
    deleteTaskMutate,
    isDeleteTaskError,
    deleteTaskError,
  };
}
