"use client";

import { Text } from "@/modules/common/ui/text";
import React from "react";
import GroupItem from "./group-item";
// import CreateNewGroup from "./create-new-group";
import { useGroupStore } from "@/modules/store/group-store";

export default function Group() {
  const groups = useGroupStore((state) => state.groups);

  return (
    <>
      {groups && groups?.length > 0 && (
        <div className='flex flex-col space-y-4 w-full'>
          <Text variant={"h3"} className=''>
            Group
          </Text>
          <div className='grid grid-cols-2 gap-2 w-full'>
            {groups?.map((group) => (
              <GroupItem
                key={group.list_id}
                id={group.list_id}
                name={group.label}
                members={group.members}
              />
            ))}
          </div>

          {/* <CreateNewGroup /> */}
        </div>
      )}
    </>
  );
}
