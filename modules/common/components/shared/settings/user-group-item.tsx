"use client";

import { Text } from "@/modules/common/ui/text";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface GroupItemProps {
  id: string;
  name: string;
  members: MemberType[];
}

const groupItemVariants: Variants = {
  hidden: { x: 70, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: { x: -70, opacity: 0 },
};


export default function UserGroupItem({ id, name, members }: GroupItemProps) {
  const router = useRouter();

  const sliceMembers = members.slice(0, 3);
  const remaininMembers = members.length - 3;

  return (
    <motion.div
      onClick={() => router.push(`/dashboard/group/${name.toLowerCase()}`)}
      variants={groupItemVariants}
      initial='hidden'
      animate='visible'
      id={id}
      className='relative min-w-40 flex flex-col space-y-2 cursor-pointer group'>
      <div className='w-full aspect-square rounded bg-foreground/10 group-hover:bg-foreground/15 group-active:scale-95 transition-all duration-300 grid place-content-center'>
        <div className='relative grid grid-cols-4 place-items-center grid-flow-dense'>
          {sliceMembers.map((member) => (
            <GroupItemImage key={member.id} image={member.image} />
          ))}
          {members.length > 3 && (
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
    </motion.div>
  );
}

export function GroupItemImage({ image }: { image: string }) {
  return (
    <div className='w-8 z-0 relative aspect-square -ml-2 rounded-full bg-yellow-300 border-2 border-background'>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 aspect-square rounded-full flex items-center justify-center overflow-hidden'>
        <Image
          src={`/images/${image}`}
          alt='profile'
          fill
          className='object-cover'
        />
      </div>
    </div>
  );
}

export function GroupRemainingMembers({
  remainingMembers: remainingMembers,
}: {
  remainingMembers: number;
}) {
  return (
    <div className='w-8 z-10 aspect-square rounded-full border border-foreground/30 bg-background grid place-items-center -ml-2'>
      <Text variant={"p"} className='font-semibold'>
        {"+" + remainingMembers}
      </Text>
    </div>
  );
}
