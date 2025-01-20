"use client";

import Image from "next/image";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/ui/tooltip";
import { truncateFileName } from "@/lib/helpers/helpers";
import { Download } from "lucide-react";
import { ImageItem, VideoItem } from "./file-item";
import { cn } from "@/lib/utils";

export default function TaskFileItem({ file_name, file_url }: TaskFileType) {
  // console.log(file?.type);

  const lowerCaseFileName = file_name.toLowerCase();

  // Determine the file type icon based on file name
  const getFileIcon = () => {
    if (
      lowerCaseFileName.endsWith(".png") ||
      lowerCaseFileName.endsWith(".jpg") ||
      lowerCaseFileName.endsWith(".jpeg")
    ) {
      return <ImageItem imageSrc={file_url} />;
    }

    if (
      lowerCaseFileName.endsWith(".mp4") ||
      lowerCaseFileName.endsWith(".mov") ||
      lowerCaseFileName.endsWith(".avi")
    ) {
      return <VideoItem videoSrc={file_url} />;
    }

    if (lowerCaseFileName.endsWith(".pdf")) {
      return (
        <Image
          src='/file-preview/pdf.png'
          alt='PDF Icon'
          fill
          className='object-cover'
          priority
        />
      );
    }

    if (lowerCaseFileName.endsWith(".csv")) {
      return (
        <Image
          src='/file-preview/text.png'
          alt='CSV Icon'
          fill
          className='object-cover'
          priority
        />
      );
    }

    if (
      lowerCaseFileName.endsWith(".docx") ||
      lowerCaseFileName.endsWith(".doc")
    ) {
      return (
        <Image
          src='/file-preview/docx.png'
          alt='Word Document Icon'
          fill
          className='object-cover'
          priority
        />
      );
    }

    // Default file icon
    return (
      <Image
        src='/file-preview/file.png'
        alt='Default File Icon'
        fill
        className='object-cover'
        priority
      />
    );
  };

  const isVideo =
    lowerCaseFileName.endsWith(".mp4") ||
    lowerCaseFileName.endsWith(".mov") ||
    lowerCaseFileName.endsWith(".avi");

  const isImage =
    lowerCaseFileName.endsWith(".png") ||
    lowerCaseFileName.endsWith(".jpg") ||
    lowerCaseFileName.endsWith(".jpeg");

  return (
    <div className='relative inline-flex flex-col items-center space-y-1 flex-shrink-0 border p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
      {/* File Icon */}
      <div
        className={cn(
          isVideo || isImage ? "w-full" : "w-[2rem]",
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
                {truncateFileName(file_name, 20)}{" "}
                {/* Adjust truncate length as needed */}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p className='text-xs'>{file_name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* File Actions (Optional) */}
      <div className='absolute right-2 top-1 '>
        <a
          href={file_url}
          target='_blank'
          title='Download File'
          rel='noopener noreferrer'
          className='text-sm text-foreground/30 hover:text-foreground transition-all'>
          <Download strokeWidth={1.5} size={18} />
        </a>
      </div>
    </div>
  );
}
