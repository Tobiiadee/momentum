import { Text } from '@/modules/common/ui/text'
import { ListIcon } from 'lucide-react'
import React from 'react'

export default function ResultList() {
  return (
    <div className='flex items-center space-x-2 cursor-pointer py-2 px-2 rounded-lg w-full hover:bg-foreground/5 active:bg-foreground/10 transition duration-300'>
      <div className='grid place-items-center w-12 aspect-square rounded-md bg-foreground/10'>
        <ListIcon size={24} strokeWidth={1.5} className='text-foreground/60' />
      </div>

      <div className='flex flex-col'>
        <Text variant='p' className='font-semibold'>
          Name of list
        </Text>
        <div className='flex items-center space-x-2'>
          <Text variant='p' className='font-semibold'>
            Group Name:
          </Text>
        </div>
      </div>
    </div>
  )
}
