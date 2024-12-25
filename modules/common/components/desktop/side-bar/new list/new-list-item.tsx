"use client";

import { Text } from "@/modules/common/ui/text";
import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/modules/common/ui/button";
import { X } from "lucide-react";
import useAllListStore from "@/modules/store/all-list-store";
import TaskNumber from "../../../shared/task-number";
import Image from "next/image";

const listItemVariants: Variants = {
  hidden: { x: 70, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: { x: -70, opacity: 0 },
};

const deleteListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: { duration: 0.5 },
  },
};

export default function NewListItem({
  id,
  name,
  svgImage,
  numberOfTask,
}: {
  id: string;
  name: string;
  svgImage: string;
  numberOfTask: number;
}) {
  const [deleteList, setDeletelist] = useState(false);
  const removeFromList = useAllListStore((state) => state.removeFromList);
  const pathName = usePathname();

  const isActive = pathName === `/${name}`;

  const deleteListHandler = () => {
    removeFromList(id);
  };

  return (
    <motion.div
      onMouseEnter={() => setDeletelist(true)}
      onMouseLeave={() => setDeletelist(false)}
      variants={listItemVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='relative'>
      <Link
        href={`/list/${name.toLowerCase()}`}
        id={id}
        className={cn(
          isActive && "bg-foreground/10",
          "w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-foreground/10 active:bg-foreground/20  transition-all duration-300 cursor-pointer"
        )}>
        <div className='flex space-x-4 items-center'>
          <div className='w-8 relative aspect-square grid place-items-center'>
            <Image src={svgImage} alt={`${name} icon`} fill priority className="object-cover" />
          </div>
          <Text variant={"p"} className='font-semibold capitalize'>
            {name}
          </Text>
        </div>

        <TaskNumber numberOfTask={numberOfTask} />
      </Link>

      <AnimatePresence mode='wait'>
        {deleteList && (
          <motion.div
            variants={deleteListVariants}
            initial='hidden'
            animate='visible'
            exit={"hidden"}
            className='absolute left-1/2 -top-6 -translate-x-1/2  w-8 aspect-square shadow-md bg-background flex justify-center items-center rounded-full overflow-hidden'>
            <Button onClick={deleteListHandler} variant={"ghost"} className=''>
              <X strokeWidth={1.5} size={20} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
