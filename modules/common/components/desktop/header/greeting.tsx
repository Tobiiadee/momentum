import { Text } from "@/modules/common/ui/text";
import React from "react";

export default function Greeting() {
  return (
    <div>
      <Text variant={"h3"}>Good Afternoon, Tobi Ade 👏</Text>
      <Text variant={"h4"} className="text-foreground/60">Today, Tue 26 November, 2024</Text>
    </div>
  );
}
