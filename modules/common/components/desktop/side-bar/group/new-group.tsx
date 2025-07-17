/*eslint-disable @typescript-eslint/no-explicit-any*/

"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Input } from "@/modules/common/ui/input";
import { Button } from "@/modules/common/ui/button";
import { X } from "lucide-react";
import { useGroupStore } from "@/modules/store/group-store";
import { Text } from "@/modules/common/ui/text";
import AddMember from "./add-member";
import { v4 as uuidv4 } from "uuid";
import useUserStore from "@/modules/store/user-store";
import useGroupAction from "@/hooks/use-group-action";
import { toast } from "sonner";
import { sendInvite } from "@/lib/utils/invite-response";
import ErrorTemp from "../../../shared/error-temp";

export const FadeInOutVariants: Variants = {
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
    allGroupsInTable,
  } = useGroupAction(user?.id as string);

  // Filter groups where the user is a member
  const userGroups = allGroupsInTable?.filter((group) =>
    group.members.some((member) => member.member_id === user?.id)
  );

  const setIsGroup = useGroupStore((state) => state.setIsGroup);
  const isGroup = useGroupStore((state) => state.isGroup);
  const setIsGroupMember = useGroupStore((state) => state.setIsGroupMember);
  const setIsGroupName = useGroupStore((state) => state.setIsGroupName);
  const isGroupName = useGroupStore((state) => state.isGroupName);
  const isGroupMember = useGroupStore((state) => state.isGroupMember);
  const members = useGroupStore((state) => state.members);
  const reset = useGroupStore((state) => state.reset);

  useEffect(() => {
    if (isGroup === true && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGroup]);

  //check if group name is already exist
  const isGroupNameExist = userGroups?.some(
    (group) => group.label.toLowerCase() === groupName.toLowerCase()
  );

  const groupNameHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isGroupNameExist) return;
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
  ];

  const groupHandler = async () => {
    const group_id = uuidv4();
    
    const group: GroupType = {
      list_id: group_id,
      label: groupName.trim(),
      members: allMembers,
      creator_id: user?.id as string,
      type: "group",
    };

    if (!!groupName) {
      addGroupMutate(group);
      reset();

      const receiverIds = membersId.map((member) => member.member_id);

      try {
        const sendInviteRes = await sendInvite(
          group_id,
          user?.id as string,
          receiverIds
        );

        if (sendInviteRes.status === "success") {
          toast.success("Invite sent successfully");
        }
      } catch (error: any) {
        toast.error(error.message);
      }
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
    <div className="fixed top-1/3 -translate-y-1/3  left-1/2 -translate-x-1/2 w-max h-max flex items-center justify-center z-50">
      <motion.div
        initial="hidden"
        animate="visible"
        exit={"exit"}
        variants={FadeInOutVariants}
        className="h-max max-h-72 w-[20rem] md:w-[24rem] flex flex-col space-y-4 justify-between shadow-lg bg-background rounded-md px-3 py-2"
      >
        <div className="flex flex-col space-y-2 overflow-hidden p-0.5">
          {isGroupName && (
            <motion.div
              variants={SlideInNameVariants}
              initial="hidden"
              animate="visible"
              className=""
            >
              <Text variant={"p"} className="text-foreground/60 capitalize">
                {isGroupName}
              </Text>
            </motion.div>
          )}

          {!isGroupMember ? (
            <form
              onSubmit={groupNameHandler}
              className="w-full flex flex-col space-y-2"
            >
              <div className="flex flex-col items-center space-y-1">
                <Input
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                  ref={inputRef}
                  value={groupName}
                  placeholder="Choose a group name..."
                  className="placeholder:text-xs"
                />
                {isGroupNameExist && (
                  <ErrorTemp error="Group name already exists" />
                )}
              </div>
            </form>
          ) : (
            <AnimatePresence mode="wait">
              <AddMember />
            </AnimatePresence>
          )}
        </div>

        <Button
          isLoading={isAddingGroup}
          onClick={groupHandler}
          variant={"ghost"}
          disabled={!isValid}
          className="full self-center w-full flex rounded-md space-x-4 bg-secondary hover:bg-secondary-hover transition-all duration-300"
        >
          Create Group
        </Button>

        <div className="hidden absolute -top-[2rem] -right-5 w-8 aspect-square shadow-md bg-background md:flex justify-center items-center rounded-full overflow-hidden">
          <Button
            onClick={() => {
              setIsGroup(false);
              reset();
            }}
            variant={"ghost"}
            className=""
          >
            <X strokeWidth={1.5} size={20} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
