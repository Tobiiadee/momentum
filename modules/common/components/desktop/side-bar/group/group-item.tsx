import useGroupAction from "@/hooks/use-group-action";
import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import useGroupStore from "@/modules/store/group-store";
import useUserStore from "@/modules/store/user-store";
import { fetchUser } from "@/modules/supabase/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { Loader, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface GroupItemProps {
  id: string;
  name: string;
  members: string[];
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

const deleteListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7 },
  },
};

export default function GroupItem({ id, name, members }: GroupItemProps) {
  const router = useRouter();
  const [deleteGroup, setDeleteGroup] = useState(false);
  const user = useUserStore((state) => state.user);
  const { deleteGroupMutate, isDeletingGroup } = useGroupAction(
    user?.id as string
  );
  const setListIdFromDatabase = useGroupStore(
    (state) => state.setListIdFromDatabase
  );

  const handleDeleteGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteGroupMutate(id);
    router.push("/dashboard");
  };

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

  return (
    <motion.div
      onMouseEnter={() => setDeleteGroup(true)}
      onMouseLeave={() => setDeleteGroup(false)}
      onClick={() => {
        router.push(`/dashboard/group/${name.toLowerCase()}`);
        setListIdFromDatabase(id);
      }}
      variants={groupItemVariants}
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

        {isDeletingGroup && (
          <div className='absolute top-0 left-0 w-full h-full bg-foreground/10 backdrop-blur-sm grid place-items-center'>
            <Loader
              strokeWidth={1}
              size={30}
              className='text-foreground/50 animate-spin'
            />
          </div>
        )}
      </div>

      <div className='flex flex-col'>
        <Text variant={"p"} className='font-medium capitalize'>
          {name}
        </Text>
        <Text variant={"p"} className='text-foreground/60 text-xs'>
          {members.length} {members.length > 1 ? "Persons" : "Person"}
        </Text>
      </div>
      {!isDeletingGroup && (
        <AnimatePresence mode='wait'>
          {deleteGroup && (
            <motion.div
              variants={deleteListVariants}
              initial='hidden'
              animate='visible'
              exit={"hidden"}
              className='absolute -top-[1.5rem] -right-3 w-8 aspect-square shadow-md bg-background flex justify-center items-center rounded-full overflow-hidden'>
              <Button
                onClick={(e) => handleDeleteGroup(e)}
                variant={"ghost"}
                className=''>
                <X strokeWidth={1.5} size={20} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export function GroupItemImage({ image, alt }: { image: string; alt: string }) {
  // console.log(image);
  return (
    <div className='w-8 z-0 relative aspect-square -ml-2 rounded-full bg-yellow-300 border-2 border-background'>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 aspect-square rounded-full flex items-center justify-center overflow-hidden'>
        <Image
          src={image}
          alt={`${alt} profile`}
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
