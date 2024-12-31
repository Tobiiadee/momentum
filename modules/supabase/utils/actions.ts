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

export const deleteTask = async (task_id: string | string[]) => {
  // Ensure `task_id` is always an array
  const taskIds = Array.isArray(task_id) ? task_id : [task_id];

  const { error } = await supabase
    .from("tasks")
    .delete()
    .in("task_id", taskIds); // Use `in` to match multiple task IDs

  if (error) throw error;
};

export const editProfile = async (
  user_id: string,
  updatedData: Partial<UserDataType>
) => {
  console.log("calling function!");
  const { error } = await supabase
    .from("users")
    .update(updatedData) // Pass the updated fields
    .eq("id", user_id); // Match the user by their ID

  if (error) return error;
};

// Upload function
export async function uploadFile(userId: string, file: File) {
  if (!userId) {
    throw new Error("No user ID found");
  }

  const filePath = `profile_picture/${userId}/${file.name}`;

  // Upload the image to Supabase Storage
  const { error } = await supabase.storage
    .from("user_data")
    .upload(filePath, file, {
      cacheControl: "3600", // 1 hour cache
      upsert: true, // If file already exists, overwrite it
    });

  if (error) {
    return error;
  }

  // Generate a public URL for the uploaded image
  const {
    data: { publicUrl },
  } = supabase.storage.from("user_data").getPublicUrl(filePath);

  if (!publicUrl) {
    console.error("Error generating public URL:", error);
    return null;
  }

  return publicUrl;
}

export async function storeImageUrlInDatabase(
  userId: string,
  imageUrl: string
) {
  if (!userId) {
    throw new Error("No user ID found");
  }

  const { error } = await supabase
    .from("users")
    .update({ avatar: imageUrl }) // Store the image URL
    .eq("id", userId); // Update the user with the given ID

  // console.log(error);

  if (error) {
    return error;
  }
}

export async function fetchLists(userId: string): Promise<ListType[]> {
  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data || [];
}

export async function createList(userId: string, list: ListType) {
  if (!userId) {
    throw new Error("No user ID found");
  }

  const { error } = await supabase
    .from("lists")
    .insert([{ user_id: userId, ...list }])
    .select();

  return error;
}

export async function deleteList(list_id: string) {
  const { error } = await supabase
    .from("lists")
    .delete()
    .eq("list_id", list_id);

  if (error) throw error;
}

export async function createGroup(userId: string, group: GroupType) {
  if (!userId) {
    throw new Error("No user ID found");
  }

  const { error } = await supabase
    .from("groups")
    .insert([{ user_id: userId, ...group }])
    .select();

  return error;
}

export async function fetchGroups(userId: string): Promise<GroupType[]> {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data || [];
}

export async function deleteGroup(group_id: string) {
  const { error } = await supabase
    .from("groups")
    .delete()
    .eq("group_id", group_id);

  if (error) throw error;
}
