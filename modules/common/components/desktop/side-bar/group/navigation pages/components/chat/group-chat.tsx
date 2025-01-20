"use client";

import React from "react";
import { Variants, motion } from "framer-motion";
import useGroupStore from "@/modules/store/group-store";
import Modal from "@/modules/common/ui/modal";

import GroupChatHeader from "./group-chat-header";
import GroupChatInput from "./group-chat-input";
import ChatMessage from "./chat-message";

const GroupChatVariants: Variants = {
  visible: {
    opacity: 1,
    maxHeight: 480,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
  hidden: {
    opacity: 0,
    maxHeight: 0,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },

  exix: {
    opacity: 0,
    maxHeight: 0,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
};

interface GroupChatProps {
  group_members: AddMemberType[];
  //   isLoadingGroupDetails: boolean;
  group_title: string;
}

export default function GroupChat({
  group_title,
  group_members,
}: GroupChatProps) {
  // const isGroupChat = useGroupStore((state) => state.isGroupChat);
  const setIsGroupChat = useGroupStore((state) => state.setIsGroupChat);

  return (
    <Modal onClick={() => setIsGroupChat(false)} className='bg-foreground/10'>
      <motion.div
        variants={GroupChatVariants}
        layout
        initial='hidden'
        animate='visible'
        exit='hidden'
        className='absolute z-50 bottom-[2rem] right-20 bg-background rounded-t-lg w-[25rem] h-[30rem] py-2 shadow-lg flex flex-col space-y-2'>
        <GroupChatHeader
          group_members={group_members}
          group_title={group_title}
        />
        <ChatMessage />
        <GroupChatInput />
      </motion.div>
    </Modal>
  );
}
