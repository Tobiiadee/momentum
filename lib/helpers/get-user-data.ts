import { createClient } from "@/modules/supabase/utils/server";


export async function getUserData(): Promise<UserDataType> {
  const supabase = createClient();
  const res = await (await supabase).auth.getUser();
  const { data } = await (await supabase)
    .from("users")
    .select("*")
    .eq("id", res.data.user?.id)
    .single();

  const username =
    data?.username || (res.data.user?.user_metadata.name as string);
  const email = res.data.user?.email as string;
  const avatar =
    data?.avatar ||
    (res.data.user?.user_metadata.avatar_url as string) ||
    (res.data.user?.user_metadata.picture as string);

  const id = res.data.user?.id as string;
  const phone_number = data?.phone_number;
  const full_name = data?.full_name;
  const country = data?.country;
  const city_state = data?.city_state;
  const bio = data?.bio;

  return {
    username,
    email,
    avatar,
    id,
    phone_number,
    full_name,
    country,
    city_state,
    bio,
  };
}
