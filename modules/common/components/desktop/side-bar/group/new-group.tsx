"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Input } from "@/modules/common/ui/input";
import { Button } from "@/modules/common/ui/button";
import { Plus, X } from "lucide-react";
import { useGroupStore } from "@/modules/store/group-store";
import { Text } from "@/modules/common/ui/text";
import AddMember from "./add-member";
import { v4 as uuidv4 } from "uuid";
import useUserStore from "@/modules/store/user-store";
import useGroupAction from "@/hooks/use-group-action";
import { toast } from "sonner";

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
  // const [inputError, setInputError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  const {
    addGroupMutate,
    isAddingGroup,
    isAddGroupError,
    addGroupError,
    isAddGroupSuccess,
  } = useGroupAction(user?.id as string);

  const setIsGroup = useGroupStore((state) => state.setIsGroup);
  // const setGroups = useGroupStore((state) => state.setGroups);
  const isGroup = useGroupStore((state) => state.isGroup);
  const setIsGroupMember = useGroupStore((state) => state.setIsGroupMember);
  const setIsGroupName = useGroupStore((state) => state.setIsGroupName);
  const isGroupName = useGroupStore((state) => state.isGroupName);
  const isGroupMember = useGroupStore((state) => state.isGroupMember);
  const members = useGroupStore((state) => state.members);
  // const addToList = useAllListStore((state) => state.addToList);
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

  //get members id
  const membersId = members.map((member) => ({
    member_id: member.id,
    created_at: member.created_at,
    role: "Member" as GroupRoleType,
  }));

  const allMembers = [
    {
      member_id: user?.id as string,
      created_at: new Date().toISOString(),
      role: "Admin" as GroupRoleType,
    },
    ...membersId,
  ];

  const groupHandler = () => {
    const group: GroupType = {
      list_id: uuidv4(),
      label: groupName.trim(),
      members: allMembers,
      creator_id: user?.id as string,
      type: "group",
    };

    if (!!groupName) {
      addGroupMutate(group);
      reset();
    }

    if (isAddGroupError) {
      toast.error(addGroupError?.message);
    }

    if (isAddGroupSuccess) {
      toast.success("Group created successfully");
    }
  };

  const isValid = members.length > 0 && groupName !== "";

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
            className='w-full flex flex-col space-y-2'>
            <div className='flex items-center space-x-1'>
              <Input
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                ref={inputRef}
                value={groupName}
                placeholder='Choose a group name...'
                className='placeholder:text-xs'
              />

              <Button
                type='submit'
                variant={"ghost"}
                size={"sm"}
                disabled={!groupName}
                className=''>
                <Plus strokeWidth={1.5} size={18} />
              </Button>
            </div>

            {/* {inputError && (
              <ErrorTemp
                error={`Spaces are not allowed. Use an "_" instead.`}
                className='text-xs'
              />
            )} */}
          </form>
        ) : (
          <AddMember />
        )}
      </div>

      <Button
        isLoading={isAddingGroup}
        onClick={groupHandler}
        variant={"default"}
        disabled={!isValid}
        className=''>
        Create
      </Button>

      <div className='absolute -top-[1.3rem] -right-4 w-8 aspect-square shadow-md bg-background flex justify-center items-center rounded-full overflow-hidden'>
        <Button
          onClick={() => {
            setIsGroup(false);
            reset();
          }}
          variant={"ghost"}
          className=''>
          <X strokeWidth={1.5} size={20} />
        </Button>
      </div>
    </motion.div>
  );
}
