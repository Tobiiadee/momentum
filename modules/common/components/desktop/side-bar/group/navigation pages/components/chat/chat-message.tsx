import { Text } from "@/modules/common/ui/text";
import React from "react";

export default function ChatMessage() {
  return (
    <div className='flex flex-col space-y-4 w-full pt-12'>
      <MessageRecieve />
      <MessageSend />
    </div>
  );
}

function MessageSend() {
  return (
    <div className='w-full h-max flex justify-end pr-2'>
      <div className='w-max max-w-[70%] p-2 bg-foreground text-background rounded-t-md rounded-l-md'>
        <Text variant={"p"}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit ullam
          quis saepe molestias, sequi delectus ad eius aliquid voluptas
          pariatur?
        </Text>
      </div>
    </div>
  );
}
function MessageRecieve() {
  return (
    <div className='w-full h-max rounded-t-md rounded-r-md flex justify-start pl-2'>
      <div className='w-max max-w-[70%] p-2 bg-foreground/10 text-foreground rounded-t-md rounded-r-md'>
        <Text variant={"p"}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit ullam
          quis saepe molestias, sequi delectus ad eius aliquid voluptas
          pariatur?</Text>
      </div>
    </div>
  );
}
