import React from "react";
import { Skeleton } from "../skeleton";

export default function TaskSkeleton() {
  return (
    <div className='flex flex-col space-y-2'>
      <Skeleton className='w-full h-6 rounded-md' />
      <Skeleton className='w-[80%] h-6 rounded-md' />
      <Skeleton className='w-[60%] h-6 rounded-md' />
      <Skeleton className='w-[40%] h-6 rounded-md' />
    </div>
  );
}
