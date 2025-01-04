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


export default function TaskFileItem({ file_name, file_url }: TaskFileType) {
  // Determine the file type icon
  const getFileIcon = () => {
    const extension = file_name.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return (
          <Image
            src='/file-preview/pdf.png'
            alt='PDF Icon'
            fill
            className='object-cover'
            priority
          />
        );
      case "csv":
        return (
          <Image
            src='/file-preview/text.png'
            alt='CSV Icon'
            fill
            className='object-cover'
            priority
          />
        );
      case "docx":
      case "doc":
        return (
          <Image
            src='/file-preview/docx.png'
            alt='Word Icon'
            fill
            className='object-cover'
            priority
          />
        );
      default:
        return (
          <Image
            src='/file-preview/text.png'
            alt='Default Icon'
            fill
            className='object-cover'
            priority
          />
        );
    }
  };

  return (
    <div className='relative inline-flex flex-col items-center space-y-1 flex-shrink-0 border p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
      {/* File Icon */}
      <div className='relative w-[2rem] min-w-[2rem] h-[3rem] p-0'>
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
          rel='noopener noreferrer'
          className='text-sm text-foreground/30 hover:text-foreground transition-all'>
          <Download strokeWidth={1.5} size={18} />
        </a>
      </div>
    </div>
  );
}
