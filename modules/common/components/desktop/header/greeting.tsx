import { useAuth } from "@/hooks/use-auth";
import { getFormattedDate, getGreeting } from "@/lib/helpers/format";
import { getUser } from "@/lib/helpers/helpers";
import { Text } from "@/modules/common/ui/text";
import { supabase } from "@/modules/supabase/supabase";
import React from "react";

export default async function Greeting() {
  return (
    <div>
      <Text variant={"h3"}>
        <span className='text-foreground/60'>{getGreeting()}, </span>
        {getUser() || "User"} 👏
      </Text>
      <Text variant={"h4"} className='text-foreground/60'>
        Today {getFormattedDate()}
      </Text>
    </div>
  );
}
