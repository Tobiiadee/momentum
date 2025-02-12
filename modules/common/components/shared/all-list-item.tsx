"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Text } from "../../ui/text";
import TaskNumber from "../task/task-number";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import useListStore from "@/modules/store/list-store";
import { deleteListVariants } from "../desktop/side-bar/new list/new-list-item";

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, type: "tween", delay: index * 0.08 }, // Adjust delay per index
  }),
  exit: { opacity: 0, x: -100 },
};

interface AllListItemProps {
  id: string;
  name: string;
  svgImage: string;
  numberOfTask: number;
  index: number;
}

export function AllListItem({
  id,
  name,
  svgImage,
  numberOfTask,
  index,
}: AllListItemProps) {
  const [deleteList, setDeletelist] = useState(false);
  const router = useRouter();
  const setIsDeleteList = useListStore((state) => state.setIsDeleteList);
  const setDeleteObject = useListStore((state) => state.setDeleteObject);

  const handleDeleteList = () => {
    setIsDeleteList(true);
    setDeleteObject({ list_Id: id, list_label: name });
  };

  return (
    <motion.div
      onMouseEnter={() => setDeletelist(true)}
      onMouseLeave={() => setDeletelist(false)}
      variants={listItemVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      custom={index}
      className='relative bg-background rounded-md shadow-sm'>
      <div
        onClick={() => router.push(`/dashboard/list/${id}?label=${name}`)}
        id={id}
        className={cn(
          "relative w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-foreground/10 active:bg-foreground/20  transition-all duration-300 cursor-pointer overflow-hidden"
        )}>
        <div className='flex space-x-2 items-center'>
          <div className='w-6 relative aspect-square grid place-items-center rounded overflow-hidden'>
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
      </div>

      <AnimatePresence mode='wait'>
        {deleteList && (
          <motion.div
            variants={deleteListVariants}
            initial='hidden'
            animate='visible'
            exit={"hidden"}
            className='absolute -right-3 -top-6   w-8 aspect-square shadow-md bg-background flex justify-center items-center rounded-full overflow-hidden'>
            <Button onClick={handleDeleteList} variant={"ghost"} className=''>
              <X strokeWidth={1.5} size={20} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
