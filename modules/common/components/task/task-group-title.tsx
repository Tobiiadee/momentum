"use client";

import React from "react";
import { Text } from "../../ui/text";
// import useGroupStore from "@/modules/store/group-store";

interface TaskGroupTitleProps {
  group_title: string;
}

export default function TaskGroupTitle({ group_title }: TaskGroupTitleProps) {
  // const groupTitleMembers = useGroupStore((state) => state.groupTitleMembers);

  return (
    <div className='w-max py-0.5 px-2 bg-foreground/5 rounded'>
      <Text variant={"p"} className='font-semibold text-xs'>
        #{group_title}
      </Text>
    </div>
  );
}
