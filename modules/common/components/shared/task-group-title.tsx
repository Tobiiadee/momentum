import React from 'react'
import { Text } from '../../ui/text'

interface TaskGroupTitleProps {
    groupTitle: string
}

export default function TaskGroupTitle({groupTitle}: TaskGroupTitleProps) {
  return (
    <div className='w-max py-0.5 px-2 bg-foreground/5 rounded'>
      <Text variant={"p"} className='font-semibold text-xs'>{groupTitle}</Text>
    </div>
  )
}
