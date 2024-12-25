import { useState, useEffect } from "react";
import { createClient, PostgrestError } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Task {
  task_id: string;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  call_link?: string;
  list: string;
  due_date: string;
  time_range: string;
  type: "list" | "group";
}

export function useTasks(userId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError |string | null>(null);
  const [onSuccess, setOnSuccess] = useState(false);

  // Fetch tasks for the user
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    setOnSuccess(false);
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      setOnSuccess(true);
      setTasks(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (task: Task) => {
    setLoading(true);
    setError(null);
    setOnSuccess(false);
    try {
      const { data, error } = await supabase.from("tasks").insert([task]).select();

      if (error) setError(error);
      setOnSuccess(true);
      setLoading(false);
      setTasks((prevTasks) => [...prevTasks, ...(data || [])]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing task
  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    setLoading(true);
    setError(null);
    setOnSuccess(false);
    try {
      const { error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", taskId);

      if (error) throw error;
      setOnSuccess(true);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.task_id === taskId ? { ...task, ...updates } : task
        )
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (taskId: string) => {
    setLoading(true);
    setError(null);
    setOnSuccess(false);
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);

      if (error) throw error;

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.task_id !== taskId)
      );
      setOnSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks when userId changes
  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  return {
    tasks,
    loading,
    error,
    onSuccess,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
