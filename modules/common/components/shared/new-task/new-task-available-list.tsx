import React from 'react'
import AvialableList from '../../task/avialable-list'
import { Text } from '@/modules/common/ui/text'

export default function NewTaskAvailableList() {
  return (
    <div className='flex flex-col space-y-2 w-full bg-background py-4 px-2 rounded-lg'>
        <Text variant={"p"} className='font-medium border-b pb-2'>
          Choose where to add your task
        </Text>
      <AvialableList/>
    </div>
  )
}
