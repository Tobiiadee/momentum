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
import { cn } from "@/lib/utils";

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
    if (file.type.startsWith("image/")) {
      return <ImageItem imageSrc={URL.createObjectURL(file)} />;
    }

    if (file.type.startsWith("video/")) {
      return <VideoItem videoSrc={URL.createObjectURL(file)} />;
    }

    switch (file.type) {
      case "application/pdf":
        return (
          <Image
            src='/file-preview/pdf.png'
            alt='PDF Icon'
            fill
            className='object-cover'
            priority
          />
        );
      case "text/csv":
        return (
          <Image
            src='/file-preview/text.png'
            alt='CSV Icon'
            fill
            className='object-cover'
            priority
          />
        );
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return (
          <Image
            src='/file-preview/docx.png'
            alt='Word Document Icon'
            fill
            className='object-cover'
            priority
          />
        );
      default:
        return (
          <Image
            src='/file-preview/file.png'
            alt='Default File Icon'
            fill
            className='object-cover'
            priority
          />
        );
    }
  };

  const isvidoeImage =
    file.type.startsWith("image/") || file.type.startsWith("video/");

  return (
    <div
      onMouseEnter={() => setDeleteFile(true)}
      onMouseLeave={() => setDeleteFile(false)}
      className={cn(
        "relative inline-flex flex-col items-center space-y-1 flex-shrink-0 border p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      )}>
      {/* File Icon */}
      <div
        className={cn(
          isvidoeImage ? "w-full" : "w-[2rem]",
          "relative min-w-[2rem] h-[3rem] p-0"
        )}>
        {getFileIcon()}
      </div>

      {/* File Name */}
      <div>
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
              exit='hidden'
              className='absolute z-40 -top-[1.5rem] -right-3 w-8 aspect-square shadow-md bg-background flex justify-center items-center rounded-full overflow-hidden'>
              <Button onClick={handleDeleteFile} variant='ghost'>
                <X strokeWidth={1.5} size={20} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export function ImageItem({ imageSrc }: { imageSrc: string }) {
  console.log(imageSrc);

  return (
    <div className='relative w-full min-w-[2rem] h-full p-0 '>
      <Image
        src={imageSrc}
        alt='Image Preview'
        fill
        className='object-cover rounded-md'
        priority
      />
    </div>
  );
}

export function VideoItem({ videoSrc }: { videoSrc: string }) {
  return (
    <video
      src={videoSrc}
      controls
      className='w-full h-full object-cover rounded-md'
    />
  );
}
