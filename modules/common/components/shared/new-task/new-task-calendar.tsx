import { Calendar } from "@/modules/common/ui/calendar";
import { Text } from "@/modules/common/ui/text";
import React from "react";

export default function NewTaskCalendar() {
  return (
    <div className='w-80 min-w-80 flex flex-col space-y-2 bg-background rounded-lg'>
      <Text variant={"p"} className='font-medium border-b pb-2 mx-4 mt-4'>
        Choose a date for your task
      </Text>
      <Calendar />
    </div>
  );
}
