"use client";

import { Text } from "@/modules/common/ui/text";
import React from "react";
import UserGroupItem from "./user-group-item";
import useCustomScroll from "@/hooks/use-custom-scroll";
import { Button } from "@/modules/common/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

const members = [
  {
    id: "1",
    name: "John Doe",
    image: "img3.jpg",
    email: "johndoe@gmail.com",
  },
  {
    id: "2",
    name: "John Doe",
    image: "img2.jpg",
    email: "johndoe@gmail.com",
  },
  {
    id: "3",
    name: "John Doe",
    image: "img1.jpg",
    email: "johndoe@gmail.com",
  },
  {
    id: "4",
    name: "John Doe",
    image: "img5.jpg",
    email: "johndoe@gmail.com",
  },
];

export default function UserGroups() {
  const { scrollLeft, scrollRight, scrollRef, showLeft, showRight } =
    useCustomScroll();

  return (
    <div className='flex flex-col space-y-4'>
      <Text variant={"p"} className='font-medium'>
        Your Groups
      </Text>
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center'>
          <Button
            disabled={!showLeft}
            onClick={scrollLeft}
            variant={"ghost"}
            size={"sm"}
            className=''>
            <MoveLeft strokeWidth={1.5} size={20} />
          </Button>
          <Button
            disabled={!showRight}
            onClick={scrollRight}
            variant={"ghost"}
            size={"sm"}
            className=''>
            <MoveRight strokeWidth={1.5} size={20} />
          </Button>
        </div>
        <div
          id='hide-scrollbar'
          ref={scrollRef}
          className='flex items-center space-x-2 overflow-y-auto'>
          {Array.from({ length: 10 }).map((_, i) => (
            <UserGroupItem
              key={i}
              id={"1"}
              name={"Group 1"}
              members={members}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
