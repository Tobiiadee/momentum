import {
  createGroup,
  deleteGroup,
  fetchGroups,
} from "@/modules/supabase/utils/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useGroupAction(userId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch all lists
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
      queryClient.invalidateQueries({ queryKey: ["all-group", userId] });

      router.push("/dashboard");
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
      queryClient.invalidateQueries({ queryKey: ["all-group", userId] });
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
  };
}
