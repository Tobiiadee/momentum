"use client";

import { Text } from "@/modules/common/ui/text";
import { useParams } from "next/navigation";
import React from "react";

export default function GroupMain() {
  const params = useParams();

  return (
    <div>
      <Text variant={"h3"}>Hello {params.groupId}</Text>
    </div>
  );
}
