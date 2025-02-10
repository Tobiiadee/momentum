"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!; // Use your Supabase URL here
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use anon key for client-side access
const supabase = createClient(supabaseUrl, supabaseKey);

export async function deleteOwnAccount(user_id: string) {
  // const { data: { user }, error: userError } = await supabase.auth.getUser();

  // if (userError) {
  //     throw new Error('Error fetching user: ' + userError.message);
  // }

  // if (!user) {
  //     throw new Error('User is not authenticated. Please log in to delete your account.');
  // }

  // Call your server-side function to delete the user
  const { error } = await supabase.rpc("delete_user_account", {
    user_id: user_id,
  });

  if (error) {
    console.error("Error deleting account:", error);
    throw error; // Rethrow the error for further handling
  } else {
    console.log("Account deleted successfully.");
    return true; // Return true to indicate success
  }
}
