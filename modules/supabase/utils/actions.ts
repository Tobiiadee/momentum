import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Fetch tasks for the user
export const fetchTasks = async (userId: string): Promise<Task[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data || [];
};

// Add a new task
export const addTask = async (task: Task) => {
  const { data, error } = await supabase.from("tasks").insert([task]).select();

  if (error) return error;

  return data || [];
};

export const updateTask = async (taskId: string, updates: Partial<Task>) => {
  const { error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("task_id", taskId);

  if (error) throw error;
};

export const deleteTask = async (task_id: string) => {
  const { error } = await supabase.from("tasks").delete().eq("task_id", task_id);

  if (error) throw error;
};
