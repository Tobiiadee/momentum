import { Text } from "@/modules/common/ui/text";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/ui/select";
import { Switch } from "@/modules/common/ui/switch";

export default function GroupPermission() {
  return (
    <div className='flex flex-col space-y-4'>
      <Text variant={"p"} className='font-medium'>
        Group Permission
      </Text>
      <div className='flex justify-between items-center w-[70%]'>
        <Text variant={"p"} className=''>
          Who can add you to groups?
        </Text>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Group Permission' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='everyone'>Everyone</SelectItem>
            <SelectItem value='only you'>Only you</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex justify-between items-center w-[70%]'>
        <Text variant={"p"} className=''>
          Get email notifications when someone adds you to a group?
        </Text>
        <Switch />
      </div>

      <div className='flex justify-between items-center w-[70%]'>
        <Text variant={"p"} className=''>
          Set group theme
        </Text>
        <div className=''></div>
      </div>
    </div>
  );
}
