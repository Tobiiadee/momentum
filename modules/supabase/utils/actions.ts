import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Fetch tasks for the user, excluding soft-deleted tasks
export const fetchTasks = async (userId: string): Promise<Task[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("is_deleted", false); // Exclude soft-deleted tasks

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

//soft delete task
export const deleteTask = async (task_id: string | string[]) => {
  // Ensure `task_id` is always an array
  const taskIds = Array.isArray(task_id) ? task_id : [task_id];

  const { error } = await supabase
    .from("tasks")
    .update({ is_deleted: true })
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
    .eq("user_id", userId)
    .eq("is_deleted", false); // Exclude soft-deleted lists

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

//soft detete list
export async function deleteList(list_id: string) {
  const { error } = await supabase
    .from("lists")
    .update({ is_deleted: true })
    .eq("list_id", list_id);

  if (error) throw error;
}

export async function createGroup(userId: string, group: GroupType) {
  if (!userId) {
    throw new Error("No user ID found");
  }

  const { error } = await supabase.from("groups").insert([group]).select();

  return error;
}

export async function fetchGroups(userId: string): Promise<GroupType[]> {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("creator_id", userId);

  if (error) throw error;

  return data || [];
}

export async function fetchGroup(group_id: string): Promise<GroupType | null> {
  // console.log("calling fetch group function");
  
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("list_id", group_id)
    .single();

  if (error) throw error;
// console.log("data from server:", data);

  return data || null;
}

export async function deleteGroup(group_id: string) {
  const { error } = await supabase
    .from("groups")
    .delete()
    .eq("list_id", group_id);

  if (error) throw error;
}

//fetch all users
export async function fetchUsers(): Promise<UserDataType[]> {
  const { data, error } = await supabase.from("users").select("*");

  if (error) throw error;

  return data || [];
}

//search users
export async function searchUsers(searchTerm: string): Promise<UserDataType[]> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("email", `%${searchTerm}%`);

  if (error) throw error;

  return data || [];
}

// Fetch a single user by their ID
export async function fetchUser(userId: string): Promise<UserDataType> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId);

  if (error) throw error;

  return data[0] || null;
}

export async function uploadTaskFiles(task_id: string, files: File[]) {
  if (!task_id) {
    throw new Error("No task ID found");
  }

  const bucketName = "task_files";

  // Map over the files array and upload each file
  const uploadPromises = files.map(async (file) => {
    const filePath = `${task_id}/${file.name}`;

    // Upload the file to the specified bucket
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600", // 1 hour cache
        upsert: true, // If file already exists, overwrite it
      });

    if (uploadError) {
      console.error(`Error uploading file ${file.name}:`, uploadError.message);
      return {
        fileName: file.name,
        success: false,
        error: uploadError.message,
      };
    }

    // Generate a public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    const publicUrl = publicUrlData?.publicUrl;

    if (!publicUrl) {
      console.error(`Error generating URL for file ${file.name}`);
      return {
        fileName: file.name,
        success: false,
        error: "Failed to generate public URL",
      };
    }

    // Save metadata to the database
    const { error: dbError } = await supabase.from("task_files").insert({
      task_id: task_id,
      file_url: publicUrl,
      file_name: file.name,
      uploaded_at: new Date(),
    });

    if (dbError) {
      console.error(
        `Error saving file metadata ${file.name}:`,
        dbError.message
      );
      return { fileName: file.name, success: false, error: dbError.message };
    }

    // Return success for the current file
    return { fileName: file.name, success: true, fileUrl: publicUrl };
  });

  // Execute all file upload promises concurrently
  const results = await Promise.all(uploadPromises);

  // Return the results array for further processing
  return results;
}

export async function fetchTaskFiles(task_id: string): Promise<TaskFileType[]> {
  const { data, error } = await supabase
    .from("task_files")
    .select("*")
    .eq("task_id", task_id);

  if (error) throw error;

  return data || [];
}

export async function deleteTaskFiles(fileUrls: string[], taskId: string) {
  const bucketName = "task_files";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    throw new Error("No Supabase URL found");
  }

  // Map fileUrls to file paths
  const filePaths = fileUrls.map((fileUrl) =>
    fileUrl.replace(
      `https://${supabaseUrl}/storage/v1/object/public/${bucketName}/`,
      ""
    )
  );

  // Delete from Storage
  const { error: storageError } = await supabase.storage
    .from(bucketName)
    .remove(filePaths);

  if (storageError) {
    return storageError.message;
  }

  // Delete from Database
  const { error: dbError } = await supabase
    .from("task_files")
    .delete()
    .in("file_url", fileUrls)
    .eq("task_id", taskId);

  if (dbError) {
    return dbError.message;
  }

  return true;
}
