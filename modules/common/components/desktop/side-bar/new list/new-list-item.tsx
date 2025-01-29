"use client";

import { Text } from "@/modules/common/ui/text";
import React, { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/modules/common/ui/button";
import { Loader, X } from "lucide-react";
// import useAllListStore from "@/modules/store/all-list-store";
import TaskNumber from "../../../task/task-number";
import Image from "next/image";
import useListStore from "@/modules/store/list-store";
import useSidebarStore from "@/modules/store/sidebar-store";

const listItemVariants: Variants = {
  hidden: { x: 70, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: { x: -70, opacity: 0 },
};

export const deleteListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: { duration: 0.5 },
  },
};

interface NewListItemProps {
  id: string;
  name: string;
  svgImage: string;
  numberOfTask: number;
  isRemoving: boolean;
}

export default function NewListItem({
  id,
  name,
  svgImage,
  numberOfTask,
  isRemoving,
}: NewListItemProps) {
  const [deleteList, setDeletelist] = useState(false);

  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);

  // const removeFromList = useAllListStore((state) => state.removeFromList);
  const pathName = usePathname();
  const router = useRouter();
  const setIsDeleteList = useListStore((state) => state.setIsDeleteList);
  const setDeleteObject = useListStore((state) => state.setDeleteObject);

  const isActive = pathName === `/dashboard/list/${name.toLowerCase()}`;

  const handleDeleteList = () => {
    setIsDeleteList(true);
    setDeleteObject({ list_Id: id, list_label: name });
  };

  // console.log(id);

  return (
    <motion.div
      onMouseEnter={() => setDeletelist(true)}
      onMouseLeave={() => setDeletelist(false)}
      variants={listItemVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='relative'>
      <div
        onClick={() => {
          router.push(`/dashboard/list/${name.toLowerCase()}`);
          setIsSidebarOpen(false);
        }}
        id={id}
        className={cn(
          isActive && "bg-foreground/10",
          "relative w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-foreground/10 active:bg-foreground/20  transition-all duration-300 cursor-pointer overflow-hidden"
        )}>
        <div className='flex space-x-2 items-center'>
          <div className='w-6 relative aspect-square grid place-items-center'>
            <Image
              src={svgImage}
              alt={`${name} icon`}
              fill
              priority
              className='object-cover'
            />
          </div>
          <Text variant={"p"} className='font-semibold capitalize'>
            {name}
          </Text>
        </div>

        <TaskNumber numberOfTask={numberOfTask} />

        {isRemoving && (
          <div className='absolute top-0 left-0 bg-foreground/10 backdrop-blur-md w-full h-full z-10 flex items-center justify-end px-4 rounde-md'>
            <Loader
              size={20}
              strokeWidth={1.5}
              className='animate-spin text-foreground/20'
            />
          </div>
        )}
      </div>

      <AnimatePresence mode='wait'>
        {deleteList && (
          <motion.div
            variants={deleteListVariants}
            initial='hidden'
            animate='visible'
            exit={"hidden"}
            className='absolute left-1/2 -top-6 -translate-x-1/2  w-8 aspect-square shadow-md bg-background flex justify-center items-center rounded-full overflow-hidden'>
            <Button onClick={handleDeleteList} variant={"ghost"} className=''>
              <X strokeWidth={1.5} size={20} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
