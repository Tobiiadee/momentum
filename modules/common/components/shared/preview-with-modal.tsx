import React from "react";
import Modal from "../../ui/modal";
import { motion } from "framer-motion";
import { previewVariant } from "./new-task/preview-task";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "../../ui/button";
import { Text } from "../../ui/text";

interface PreviewWithModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  width?: string;
  background?: string;
  title: string;
  ariaLabel: string;
  className?: string;
  position?: string;
  modalBackground?: string;
}

export default function PreviewWithModal({
  closeModal,
  children,
  width = "w-[50vw]",
  background = "bg-background",
  modalBackground = "bg-foreground/30 backdrop-blur-sm",
  title,
  ariaLabel,
  position = "left-1/3 -translate-x-1/3 top-[5rem]",
  className,
}: PreviewWithModalProps) {
  return (
    <Modal onClick={closeModal} className={cn(modalBackground)}>
      <div className='fixed top-1/3 -translate-y-1/3 left-1/2 -translate-x-1/2 w-max h-max flex items-center justify-center z-50'>
        <motion.div
          variants={previewVariant}
          initial='hidden'
          animate='visible'
          exit={"exit"}
          className={cn(
            width,
            background,
            className,
            position,
            "flex flex-col space-y-4 shadow-md absolute z-50 h-max pt-0 pb-5 rounded-lg"
          )}>
          <div className='w-full flex justify-between items-center border-b py-1 pr-2 pl-4'>
            <Text variant={"p"} className='font-semibold capitalize'>
              {title}
            </Text>
            <Button
              onClick={closeModal}
              variant={"ghost"}
              aria-label={ariaLabel}
              size={"sm"}
              className='rounded-full group px-[7px]'>
              <X
                strokeWidth={2}
                size={24}
                className='text-foreground/60 group-hover:text-foreground'
              />
            </Button>
          </div>
          <div className='px-4'>{children}</div>
        </motion.div>
      </div>
    </Modal>
  );
}
