"use client";

import { Textarea } from "@/modules/common/ui/textarea";
import useGroupStore from "@/modules/store/group-store";
import { SendHorizonal } from "lucide-react";
import React from "react";

export default function GroupChatInput() {
  const isGroupChat = useGroupStore((state) => state.isGroupChat);

  const inputRef = (element: HTMLTextAreaElement) => {
    if (element && isGroupChat) {
      element.focus();
    }
  };

  return (
    <form className='absolute bottom-0 left-0 w-full bg-foreground/5 py-1.5'>
      <Textarea
        ref={inputRef}
        className='bg-transparent shadow-none border-none min-h-9 max-h-16 focus-visible:ring-0 pr-11'
      />

      <button
        role='button'
        type='submit'
        title="Send"
        className='absolute top-1/2 -translate-y-1/2 right-2 text-foreground w-max h-max p-2'>
        <SendHorizonal size={20} strokeWidth={1.5} />
      </button>
    </form>
  );
}
