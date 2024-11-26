"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { useGroupStore } from "@/modules/store/group-store";
import { Variants, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect } from "react";

const NewTaskVariant: Variants = {
  hidden: { y: 200, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function CreateNewTask() {
  const setIsGroup = useGroupStore((state) => state.setIsGroup);

  const handleKeyEvent = (e: KeyboardEvent) => {
    if (e.altKey && e.key === "n") {
      e.preventDefault();
      setIsGroup(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  });

  return (
    <motion.div
      variants={NewTaskVariant}
      initial='hidden'
      animate='visible'
      className='absolute left-1/2 -translate-x-1/2 bottom-6  w-[30%] h-11 z-40'>
      <Button
        onClick={() => setIsGroup(true)}
        variant={"ghost"}
        className='w-full h-full flex justify-between rounded-3xl space-x-4 bg-foreground text-background hover:text-background hover:bg-foreground/95 active:bg-foreground/90 transition-all duration-300'>
        <div className='flex items-center space-x-2 '>
          <Plus strokeWidth={2} size={20} />
          <Text variant={"p"} className='font-medium'>
            Create new task
          </Text>
        </div>

        <div className='flex items-center space-x-2 px-1.5 py-0.5 rounded-xl bg-background'>
          <Text variant={"p"} className='text-xs text-foreground font-medium'>
            alt + N
          </Text>
        </div>
      </Button>
    </motion.div>
  );
}
