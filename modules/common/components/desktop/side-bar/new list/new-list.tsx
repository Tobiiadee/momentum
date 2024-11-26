"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Input } from "@/modules/common/ui/input";
import { Button } from "@/modules/common/ui/button";
import { X } from "lucide-react";
import { useListStore } from "@/modules/store/list-store";
import InputFile from "../../../shared/input-file";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const [listName, setListName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const setIsList = useListStore((state) => state.setIsList);
  const setList = useListStore((state) => state.setLists);
  const isList = useListStore((state) => state.isList);

  useEffect(() => {
    if (isList === true && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isList]);

  const listHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const list = {
      id: crypto.randomUUID(),
      name: listName.trim(),
      description: "",
    };

    if (listName !== "") {
      setIsList(false);
      setList(list);
      router.push(`/list/${list.name.toLowerCase()}`);
    }
  };

  return (
    <motion.form
      onSubmit={listHandler}
      initial='hidden'
      animate='visible'
      exit={"exit"}
      variants={variants}
      className='absolute bottom-52 left-[22rem] z-50 w-72 h-max flex flex-col space-y-4 shadow-lg bg-background rounded-md px-3 py-2'>
      <InputFile />
      <Input
        onChange={(e) => setListName(e.target.value)}
        ref={inputRef}
        value={listName}
        placeholder='Choose a list name...'
        className='placeholder:text-xs'
      />
      <Button
        type='submit'
        disabled={!listName}
        variant={"default"}
        className=''>
        Add
      </Button>

      <div className='absolute -top-[2.5rem] -right-4 w-8 aspect-square shadow-md bg-background flex justify-center items-center rounded-full overflow-hidden'>
        <Button onClick={() => setIsList(false)} variant={"ghost"} className=''>
          <X strokeWidth={1.5} size={20} />
        </Button>
      </div>
    </motion.form>
  );
}
