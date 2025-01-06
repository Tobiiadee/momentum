"use client";

import React from "react";
import { Text } from "../../ui/text";
import useGroupStore from "@/modules/store/group-store";

export default function TaskGroupTitle() {
  const groupTitleMembers = useGroupStore((state) => state.groupTitleMembers);

  return (
    <div className='w-max py-0.5 px-2 bg-foreground/5 rounded'>
      <Text variant={"p"} className='font-semibold text-xs'>
        #{groupTitleMembers.group_title}
      </Text>
    </div>
  );
}
