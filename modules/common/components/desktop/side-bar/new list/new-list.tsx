"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Input } from "@/modules/common/ui/input";
import { Button } from "@/modules/common/ui/button";
import { X } from "lucide-react";
import { useListStore } from "@/modules/store/list-store";
import useAllListStore from "@/modules/store/all-list-store";
import SVGSelected from "./svg-selected";
import SelectSvg from "./select-svg";
import useListAction from "@/hooks/use-list-action";
import useUserStore from "@/modules/store/user-store";
import { v4 as uuidv4 } from "uuid";

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
  // const inputRef = useRef<HTMLInputElement>(null);
  // const setIsList = useListStore((state) => state.setIsList);
  const isList = useListStore((state) => state.isList);
  const svgImage = useListStore((state) => state.svgImage);
  const reset = useListStore((state) => state.reset);
  const addToList = useAllListStore((state) => state.addToList);

  //Get user Id
  const user_id = useUserStore((state) => state.user?.id);

  //Create list on database
  const { addListMutate, isAddListError, isAddingList } = useListAction(
    user_id as string
  );

  //set focus on input field when list is true
  const inputRef = (Element: HTMLInputElement) => {
    if (Element && isList === true) {
      Element.focus();
    }
  };

  const listHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const list: ListType = {
      list_id: uuidv4() as string,
      label: listName.trim(),
      icon: svgImage,
      type: "list",
    };

    if (listName !== "") {
      addListMutate(list);
      if (!isAddListError) {
        addToList(list);
        reset();
      }
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
        {!!svgImage && <SVGSelected />}

        <div className='relative flex space-x-1 items-center'>
          <Input
            onChange={(e) => setListName(e.target.value)}
            ref={inputRef}
            value={listName}
            placeholder='Choose a list name...'
            className='placeholder:text-xs'
          />
        </div>

        {!!listName && (
          <div className='relative w-full'>
            <SelectSvg seed={listName} />
          </div>
        )}

        <Button
          type='submit'
          isLoading={isAddingList}
          disabled={!listName || svgImage === ""}
          variant={"default"}
          className=''>
          Create list
        </Button>

        <div className='absolute -top-[2.5rem] -right-4 w-8 aspect-square shadow-md bg-background flex justify-center items-center rounded-full overflow-hidden'>
          <Button
            type='button'
            onClick={() => reset()}
            variant={"ghost"}
            className=''>
            <X strokeWidth={1.5} size={20} />
          </Button>
        </div>
      </motion.form>
    </>
  );
}
