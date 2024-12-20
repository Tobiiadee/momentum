import { createClient } from "@/modules/supabase/utils/server";

export async function getUserData() {
  const supabase = createClient();
  const res = await (await supabase).auth.getUser();
  //   console.log(res);

  const name = res.data.user?.user_metadata.name as string;
  const email = res.data.user?.email as string;
  const avatar = res.data.user?.user_metadata.avatar_url as string;
  const picture = res.data.user?.user_metadata.picture as string;
  const id = res.data.user?.id as string;

  return { name, email, avatar, picture, id };
}
