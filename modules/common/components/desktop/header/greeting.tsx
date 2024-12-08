import { getFormattedDate, getGreeting } from "@/lib/helpers/format";
import { Text } from "@/modules/common/ui/text";
import React from "react";

export default function Greeting() {
  return (
    <div>
      <Text variant={"h3"}>{getGreeting()}, Tobi Ade 👏</Text>
      <Text variant={"h4"} className='text-foreground/60'>
        Today {getFormattedDate()}
      </Text>
    </div>
  );
}
