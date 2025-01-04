import { Text } from "@/modules/common/ui/text";
import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/ui/select";
import { Button } from "@/modules/common/ui/button";
import { Trash2 } from "lucide-react";

export default function MembersItems() {
  return (
    <div className='col-span-2 w-full flex flex-col bg-foreground/10 p-4'>
      <div className='grid grid-cols-6 gap-4'>
        <Text variant={"p"} className='col-span-2 font-semibold'>
          Name
        </Text>
        <Text variant={"p"} className='font-semibold'>
          Date Added
        </Text>
        <Text variant={"p"} className='font-semibold'>
          Last Active
        </Text>
        <Text
          variant={"p"}
          className='uppercase col-span-2 font-semibold'></Text>
      </div>
      <div className='divide-y divide-foreground/10 flex flex-col space-y-4'>
        <MembersItem />
        <MembersItem />
        <MembersItem />
      </div>
    </div>
  );
}

function MembersItem() {
  return (
    <div className='grid grid-cols-6 gap-4 items-center pt-4'>
      <div className='col-span-2 flex space-x-4 items-center'>
        <div className='relative w-10 aspect-square rounded-full overflow-hidden'>
          <Image
            src={"/images/img5.jpg"}
            alt='Avatar'
            fill
            priority
            className='object-cover'
          />
        </div>
        <div className=''>
          <Text variant={"p"} className='font-medium'>
            John Doe
          </Text>
          <Text variant={"p"} className='text-foreground/60 text-xs'>
            johndeo@gmail.com
          </Text>
        </div>
      </div>

      <Text variant={"p"} className='text-xs'>
        28 May, 2024
      </Text>
      <Text variant={"p"} className='text-xs'>
        30 May, 2024
      </Text>

      <MembersRole/>
    </div>
  );
}

function MembersRole() {
  return (
    <div className='col-span-2 flex space-x-4'>
      <Select>
        <SelectTrigger className='w-[150px] border-foreground/30 text-xs'>
          <SelectValue className="placeholder:text-xs" placeholder='Role' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='admin'>Admin</SelectItem>
          <SelectItem value='member'>Member</SelectItem>
          <SelectItem value='guest'>Guest</SelectItem>
        </SelectContent>
      </Select>

      <Button variant={"ghost"} size={"sm"} className='hover:bg-foreground/15'>
        <Trash2 strokeWidth={1.5} size={18} />
      </Button>
    </div>
  );
}
