import { Text } from "@/modules/common/ui/text";
import { GroupIcon } from "lucide-react";
import React from "react";
import {
  GroupItemImage,
  GroupRemainingMembers,
} from "../../side-bar/group/group-item";

const memberData = [
  {
    id: "1",
    username: "oluwatobi121",
    avatar: "/images/img3.jpg",
  },
  {
    id: "2",
    username: "oluwatobi121",
    avatar: "/images/img3.jpg",
  },
  {
    id: "3",
    username: "oluwatobi121",
    avatar: "/images/img3.jpg",
  },
  {
    id: "4",
    username: "oluwatobi121",
    avatar: "/images/img3.jpg",
  },
  {
    id: "5",
    username: "oluwatobi121",
    avatar: "/images/img3.jpg",
  },
  {
    id: "6",
    username: "oluwatobi121",
    avatar: "/images/img3.jpg",
  },
  {
    id: "7",
    username: "oluwatobi121",
    avatar: "/images/img3.jpg",
  },
];

export default function ResultGroup() {
  const sliceMembers = memberData.slice(0, 3);
  const remaininMembers = memberData.length - 3;

  return (
    <div className='flex items-center space-x-2 cursor-pointer py-2 px-2 rounded-lg w-full hover:bg-foreground/5 active:bg-foreground/10 transition duration-300'>
      <div className='grid place-items-center w-14 aspect-square rounded-md bg-foreground/10'>
        <GroupIcon size={24} strokeWidth={1.5} className='text-foreground/60' />
      </div>

      <div className='flex flex-col w-full'>
        <Text variant='p' className='font-semibold'>
          Group Name
        </Text>
        <div className='flex items-center space-x-2 w-full ml-1'>
          <div className='relative grid grid-cols-4 place-items-center grid-flow-dense w-max'>
            {sliceMembers?.map((member) => (
              <GroupItemImage
                key={member.id}
                image={member?.avatar as string}
                alt={member?.username as string}
              />
            ))}
            {memberData.length > 3 && (
              <GroupRemainingMembers remainingMembers={remaininMembers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
