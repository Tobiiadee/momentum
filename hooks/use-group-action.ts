import {
  addMembersToGroup,
  createGroup,
  deleteGroup,
  deleteMemberFromGroup,
  fetchAllGroups,
  fetchGroup,
  fetchGroups,
  updateGroup,
  updateMemberRole,
  UpdateRoleType,
} from "@/modules/supabase/utils/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useGroupAction(userId: string, group_id?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch all groups by user id
  const {
    isLoading: isLoadingAllGroups,
    isError: isAllGroupsError,
    data: allGroups,
    error: allGroupsError,
    refetch: refetchGroups,
  } = useQuery({
    queryKey: ["all-groups", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      return fetchGroups(userId);
    },
    enabled: !!userId,
  });

  //fetch all groups in table
  const {
    data: allGroupsInTable,
    isLoading: isLoadingAllGroupsInTable,
    isError: isAllGroupsInTableError,
    error: allGroupsInTableError,
    refetch: refetchAllGroupsInTable,
  } = useQuery({
    queryKey: ["all-groups"],
    queryFn: async () => {
      const allGroups = await fetchAllGroups();
      return allGroups;
    },
  });

  //fetch a group
  const {
    data: fetchedGroup,
    isLoading: isLoadingFetchedGroup,
    isError: isFetchedGroupError,
    error: fetchedGroupError,
  } = useQuery({
    queryKey: ["group", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      return fetchGroup(group_id as string);
    },
    enabled: !!userId,
  });

  interface UpdateGroupType {
    groupId: string;
    group: Partial<GroupType>;
  }

  //update group
  const {
    isPending: isUpdatingGroup,
    mutate: updateGroupMutate,
    isError: isUpdateGroupError,
    error: updateGroupError,
    isSuccess: isUpdateGroupSuccess,
  } = useMutation({
    mutationFn: ({ groupId, group }: UpdateGroupType) =>
      updateGroup(userId, groupId, group),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-groups", userId] });
      toast.success("Group updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  interface InviteMembersType {
    groupId: string;
    members: AddMemberType[];
  }

  //Invite members to group
  const {
    isPending: isInviteMembers,
    mutate: inviteMembersMutate,
    isError: isInviteMembersError,
    error: inviteMembersError,
  } = useMutation({
    mutationFn: ({ groupId, members }: InviteMembersType) =>
      addMembersToGroup(groupId, members),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-groups", userId] });
      toast.success("Invite sent successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //update member role
  const {
    isPending: isUpdatingMemberRole,
    mutate: updateMemberRoleMutate,
    isError: isUpdateMemberRoleError,
    error: updateMemberRoleError,
    isSuccess: isUpdateMemberRoleSuccess,
  } = useMutation({
    mutationFn: ({ groupId, memberId, newRole, userId }: UpdateRoleType) =>
      updateMemberRole({ groupId, memberId, newRole, userId }),
    onSuccess: (data, variables) => {
      const { newRole } = variables;
      queryClient.invalidateQueries({ queryKey: ["all-groups", userId] });
      toast.success("Member role updated to " + newRole);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // add a group
  const {
    isPending: isAddingGroup,
    mutate: addGroupMutate,
    isError: isAddGroupError,
    error: addGroupError,
    isSuccess: isAddGroupSuccess,
  } = useMutation({
    mutationFn: (group: GroupType) => createGroup(userId, group),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-groups", userId] });
      toast.success("Group created successfully");
      router.push("/dashboard/all-list-group");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Delete a group
  const {
    isPending: isDeletingGroup,
    mutate: deleteGroupMutate,
    isError: isDeleteGroupError,
    error: deleteGroupError,
  } = useMutation({
    mutationFn: (group_id: string) => deleteGroup(group_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-groups", userId] });
      toast.success("Group deleted successfully");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  interface DeleteMemberType {
    groupId: string;
    memberId: string;
  }

  //delete member from group
  const {
    isPending: isDeleteMember,
    mutate: deleteMemberMutate,
    isError: isDeleteMemberError,
    error: deleteMemberError,
  } = useMutation({
    mutationFn: ({ groupId, memberId }: DeleteMemberType) =>
      deleteMemberFromGroup(groupId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-groups", userId] });
      toast.success("Member removed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    //Groups
    allGroups,
    isLoadingAllGroups,
    isAllGroupsError,
    allGroupsError,
    refetchGroups,

    // Add group
    isAddingGroup,
    addGroupMutate,
    isAddGroupError,
    addGroupError,
    isAddGroupSuccess,

    // Delete group
    isDeletingGroup,
    deleteGroupMutate,
    isDeleteGroupError,
    deleteGroupError,

    //all groups in table
    allGroupsInTable,
    allGroupsInTableError,
    isAllGroupsInTableError,
    isLoadingAllGroupsInTable,
    refetchAllGroupsInTable,

    //fetch group
    fetchedGroup,
    isLoadingFetchedGroup,
    isFetchedGroupError,
    fetchedGroupError,

    //update group
    isUpdatingGroup,
    updateGroupMutate,
    isUpdateGroupError,
    updateGroupError,
    isUpdateGroupSuccess,

    //add members to group
    isInviteMembers,
    inviteMembersMutate,
    isInviteMembersError,
    inviteMembersError,

    //delete member from group
    isDeleteMember,
    deleteMemberMutate,
    isDeleteMemberError,
    deleteMemberError,

    //update member role
    isUpdatingMemberRole,
    updateMemberRoleMutate,
    isUpdateMemberRoleError,
    updateMemberRoleError,
    isUpdateMemberRoleSuccess,
  };
}
