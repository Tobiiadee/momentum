import { searchUsers } from "@/modules/supabase/utils/actions";
import { useQuery } from "@tanstack/react-query";

export default function useSearchUsers(user_id: string, email: string) {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["searchUsers", email],
    queryFn: async () => {
      if (!user_id) throw new Error("User ID is required");
      return searchUsers(email);
    },
    enabled: !!user_id && !!email, // Run the query only if user_id is defined
  });

  return {
    isLoading,
    isError,
    error,
    data,
  };
}
