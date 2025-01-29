/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchNotifications } from "@/modules/supabase/utils/actions";
import { createClient } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Use the public anon key here
);

const useNotifications = (userId: string) => {
  const queryClient = useQueryClient();

  // Fetch initial notifications with React Query
  const {
    data: notifications,
    isFetching,
    error,
  } = useQuery<NotificationType[]>({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotifications(userId),
    enabled: !!userId, // Only fetch if userId is available
  });

  useEffect(() => {
    if (!userId) return;

    // Set up real-time subscription using Supabase channel
    const channel = supabase
      .channel(`notifications:user_${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notification_table",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          // Invalidate the query to refetch notifications
          queryClient.invalidateQueries({
            queryKey: ["notifications", userId],
          });
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);

  return { notifications, isFetching, error };
};

export default useNotifications;
