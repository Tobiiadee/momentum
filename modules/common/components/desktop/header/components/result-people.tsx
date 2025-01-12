import { Text } from "@/modules/common/ui/text";
import Image from "next/image";
import React from "react";

export default function ResultPeople() {
  return (
    <div className='flex items-center space-x-2 cursor-pointer pt-2'>
      <div className='relative w-12 aspect-square rounded-md overflow-hidden'>
        <Image
          src='/images/img3.jpg'
          alt='profile'
          fill
          priority
          className='object-cover'
        />
      </div>

      <div className='flex flex-col'>
        <Text variant='p' className='font-semibold'>
          Username
        </Text>
        <div className='flex items-center space-x-2'>
          <Text variant='p' className='text-sm'>
            oluwatobi121@gmail.com
          </Text>
        </div>
      </div>
    </div>
  );
}
