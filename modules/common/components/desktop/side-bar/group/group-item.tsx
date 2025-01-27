import { cn } from "@/lib/utils";
import { Text } from "@/modules/common/ui/text";
import useGroupStore from "@/modules/store/group-store";
import { fetchUser } from "@/modules/supabase/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

export interface GroupItemProps {
  id: string;
  name: string;
  members: string[];
  index: number;
  isAdmin?: boolean;
}

const groupItemVariants: Variants = {
  hidden: { x: 70, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: { x: -70, opacity: 0 },
};

export default function GroupItem({
  id,
  name,
  members,
  index,
  isAdmin,
}: GroupItemProps) {
  const router = useRouter();
  // const [deleteGroup, setDeleteGroup] = useState(false);
  const setDeleteGroupObject = useGroupStore(
    (state) => state.setDeleteGroupObject
  );

  const setListIdFromDatabase = useGroupStore(
    (state) => state.setListIdFromDatabase
  );

  const sliceMembers = members.slice(0, 5);
  const remaininMembers = members.length - 5;

  // Fetch members by ID
  const { data: memberData } = useQuery({
    queryKey: ["members", id],
    queryFn: async () => {
      const fetchedMembers = await Promise.all(
        sliceMembers.map((memberId) => fetchUser(memberId))
      );
      return fetchedMembers;
    },
  });

  // console.log(memberData);  

  const encodeGroupName = encodeURIComponent(name.toLowerCase())

  return (
    <motion.div
      onClick={() => {
        router.push(`/dashboard/group/${encodeGroupName}?id=${id}`);
        setListIdFromDatabase(id);
        setDeleteGroupObject({ group_label: name, list_Id: id });
      }}
      variants={groupItemVariants}
      custom={index}
      initial='hidden'
      animate='visible'
      id={id}
      className='relative flex flex-col space-y-2 cursor-pointer group'>
      <div className='relative w-full aspect-square rounded bg-foreground/10 group-hover:bg-foreground/15 group-active:scale-95 transition-all duration-300 grid place-content-center'>
        <div className='relative grid grid-cols-3 grid-flow-dense'>
          {memberData?.map((member) => (
            <GroupItemImage
              key={member.id}
              image={member?.avatar as string}
              alt={member?.username as string}
            />
          ))}
          {members.length > 5 && (
            <GroupRemainingMembers remainingMembers={remaininMembers} />
          )}
        </div>
      </div>

      <div className='flex flex-col'>
        <Text variant={"p"} className='font-medium capitalize'>
          {name}
        </Text>
        <Text variant={"p"} className='text-foreground/60 text-xs'>
          {members.length} {members.length > 1 ? "Members" : "Member"}
        </Text>
      </div>
      <div
        className={cn(
          isAdmin ? "bg-green-600" : "bg-foreground/60",
          "absolute left-2 w-2 aspect-square rounded-full shadow-md"
        )}></div>
    </motion.div>
  );
}

export function GroupItemImage({ image, alt }: { image: string; alt: string }) {
  // Generate a random background color using useMemo for consistent color per render
  const randomColor = useMemo(() => {
    const colors = [
      "#FFADAD", // Light Red
      "#FFD6A5", // Light Orange
      "#FDFFB6", // Light Yellow
      "#CAFFBF", // Light Green
      "#9BF6FF", // Light Blue
      "#A0C4FF", // Light Indigo
      "#BDB2FF", // Light Violet
      "#FFC6FF", // Light Pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <div
      className='w-8 z-0 relative aspect-square -ml-2 rounded-full border-2 border-background'
      style={{ backgroundColor: randomColor }}>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 aspect-square rounded-full flex items-center justify-center overflow-hidden'>
        <Image
          src={image}
          alt={`${alt} profile picture`}
          fill
          className='object-cover'
          priority
        />
      </div>
    </div>
  );
}

export function GroupRemainingMembers({
  remainingMembers: remainingMembers,
}: {
  remainingMembers: number;
}) {
  return (
    <div className='w-7 z-10 aspect-square rounded-full border border-foreground/30 bg-background grid place-items-center -ml-2'>
      <Text variant={"p"} className='font-semibold'>
        {"+" + remainingMembers}
      </Text>
    </div>
  );
}
