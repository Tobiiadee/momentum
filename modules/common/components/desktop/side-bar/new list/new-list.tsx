"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Input } from "@/modules/common/ui/input";
import { Button } from "@/modules/common/ui/button";
import { X } from "lucide-react";
import { useListStore } from "@/modules/store/list-store";
import useAllListStore from "@/modules/store/all-list-store";
import PickEmoji from "./pick-emoji";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import EmojiSelect from "./emoji-select";

const variants: Variants = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: -10,
    opacity: 1,
    transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
  },
  exit: { y: 70, opacity: 0 },
};

export default function NewList() {
  const [listName, setListName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  // const setIsList = useListStore((state) => state.setIsList);
  const isList = useListStore((state) => state.isList);
  const showEmojiPicker = useListStore((state) => state.showEmojipicker);
  const setShowEmojiPicker = useListStore((state) => state.setShowEmojipicker);
  const setEmoji = useListStore((state) => state.setEmoji);
  const emoji = useListStore((state) => state.emoji);
  const reset = useListStore((state) => state.reset);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const addToList = useAllListStore((state) => state.addToList);

  useEffect(() => {
    if (isList === true && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isList]);

  const listHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const list: ListType = {
      id: crypto.randomUUID(),
      label: listName.trim(),
      numberOfTask: 0,
      default: false,
      icon: emoji,
      type: "list",
    };

    if (listName !== "") {
      addToList(list);
      reset();
    }
  };


  return (
    <>
      <motion.form
        onSubmit={listHandler}
        initial='hidden'
        animate='visible'
        exit={"exit"}
        variants={variants}
        className='absolute top-1/3 -translate-y-1/3 left-[22rem] z-50 w-72 h-max flex flex-col space-y-4 shadow-lg bg-background rounded-md px-3 py-4'>
        <div className='relative flex space-x-1 items-center'>
          <Input
            onChange={(e) => setListName(e.target.value)}
            ref={inputRef}
            value={listName}
            placeholder='Choose a list name...'
            className='placeholder:text-xs pl-10'
          />
          <PickEmoji />
          <EmojiSelect />
        </div>

        <Button
          type='submit'
          disabled={!listName}
          variant={"default"}
          className=''>
          Add
        </Button>

        <div className='absolute -top-[2.5rem] -right-4 w-8 aspect-square shadow-md bg-background flex justify-center items-center rounded-full overflow-hidden'>
          <Button
            onClick={() => reset()}
            variant={"ghost"}
            className=''>
            <X strokeWidth={1.5} size={20} />
          </Button>
        </div>

        {showEmojiPicker && (
          <div className='absolute left-[110%] -top-20 z-10 mt-2'>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </motion.form>
    </>
  );
}
