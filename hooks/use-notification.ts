/*eslint-disable @typescript-eslint/no-explicit-any*/

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Use the public anon key here
);

const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    if (!userId) return; // Ensure userId is provided

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notification_table")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error.message);
      } else {
        setNotifications(data || []);
      }
    };

    fetchNotifications();

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
  }, [userId]);

  return notifications;
};

export default useNotifications;
