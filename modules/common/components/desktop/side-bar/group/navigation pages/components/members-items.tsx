/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Text } from "@/modules/common/ui/text";
import React from "react";
// import useUserStore from "@/modules/store/user-store";
import { useParams } from "next/navigation";
import MembersItem from "./member-item";
import ExitGroupBtn from "./exit-group-btn";
// import DeleteGroupBtn from "./delete-group-btn";
import { useQuery } from "@tanstack/react-query";
import {
  fetchGroup,
  fetchMembersOfAGroup,
} from "@/modules/supabase/utils/actions";
import { Skeleton } from "@/modules/common/ui/skeleton";

export default function MembersItems() {
  const { groupId } = useParams();

  const { data: group } = useQuery({
    queryKey: ["group", groupId],
    queryFn: async () => fetchGroup(groupId as string),
  });

  //Fetch members
  const { data: members, isLoading } = useQuery({
    queryKey: ["members", groupId],
    queryFn: async () => fetchMembersOfAGroup(groupId as string),
  });

  // const user = useUserStore((state) => state.user);

  // const permission = members?.some(
  //   (member) => member.member_id === group?.creator_id || member.role === "Admin"
  // );

  // console.log(group);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-end">
        <div className="flex space-x-4 items-center">
          <ExitGroupBtn group_id={groupId as string} />
          {/* {permission && (
            <DeleteGroupBtn
              creator_id={group?.creator_id as string}
              group_id={groupId as string}
            />
          )} */}
        </div>
      </div>
      <div className="w-full flex flex-col bg-foreground/10 p-4">
        <div className="grid grid-cols-5 gap-4">
          <Text variant={"p"} className="col-span-2 font-semibold">
            Name
          </Text>
          <Text variant={"p"} className="font-semibold hidden md:block">
            Date Added
          </Text>
          <Text
            variant={"p"}
            className="uppercase col-span-2 font-semibold"
          ></Text>
        </div>
        <div className="divide-y divide-foreground/10 flex flex-col space-y-4">
          {isLoading && <MembersItemSkeleton />}

          {members?.map((member, index) => (
            <MembersItem
              key={member.member_id + index}
              creator_id={group?.creator_id as string}
              group_id={groupId as string}
              created_at={member.created_at}
              {...member}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MembersItemSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
    </div>
  );
}
