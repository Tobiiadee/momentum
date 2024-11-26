"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/modules/common/ui/accordion";
import { Checkbox } from "../../ui/checkbox";
import { Text } from "../../ui/text";
import { Clock, EllipsisVertical } from "lucide-react";
import { Button } from "../../ui/button";
import { motion, Variants } from "framer-motion";

const accordionVariants: Variants = {
  hidden: { opacity: 0, x: -200 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, type: "tween", delay: index * 0.1 }, // Adjust delay per index
  }),
};

export default function Task() {
  return (
    <Accordion type='single' collapsible>
      <div className='flex flex-col space-y-3'>
        {Array.from({ length: 7 }).map((_, index) => (
          <TaskItem key={index} index={index} />
        ))}
      </div>
    </Accordion>
  );
}

function TaskItem({ index }: { index: number }) {
  return (
    <motion.div
      variants={accordionVariants}
      key={index}
      custom={index}
      initial='hidden'
      animate='visible'>
      <AccordionItem value={`item-${index}`}>
        <AccordionTrigger className='bg-background pl-4 pr-2 py-1 rounded-t-md data-[state=closed]:rounded-b-md'>
          <CollapsibleTrigger />
        </AccordionTrigger>
        <AccordionContent className='px-4 bg-background rounded-b-md'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam harum
          commodi odit, deserunt id quasi pariatur debitis impedit natus sunt
          voluptatibus odio, corrupti porro? Libero est, voluptatibus inventore
          nam quam dolores in ducimus laboriosam tempora repellat eum eius
          itaque dolorem beatae asperiores mollitia quibusdam doloremque optio
          nisi aut! Iure, aperiam?
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}

function CollapsibleTrigger() {
  const itemOptionHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className='w-full flex justify-between items-center'>
      <div className='flex items-center w-1/2 space-x-4 h-max'>
        <Checkbox />
        <Text variant={"p"} className=''>
          Read a book
        </Text>
        <div className='w-5 aspect-square bg-foreground/10 rounded'></div>
      </div>

      <div className='flex space-x-2 items-center'>
        <div className='flex space-x-1 items-center bg-foreground/10 px-2 py-1 rounded-md'>
          <Clock strokeWidth={1.5} size={18} className='text-foreground/60' />
          <Text variant={"p"} className='text-foreground/60 text-xs'>
            6:00 - 7:00
          </Text>
        </div>

        <Button
          onClick={itemOptionHandler}
          variant={"ghost"}
          size={"sm"}
          className='text-foreground/70 bg-foreground/10 hover:bg-foreground/15 active:bg-foreground/20 py-1 px-2'>
          <EllipsisVertical strokeWidth={1.5} size={18} />
        </Button>
      </div>
    </div>
  );
}
