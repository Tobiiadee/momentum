import { getFormattedDate, getGreeting } from "@/lib/helpers/format";
import { getUserData } from "@/lib/helpers/get-user-data";
import { Text } from "@/modules/common/ui/text";
import React from "react";

export default async function Greeting() {
  const { username, email } = await getUserData();
  return (
    <div>
      <Text variant={"h3"} className="capitalize font-medium">
        <span className='text-foreground/60 capitalize'>{getGreeting()}, </span>
        {username || email} 👏
      </Text>
      <Text variant={"h4"} className='text-foreground/60'>
        Today {getFormattedDate()}
      </Text>
    </div>
  );
}
