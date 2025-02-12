import {
  createList,
  deleteList,
  fetchLists,
} from "@/modules/supabase/utils/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useListAction(userId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch all lists
  const {
    isLoading: isLoadingAllLists,
    isError: isAllListsError,
    data: allLists,
    error: allListsError,
    refetch: refetchAllLists,
  } = useQuery({
    queryKey: ["all-list", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      return fetchLists(userId);
    },
    enabled: !!userId,
  });

  // Add a list
  const {
    isPending: isAddingList,
    mutate: addListMutate,
    isError: isAddListError,
    error: addListError,
  } = useMutation({
    mutationFn: (list: ListType) => createList(userId, list),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-list", userId] });

      router.push("/dashboard/all-list-group");
    },
  });

  // Delete a list
  const {
    isPending: isDeletingList,
    mutate: deleteListMutate,
    isError: isDeleteListError,
    error: deleteListError,
  } = useMutation({
    mutationFn: (list_id: string) => deleteList(list_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-list", userId] });
    },
  });

  return {
    // Lists
    allLists,
    isLoadingAllLists,
    isAllListsError,
    allListsError,
    refetchAllLists,

    // Add list
    isAddingList,
    addListMutate,
    isAddListError,
    addListError,

    // Delete list
    isDeletingList,
    deleteListMutate,
    isDeleteListError,
    deleteListError,
  };
}
