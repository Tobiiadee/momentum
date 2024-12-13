"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Input } from "@/modules/common/ui/input";
import { Button } from "@/modules/common/ui/button";
import { ArrowUpFromLine, X } from "lucide-react";
import { useGroupStore } from "@/modules/store/group-store";
import { Text } from "@/modules/common/ui/text";
import AddMember from "./add-member";
import useAllListStore from "@/modules/store/all-list-store";

export const FadeInOutvariants: Variants = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: -10,
    opacity: 1,
    transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
  },
  exit: { y: 70, opacity: 0 },
};

export const SlideInNameVariants: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function NewGroup() {
  const [groupName, setGroupName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const setIsGroup = useGroupStore((state) => state.setIsGroup);
  const setGroups = useGroupStore((state) => state.setGroups);
  const isGroup = useGroupStore((state) => state.isGroup);
  const setIsGroupMember = useGroupStore((state) => state.setIsGroupMember);
  const setIsGroupName = useGroupStore((state) => state.setIsGroupName);
  const isGroupName = useGroupStore((state) => state.isGroupName);
  const isGroupMember = useGroupStore((state) => state.isGroupMember);
  const members = useGroupStore((state) => state.members);
  const addToList = useAllListStore((state) => state.addToList);
  const reset = useGroupStore((state) => state.reset);

  useEffect(() => {
    if (isGroup === true && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGroup]);

  const groupNameHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGroupName(groupName.trim());
    setIsGroupMember(true);
    setIsGroupName(groupName);
  };

  const groupHandler = () => {
    const group: GroupType = {
      id: crypto.randomUUID(),
      label: groupName.trim(),
      members: members,
      numberOfTask: 0,
      default: false,
    };

    if (!!groupName) {
      setGroups(group);
      addToList(group);
      reset();
    }
  };

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit={"exit"}
      variants={FadeInOutvariants}
      className='absolute top-1/3 -translate-y-1/3 left-[22rem] z-50 w-[22rem] h-max min-h-72 max-h-72 flex flex-col justify-between shadow-lg bg-background rounded-md px-3 py-2'>
      <div className='flex flex-col space-y-2 overflow-hidden p-0.5'>
        {isGroupName && (
          <motion.div
            variants={SlideInNameVariants}
            initial='hidden'
            animate='visible'
            className=''>
            <Text variant={"p"} className='text-foreground/60 capitalize'>
              {isGroupName}
            </Text>
          </motion.div>
        )}

        {!isGroupMember ? (
          <form
            onSubmit={groupNameHandler}
            className='w-full flex items-center space-x-1'>
            <Input
              onChange={(e) => setGroupName(e.target.value)}
              ref={inputRef}
              value={groupName}
              placeholder='Choose a group name...'
              className='placeholder:text-xs'
            />

            <Button type='submit' variant={"ghost"} disabled={!groupName} className=''>
              <ArrowUpFromLine strokeWidth={1.5} size={18} />
            </Button>
          </form>
        ) : (
          <AddMember />
        )}
      </div>

      <Button onClick={groupHandler} variant={"default"} className=''>
        Add
      </Button>

      <div className='absolute -top-[1.3rem] -right-4 w-8 aspect-square shadow-md bg-background flex justify-center items-center rounded-full overflow-hidden'>
        <Button
          onClick={() => setIsGroup(false)}
          variant={"ghost"}
          className=''>
          <X strokeWidth={1.5} size={20} />
        </Button>
      </div>
    </motion.div>
  );
}
