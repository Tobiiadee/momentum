/*eslint-disable @typescript-eslint/no-explicit-any */

import { createClient } from "@supabase/supabase-js";
import { deleteUserAccount } from "./delete-user-account";
// import { deleteUserServer } from "./delete-user-server";
// import { deleteUserServer } from "./delete-user-server";

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
    .eq("completed", false) // Exclude completed tasks
    .eq("is_deleted", false); // Exclude soft-deleted tasks

  if (error) throw error;

  return data || [];
};

export const fetchCompletedTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("completed", true) // Exclude completed tasks
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

export const fetchTaskById = async (taskId: string): Promise<Task> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("task_id", taskId)
    .single();

  if (error) throw error;

  return data || null;
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

  return data || [];
};

//set task as completed
export const setTaskAsCompleted = async (task_id: string) => {
  const { error } = await supabase
    .from("tasks")
    .update({ completed: true })
    .eq("task_id", task_id);

  if (error) {
    throw new Error(error.message);
  }
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

//fetch list by id
export async function fetchList(listId: string): Promise<ListType> {
  const { data, error } = await supabase
    .from("lists")
    .select()
    .eq("list_id", listId)
    .single();

  if (error) throw error;

  return data;
}

//Rename list
export async function renameList(listId: string, newName: string) {
  const { error, data } = await supabase
    .from("lists")
    .update({ label: newName })
    .eq("list_id", listId);

  if (error) throw error;

  return data;
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

  //Insert group into groups table
  const { error } = await supabase
    .from("groups")
    .insert([
      {
        list_id: group.list_id,
        label: group.label,
        creator_id: userId,
        type: group.type,
      },
    ])
    .select();

  //Insert group creator into group_members table
  const { error: memberError } = await supabase
    .from("group_members")
    .insert([{ group_id: group.list_id, member_id: userId, role: "admin" }])
    .select();

  return error || memberError;
}

//Add member to group_members table

export async function addMemberToGroup(
  groupId: string,
  memberId: string,
  role: string
) {
  const { error } = await supabase
    .from("group_members")
    .insert([{ group_id: groupId, member_id: memberId, role: role }])
    .select();

  if (error) throw error;

  return `Successfully added ${memberId} to the group.`;
}

//update group data

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

//Fetch groups where user is a member

export async function groupsUserIsMember(userId: string): Promise<GroupType[]> {
  //fetch the group ids where the user is a member
  const { data: memberDetails, error: memberDetailsError } = await supabase
    .from("group_members")
    .select("group_id, member_id, role, created_at")
    .eq("member_id", userId);

  if (memberDetailsError) throw memberDetailsError;

  //fetch the groups where the user is a member using the group_ids
  const { data: groups, error: groupsError } = await supabase
    .from("groups")
    .select("list_id, label, creator_id, created_at, type")
    .in(
      "list_id",
      memberDetails.map((group) => group.group_id)
    );

  if (groupsError) throw groupsError;

  //Reconstruct the group object to include group members
  const reconstructedGroups = groups.map((group) => ({
    ...group,
    members: memberDetails.filter((member) => {
      return {
        member_id: member.member_id,
        role: member.role,
        created_at: member.created_at,
      };
    }),
  }));

  return reconstructedGroups || [];
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

  const membersToAdd = newMembers.map((member) => ({
    group_id: groupId,
    member_id: member.member_id,
    role: member.role,
  }));

  //Insert new members into group_members table
  const { error: memberError } = await supabase
    .from("group_members")
    .insert(membersToAdd)
    .select();

  if (memberError) {
    throw new Error(
      `Error adding members to the group: ${memberError.message}`
    );
  }

  return `Successfully added ${membersToAdd.length} members to the group.`;
}

//Check if user is a member of a group
export async function isUserMemberOfGroup(userId: string, groupId: string) {
  const { data, error } = await supabase
    .from("group_members")
    .select("*")
    .eq("member_id", userId)
    .eq("group_id", groupId);

  if (error) throw error;

  if (data.length > 0) {
    return true;
  }

  return false;
}

//Fetch members of a group
export async function fetchMembersOfAGroup(
  groupId: string
): Promise<AddMemberType[]> {
  const { data, error } = await supabase
    .from("group_members")
    .select("*")
    .eq("group_id", groupId);

  if (error) throw error;

  return data || [];
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
  newRole: "admin" | "member" | "guest";
  userId?: string; // The ID of the user making the request
}

//update member role
export async function updateMemberRole(
  groupId: string,
  memberId: string,
  newRole: "Admin" | "Member" | "Guest"
) {
  const { error } = await supabase
    .from("group_members")
    .update({ role: newRole })
    .eq("group_id", groupId)
    .eq("member_id", memberId);

  if (error) throw error;

  return `Successfully updated ${memberId} role to ${newRole} in group ${groupId}.`;
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
    //delete invites associated with the group
    const { error: inviteError } = await supabase
      .from("invite_table")
      .delete()
      .eq("group_id", group_id);

    if (inviteError)
      throw new Error(`Error deleting invites: ${inviteError.message}`);

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

// Search users by email or username
export async function searchUsers(searchTerm: string): Promise<UserDataType[]> {
  if (!searchTerm || searchTerm.trim().length < 3) {
    throw new Error("Search term must be at least 3 characters long");
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .or(`email.ilike.%${searchTerm}%,username.ilike.%${searchTerm}%`); // Partial match for email or username

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

// Delete user
export async function deleteUser(userId: string) {
  // console.log(userId)

  try {
    //   // Delete user form invite table
    //   await supabase.from("invite_table").delete().eq("sender_id", userId);

    //   // Delete user form notification table
    //   await supabase.from("notification_table").delete().eq("user_id", userId);

    //   // Step 1: Fetch task IDs for storage cleanup
    //   const { data: taskData, error: fetchTaskError } = await supabase
    //     .from("tasks")
    //     .select("task_id")
    //     .eq("user_id", userId);

    //   if (fetchTaskError) throw new Error("Failed to fetch task IDs");

    //   // Step 4: Delete tasks associated with the user
    //   await supabase.from("tasks").delete().eq("user_id", userId);

    //   // Step 5: Delete lists associated with the user
    //   await supabase.from("lists").delete().eq("user_id", userId);

    //   // Step 6: Remove user from groups
    //   const { data: groups, error: fetchGroupsError } = await supabase
    //     .from("groups")
    //     .select("list_id, creator_id, members")
    //     .returns<GroupType[]>();

    //   if (fetchGroupsError) throw new Error("Failed to fetch groups");

    //   for (const group of groups) {
    //     const { list_id, creator_id, members } = group;

    //     // Remove the user from the members array
    //     const updatedMembers = members.filter(
    //       (member) => member?.member_id !== userId
    //     );

    //     if (creator_id === userId) {
    //       // User is the creator - reassign or delete

    //       const newCreator = updatedMembers[0].member_id;

    //       const updatedMembersRoles = updatedMembers.map((member) => ({
    //         member_id: member.member_id,
    //         role: member.member_id === newCreator ? "Admin" : "Member",
    //       }));

    //       if (updatedMembers.length > 0) {
    //         await supabase
    //           .from("groups")
    //           .update({
    //             creator_id: newCreator,
    //             members: updatedMembersRoles,
    //           })
    //           .eq("list_id", list_id);
    //       } else {
    //         await supabase.from("groups").delete().eq("list_id", list_id);
    //       }
    //     } else {
    //       // Just a member - update group

    //       const updatedMembers = members.filter(
    //         (member) => member.member_id !== userId
    //       );

    //       await supabase
    //         .from("groups")
    //         .update({ members: updatedMembers })
    //         .eq("list_id", list_id);
    //     }
    //   }

    //   const taskFilePaths =
    //     taskData?.map((task) => `task-files/${task.task_id}`) || [];

    //   // Step 2: Delete associated files in storage
    //   if (taskFilePaths.length > 0) {
    //     const { error: storageError } = await supabase.storage
    //       .from("task-files")
    //       .remove(taskFilePaths);

    //     if (
    //       storageError &&
    //       storageError.message !== "Some paths were not found"
    //     ) {
    //       throw new Error("Failed to delete task files");
    //     }
    //   }

    //   // Step 3: Delete user profile picture
    //   const { error: profilePictureError } = await supabase.storage
    //     .from("user_data")
    //     .remove([`profile_picture/${userId}`]);

    //   if (profilePictureError)
    //     throw new Error("Failed to delete profile picture");

    //   // Step 7: Delete user from users table
    //   const { error: deleteUserError } = await supabase
    //     .from("users")
    //     .delete()
    //     .eq("id", userId);

    //   if (deleteUserError) throw new Error("Failed to delete user data");

    // Step 8: Delete user from Supabase Auth
    await deleteUserAccount();

    // console.log("User deleted successfully!");
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
  }
}

// Search for entities (tasks, files, people) by searchTerm
export async function searchEntities(
  searchTerm: string,
  userId: string
): Promise<SearchReturnType> {
  if (!searchTerm.trim()) {
    throw new Error("Search term cannot be empty.");
  }

  try {
    // Fetch user's tasks (tasks created by the user) with searchTerm
    const { data: userTasks, error: userTaskError } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .eq("is_deleted", false)
      .ilike("title", `%${searchTerm}%`);

    if (userTaskError) {
      throw new Error(`Error fetching user's tasks: ${userTaskError.message}`);
    }

    // Fetch groups where the user is a member
    const { data: allGroups, error: groupError } = await supabase
      .from("groups")
      .select("list_id, members");

    if (groupError) {
      throw new Error(`Error fetching groups: ${groupError.message}`);
    }

    // Filter groups where the user is a member
    const userGroupIds = allGroups
      ?.filter((group) =>
        group.members.some((member: any) => member.member_id === userId)
      )
      .map((group) => group.list_id);

    // Fetch tasks from the user's groups with searchTerm
    const { data: groupTasks, error: groupTaskError } = await supabase
      .from("tasks")
      .select("*")
      .in("list_id", userGroupIds)
      .eq("is_deleted", false)
      .ilike("title", `%${searchTerm}%`);

    if (groupTaskError) {
      throw new Error(`Error fetching group tasks: ${groupTaskError.message}`);
    }

    // Combine tasks (user's tasks + group tasks) and remove duplicates by task_id
    const allTasks = Array.from(
      new Map(
        [...(userTasks || []), ...(groupTasks || [])].map((task) => [
          task.task_id,
          task,
        ])
      ).values()
    );

    // Fetch files linked to the user's tasks with searchTerm
    const userTaskIds = (userTasks || []).map((task) => task.task_id);
    const { data: userTaskFiles, error: userFilesError } = await supabase
      .from("task_files")
      .select("*")
      .in("task_id", userTaskIds)
      .ilike("file_name", `%${searchTerm}%`);

    if (userFilesError) {
      throw new Error(
        `Error fetching user task files: ${userFilesError.message}`
      );
    }

    // Fetch files linked to group tasks with searchTerm
    const groupTaskIds = (groupTasks || []).map((task) => task.task_id);

    const { data: groupTaskFiles, error: groupFilesError } = await supabase
      .from("task_files")
      .select("*")
      .in("task_id", groupTaskIds)
      .ilike("file_name", `%${searchTerm}%`);

    if (groupFilesError) {
      throw new Error(
        `Error fetching group task files: ${groupFilesError.message}`
      );
    }

    // Combine files (user's files + group files) and remove duplicates by task_id
    const allFiles = Array.from(
      new Map(
        [...(userTaskFiles || []), ...(groupTaskFiles || [])].map((file) => [
          file.task_id,
          file,
        ])
      ).values()
    );

    // Search for people by username or full_name
    const { data: people, error: peopleError } = await supabase
      .from("users")
      .select("*")
      .or(`username.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`);

    if (peopleError) {
      throw new Error(`Error searching people: ${peopleError.message}`);
    }

    return {
      tasks: allTasks,
      files: allFiles,
      people: people || [],
    };
  } catch (error: any) {
    console.error("Error searching entities:", error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}

//Get pending invites
export async function getGroupPendingInvites(
  group_id: string
): Promise<InviteType[]> {
  const { data: invites, error: invitesError } = await supabase
    .from("invite_table")
    .select("*")
    .eq("group_id", group_id)
    .eq("status", "pending");

  if (invitesError) {
    throw new Error(invitesError.message || "An unexpected error occurred.");
  }
  return invites || [];
}

//fetch notifications
export async function fetchNotifications(
  userId: string
): Promise<NotificationType[]> {
  const { data, error } = await supabase
    .from("notification_table")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notifications:", error.message);
  }

  return data || [];
}

export async function fetchUsersByInviteId(
  invite_id: string,
  user_id: string
): Promise<UserDataType[]> {
  // Fetch data from the table
  const { data, error } = await supabase
    .from("invite_table")
    .select("*")
    .eq("invite_id", invite_id)
    .eq("sender_id", user_id);

  if (error) throw new Error(error.message || "An unexpected error occurred.");

  // Extract user IDs
  const user_ids = data?.map((entry) => entry.reciever_id) || [];

  // Fetch users for each user_id concurrently
  const users = await Promise.all(user_ids.map((id) => fetchUser(id)));

  return users;
}
