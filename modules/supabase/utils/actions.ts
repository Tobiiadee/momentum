/*eslint-disable @typescript-eslint/no-explicit-any */

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

//fetch task by list_id
export const fetchTasksByListId = async (listId: string): Promise<Task[]> => {
  if (!listId) throw new Error("List ID is required to fetch tasks.");

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("list_id", listId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
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

export async function updateGroup(
  userId: string,
  groupId: string,
  updatedData: Partial<GroupType>
) {
  if (!userId) {
    throw new Error("No user ID found");
  }
  if (!groupId) {
    throw new Error("No group ID provided");
  }

  const { data, error } = await supabase
    .from("groups")
    .update(updatedData)
    .eq("list_id", groupId) // Assuming "id" is the unique identifier for groups
    .eq("creator_id", userId); // Optional: Ensure the group belongs to the user

  if (error) {
    throw new Error(`Error updating group: ${error.message}`);
  }

  return data;
}

export async function fetchGroups(userId: string): Promise<GroupType[]> {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("creator_id", userId);

  if (error) throw error;

  return data || [];
}

export async function fetchAllGroups(): Promise<GroupType[] | null> {
  const { data, error } = await supabase.from("groups").select("*");

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

//add members to group
export async function addMembersToGroup(
  groupId: string,
  newMembers: AddMemberType[]
): Promise<string> {
  if (newMembers.length === 0) {
    throw new Error("No members provided to add to the group.");
  }

  // Fetch the existing group
  const { data: group, error: fetchError } = await supabase
    .from("groups")
    .select("members")
    .eq("list_id", groupId)
    .single();

  if (fetchError) {
    throw new Error(`Error fetching group: ${fetchError.message}`);
  }

  if (!group) {
    throw new Error(`Group with ID ${groupId} not found.`);
  }

  const existingMembers: AddMemberType[] = group.members || [];

  // Filter out members that are already in the group
  const membersToAdd = newMembers.filter(
    (newMember) =>
      !existingMembers.some(
        (member) => member.member_id === newMember.member_id
      )
  );

  if (membersToAdd.length === 0) {
    return "All provided members are already in the group.";
  }

  // Update the group's members array with new members
  const updatedMembers = [...existingMembers, ...membersToAdd];

  const { error: updateError } = await supabase
    .from("groups")
    .update({ members: updatedMembers })
    .eq("list_id", groupId);

  if (updateError) {
    throw new Error(`Error updating group members: ${updateError.message}`);
  }

  return `Successfully added ${membersToAdd.length} members to the group.`;
}

//Delete member from group
export async function deleteMemberFromGroup(
  groupId: string,
  memberId: string
): Promise<string> {
  // Fetch the existing group
  const { data: group, error: fetchError } = await supabase
    .from("groups")
    .select("members")
    .eq("list_id", groupId)
    .single();

  if (fetchError) {
    throw new Error(`Error fetching group: ${fetchError.message}`);
  }

  if (!group) {
    throw new Error(`Group with ID ${groupId} not found.`);
  }

  const existingMembers: AddMemberType[] = group.members || [];

  // Check if the member exists in the group
  const memberExists = existingMembers.some(
    (member) => member.member_id === memberId
  );

  if (!memberExists) {
    throw new Error(`Member with ID ${memberId} not found in the group.`);
  }

  // Filter out the member to delete
  const updatedMembers = existingMembers.filter(
    (member) => member.member_id !== memberId
  );

  // Update the group's members array
  const { error: updateError } = await supabase
    .from("groups")
    .update({ members: updatedMembers })
    .eq("list_id", groupId);

  if (updateError) {
    throw new Error(`Error updating group members: ${updateError.message}`);
  }

  return `Member with ID ${memberId} removed successfully from group ${groupId}.`;
}

export interface UpdateRoleType {
  groupId: string;
  memberId: string;
  newRole: "Admin" | "Member" | "Guest";
  userId: string; // The ID of the user making the request
}

//update member role

export async function updateMemberRole({
  groupId,
  memberId,
  newRole,
  userId,
}: UpdateRoleType): Promise<{ success: boolean; message: string }> {
  try {
    // Fetch the group data to check permissions
    const { data: groupData, error: groupError } = await supabase
      .from("groups")
      .select("creator_id, members")
      .eq("list_id", groupId)
      .single();

    if (groupError) {
      throw new Error("Failed to fetch group data.");
    }

    const { creator_id, members } = groupData;

    // Check if the user is either the creator or an admin
    const isAuthorized =
      userId === creator_id ||
      members.some(
        (member: { member_id: string; role: string }) =>
          member.member_id === userId && member.role === "Admin"
      );

    if (!isAuthorized) {
      return {
        success: false,
        message: "You are not authorized to update roles.",
      };
    }

    // Update the member's role in the members array
    const updatedMembers = members.map(
      (member: { member_id: string; role: string }) =>
        member.member_id === memberId ? { ...member, role: newRole } : member
    );

    // Update the group in the database
    const { error: updateError } = await supabase
      .from("groups")
      .update({ members: updatedMembers })
      .eq("list_id", groupId);

    if (updateError) {
      throw new Error("Failed to update member role.");
    }

    return { success: true, message: "Member role updated successfully." };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

//user exit from group
export const exitGroup = async (userId: string, groupId: string) => {
  if (!userId || !groupId) {
    throw new Error("User ID and Group ID are required.");
  }

  // Fetch the group to ensure the user is a member
  const { data: group, error: fetchError } = await supabase
    .from("groups")
    .select("members")
    .eq("list_id", groupId)
    .single();

  if (fetchError) {
    throw new Error("Error fetching the group: " + fetchError.message);
  }

  const members = group?.members || [];

  // Check if the user is a member of the group
  const isMember = members.some(
    (member: AddMemberType) => member.member_id === userId
  );

  if (!isMember) {
    throw new Error("You are not a member of this group.");
  }

  // Remove the user from the group members
  const updatedMembers = members.filter(
    (member: AddMemberType) => member.member_id !== userId
  );

  // Update the group in the database
  const { error: updateError } = await supabase
    .from("groups")
    .update({ members: updatedMembers })
    .eq("list_id", groupId);

  if (updateError) {
    throw new Error("Error exiting the group: " + updateError.message);
  }

  return { success: true, message: "You have successfully exited the group." };
};

//delete group

export async function deleteGroup(group_id: string) {
  try {
    // Fetch tasks associated with the group
    const { data: tasksInGroup, error: fetchError } = await supabase
      .from("tasks")
      .select("task_id")
      .eq("list_id", group_id)
      .eq("is_deleted", false); // Exclude soft-deleted tasks

    if (fetchError)
      throw new Error(`Failed to fetch tasks: ${fetchError.message}`);

    const taskIds = tasksInGroup?.map((task) => task.task_id) || [];

    // Soft-delete associated tasks
    if (taskIds.length > 0) {
      const { error: updateError } = await supabase
        .from("tasks")
        .update({ is_deleted: true })
        .in("task_id", taskIds);

      if (updateError)
        throw new Error(`Failed to update tasks: ${updateError.message}`);
    }

    // Delete the group
    const { error: deleteError } = await supabase
      .from("groups")
      .delete()
      .eq("list_id", group_id);

    if (deleteError)
      throw new Error(`Failed to delete group: ${deleteError.message}`);

    return {
      success: true,
      message: "Group and its tasks were successfully deleted.",
    };
  } catch (error: any) {
    console.error("Error in deleteGroup:", error);
    throw new Error(
      error.message || "An error occurred while deleting the group."
    );
  }
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

export async function fetchAllUsers(): Promise<UserDataType[]> {
  const { data, error } = await supabase.from("users").select("*");
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

export async function fetchTaskFiles(
  taskIds: string | string[]
): Promise<TaskFileType[]> {
  // Ensure taskIds is always an array for consistent handling
  const ids = Array.isArray(taskIds) ? taskIds : [taskIds];

  if (ids.length === 0) {
    throw new Error("Task IDs array is empty or invalid.");
  }

  const { data, error } = await supabase
    .from("task_files")
    .select("*")
    .in("task_id", ids);

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
