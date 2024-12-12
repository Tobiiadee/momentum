"use client";

import React from "react";

import useListStore from "@/modules/store/list-store";

export default function EmojiSelect() {
  const emoji = useListStore((state) => state.emoji);
  return (
    <div className='absolute top-1/2 -translate-y-1/2 left-2'>
      {emoji}
    </div>
  );
}
