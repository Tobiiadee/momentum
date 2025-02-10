"use client";

import { Text } from "@/modules/common/ui/text";
import { fetchUser } from "@/modules/supabase/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { Variants, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import {
  GroupItemImage,
  GroupItemProps,
  GroupRemainingMembers,
} from "../../desktop/side-bar/group/group-item";
import { cn } from "@/lib/utils";

const groupItemVariants: Variants = {
  hidden: { x: 70, opacity: 0 },
  visible: (index: number) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: index * 0.1 },
  }),
  exit: { x: -70, opacity: 0 },
};

export default function UserGroupItem({
  id,
  name,
  members,
  index,
  isAdmin,
}: GroupItemProps) {
  const router = useRouter();

  const sliceMembers = members.slice(0, 3);
  const remaininMembers = members.length - 3;

  // Fetch members by ID
  const { data: memberData } = useQuery({
    queryKey: ["members", id],
    queryFn: async () => {
      const fetchedMembers = await Promise.all(
        sliceMembers.map((memberId) => fetchUser(memberId))
      );
      return fetchedMembers;
    },
  });

  return (
    <motion.div
      onClick={() =>
        router.push(`/dashboard/group/${id}?name=${name.toLowerCase()}`)
      }
      variants={groupItemVariants}
      custom={index}
      initial='hidden'
      animate='visible'
      id={id}
      className='relative min-w-40 flex flex-col space-y-2 cursor-pointer group'>
      <div className='w-full aspect-square rounded bg-foreground/10 group-hover:bg-foreground/15 group-active:scale-95 transition-all duration-300 grid place-content-center'>
        <div className='relative grid grid-cols-4 place-items-center grid-flow-dense'>
          {memberData?.map((member) => (
            <GroupItemImage
              key={member.id}
              alt={member.username + "profile picture"}
              image={member.avatar}
            />
          ))}
          {memberData && memberData?.length > 3 && (
            <GroupRemainingMembers remainingMembers={remaininMembers} />
          )}
        </div>
      </div>

      <div className='flex flex-col'>
        <Text variant={"p"} className='font-medium capitalize'>
          {name}
        </Text>
        <Text variant={"p"} className='text-foreground/60 text-xs'>
          {members.length} {members.length > 1 ? "Persons" : "Person"}
        </Text>
      </div>

      <div
        className={cn(
          isAdmin ? "bg-green-600" : "bg-foreground/60",
          "absolute left-2 w-2 aspect-square rounded-full shadow-md"
        )}></div>
    </motion.div>
  );
}
