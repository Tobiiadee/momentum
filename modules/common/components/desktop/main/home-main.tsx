import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/ui/select";
import { Button } from "@/modules/common/ui/button";
import { AlignJustify } from "lucide-react";
import Task from "../../shared/task-item";

export default function HomeMain() {
  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex justify-end'>
        <div className='flex space-x-2 items-center'>
          <DaySelector />
          <SelectFilter />
        </div>
      </div>

      <div className='flex flex-col space-y-2 overflow-hidden'>
        <Task />
      </div>
    </div>
  );
}

function DaySelector() {
  return (
    <Select>
      <SelectTrigger className='w-[180px] bg-background border-none ring-0'>
        <SelectValue placeholder='Day' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='light'>Today</SelectItem>
        <SelectItem value='dark'>Yesterday</SelectItem>
        <SelectItem value='system'>This week</SelectItem>
      </SelectContent>
    </Select>
  );
}

function SelectFilter() {
  return (
    <Button
      variant={"ghost"}
      className='bg-background hover:bg-background/50 active:bg-background/40 shadow'>
      <AlignJustify strokeWidth={1.5} size={20} />
    </Button>
  );
}
