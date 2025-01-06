"use client";

import useNewTaskStore from "@/modules/store/new-task.store";
import { PlusIcon } from "lucide-react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddFile() {
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
      <label
        htmlFor='task-file'
        className='grid place-items-center w-full h-full border border-dashed border-foreground/30 cursor-pointer hover:border-foreground/50 focus-within:border-foreground/50 transition-colors'>
        <PlusIcon
          size={40}
          strokeWidth={0.7}
          className='text-foreground/30 hover:text-foreground/50 transition-colors'
        />
        <span className='sr-only'>Upload a file</span>
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
