import { Text } from '@/modules/common/ui/text'
import React from 'react'
import UserGroups from './user-groups'
import { Separator } from '@/modules/common/ui/separator'
import GroupPermission from './group-permission'

export default function Groups() {
  return (
    <div className='flex flex-col space-y-4'>
      <Text variant={"h5"} className='font-medium'>
        Group Settings
      </Text>
      <UserGroups/>
      <Separator className='w-full'/>
      <GroupPermission/>
    </div>
  )
}
