import { ClockAlert } from "lucide-react";
import React from "react";
import { Text } from "../../ui/text";

export default function HomeTimer() {
  return (
    <div className='bg-background rounded-lg w-full p-4'>
      <div className='flex space-x-1 items-center justify-start'>
        <Text variant={"p"}>Timer</Text>
        <ClockAlert size={20} strokeWidth={1.5} />
      </div>
    </div>
  );
}
