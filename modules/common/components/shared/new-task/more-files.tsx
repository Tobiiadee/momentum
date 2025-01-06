"use client";

import useNewTaskStore from "@/modules/store/new-task.store";
import { ChevronLeft, ChevronRight, PlusIcon } from "lucide-react";
import React from "react";
import FileItem from "./file-item";
import { v4 as uuidv4 } from "uuid";
import useCustomScroll from "@/hooks/use-custom-scroll";
import { Button } from "@/modules/common/ui/button";

export default function MoreFiles() {
  const taskFile = useNewTaskStore((state) => state.taskFile);
  const { showLeft, showRight, scrollLeft, scrollRight, scrollRef } =
    useCustomScroll();

  return (
    <div className='relative w-full h-max'>
      {showLeft && (
        <div className='absolute -left-5 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-8 aspect-square shadow-md bg-background rounded-full overflow-hidden'>
          <Button
            type='button'
            onClick={scrollLeft}
            variant={"ghost"}
            className=''>
            <ChevronLeft strokeWidth={1.5} size={20} />
          </Button>
        </div>
      )}
      
      <div
        id='hide-scrollbar'
        ref={scrollRef}
        className='flex items-center space-x-2 w-full overflow-y-auto pt-4'>
        {taskFile?.map((file, index) => (
          <FileItem {...file} key={index} />
        ))}
      </div>

      {showRight && (
        <div className='absolute -right-6 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-8 aspect-square shadow-md bg-background rounded-full overflow-hidden'>
          <Button
            type='button'
            onClick={scrollRight}
            variant={"ghost"}
            className=''>
            <ChevronRight strokeWidth={1.5} size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}

export function AddFileButton() {
  const setTaskFile = useNewTaskStore((state) => state.setTaskFile);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: Validate file type or size
    // if (!["image/png", "image/jpeg"].includes(file.type)) {
    //   alert("Please upload a valid image file (PNG or JPEG).");
    //   return;
    // }

    const file_id = uuidv4();

    setTaskFile({ id: file_id, file });
  };

  return (
    <div className='h-full'>
      <label htmlFor='task-file' className='flex items-center justify-end'>
        <div className='border rounded border-transparent group'>
          <PlusIcon
            size={24}
            strokeWidth={0.7}
            className='text-foreground/40 group-hover:text-foreground transition-all cursor-pointer'
          />
          <span className='sr-only'>Upload a file</span>
        </div>
      </label>
      <input
        id='task-file'
        type='file'
        title='Upload a file'
        className='hidden'
        onChange={handleFileChange}
        accept='.pdf,.csv,.docx,.xlsx,.txt' // Optional: Restrict file types
      />
    </div>
  );
}
