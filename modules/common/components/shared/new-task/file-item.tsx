"use client";

import Image from "next/image";
import React from "react";

import { deleteListVariants } from "../../desktop/side-bar/new list/new-list-item";
import { AnimatePresence, motion } from "framer-motion";

import { X } from "lucide-react";
import { Button } from "@/modules/common/ui/button";
import useNewTaskStore, { TaskFileType } from "@/modules/store/new-task.store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/ui/tooltip";
import { truncateFileName } from "@/lib/helpers/helpers";

interface FileItemProps extends TaskFileType {
  inTask?: boolean;
}

export default function FileItem({
  file,
  id: file_id,
  inTask = false,
}: FileItemProps) {
  const [deleteFile, setDeleteFile] = React.useState(false);
  const deleteTaskFile = useNewTaskStore((state) => state.deleteTaskFile);

  const handleDeleteFile = () => {
    deleteTaskFile(file_id);
  };

  // Determine the file type icon
  const getFileIcon = () => {
    switch (file.type) {
      case "application/pdf":
        return (
          <Image
            src='/file-preview/pdf.png'
            alt='Example Icon'
            fill
            className='object-cover '
            priority
          />
        );
      case "text/csv":
        return (
          <Image
            src='/file-preview/text.png'
            alt='Example Icon'
            fill
            className='object-cover'
            priority
          />
        );
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return (
          <Image
            src='/file-preview/docx.png'
            alt='Example Icon'
            fill
            className='object-cover'
            priority
          />
        );
      default:
        return (
          <Image
            src='/file-preview/text.png'
            alt='Example Icon'
            fill
            className='object-cover'
            priority
          />
        );
    }
  };

  return (
    <div
      onMouseEnter={() => setDeleteFile(true)}
      onMouseLeave={() => setDeleteFile(false)}
      className='relative inline-flex flex-col items-center space-y-1 flex-shrink-0 border p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
      {/* File Icon */}
      <div className='relative w-[2rem] min-w-[2rem] h-[3rem] p-0'>
        {getFileIcon()}
      </div>

      {/* File Name */}
      <div className=''>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className='text-xs font-medium text-foreground'>
                {truncateFileName(file.name)}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p className='text-xs'>{file.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {!inTask && (
        <AnimatePresence mode='wait'>
          {deleteFile && (
            <motion.div
              variants={deleteListVariants}
              initial='hidden'
              animate='visible'
              exit={"hidden"}
              className='absolute z-40 -top-[1.5rem] -right-3 w-8 aspect-square shadow-md bg-background flex justify-center items-center rounded-full overflow-hidden'>
              <Button onClick={handleDeleteFile} variant={"ghost"} className=''>
                <X strokeWidth={1.5} size={20} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
