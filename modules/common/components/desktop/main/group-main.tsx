"use client";

import React from "react";
import { Text } from "@/modules/common/ui/text";
import GroupNav from "../side-bar/group/group-nav";
import { useParams } from "next/navigation";

export default function GroupMain() {
  const { groupId } = useParams();

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col space-y-4'>
        <Text variant={"h4"} className='capitalize'>
          {encodeURIComponent(groupId as string)}
        </Text>
        <GroupNav />
      </div>
    </div>
  );
}
