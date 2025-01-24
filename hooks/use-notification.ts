/*eslint-disable @typescript-eslint/no-explicit-any*/

import { fetchNotifications } from "@/modules/supabase/utils/actions";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Use the public anon key here
);

const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const { data: notificationsData } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotifications(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData);
    }

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
        (payload) => {
          setNotifications((prev: any) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, notificationsData]);

  return notifications;
};

export default useNotifications;
