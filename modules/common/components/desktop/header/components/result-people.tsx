import { Text } from "@/modules/common/ui/text";
import Image from "next/image";
import React from "react";

interface ResultPeopleProps {
  people: UserDataType;
}

export default function ResultPeople({ people }: ResultPeopleProps) {
  return (
    <div className='flex items-center space-x-2 cursor-pointer py-2 px-2 rounded-lg w-full hover:bg-foreground/5 active:bg-foreground/10 transition duration-300'>
      <div className='relative w-10 aspect-square rounded-md overflow-hidden'>
        <Image
          src={people?.avatar}
          alt='profile'
          fill
          priority
          className='object-cover'
        />
      </div>

      <div className='flex flex-col'>
        <Text variant='p' className='font-semibold'>
          {people?.username}
        </Text>
        <div className='flex items-center space-x-2'>
          <Text variant='p' className='text-sm'>
            {people?.email}
          </Text>
        </div>
      </div>
    </div>
  );
}
