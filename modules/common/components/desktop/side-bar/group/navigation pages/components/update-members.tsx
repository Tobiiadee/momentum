import { Input } from "@/modules/common/ui/input";
import { Text } from "@/modules/common/ui/text";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useGroupStore from "@/modules/store/group-store";
import { Button } from "@/modules/common/ui/button";
import { Loader, Search, X } from "lucide-react";
import useSearchUsers from "@/hooks/use-search-users";
import useUserStore from "@/modules/store/user-store";

const memberVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 300, damping: 20 },
  },
  exit: { y: 70, opacity: 0 },
};

const listItemVariants: Variants = {
  hidden: { x: -150, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.1 },
  },
  exit: { opacity: 0 },
};

const inputVariants: Variants = {
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
  exit: { y: 70, opacity: 0 },
};

interface UpdateMembersProps {
  oldMembers: AddMemberType[];
}

export default function UpdateMembers({ oldMembers }: UpdateMembersProps) {
  const user_id = useUserStore((state) => state.user?.id);
  const [searchMember, setSearchMember] = useState<string>("");

  const membersList = useGroupStore((state) => state.members);

  const {
    data: searchedMembers,
    isLoading,
    isError,
    error,
  } = useSearchUsers(user_id as string, searchMember);

  const filteredMembers = searchedMembers?.filter(
    (member) =>
      member.id !== user_id &&
      !oldMembers.some((oldMember) => oldMember.member_id === member.id)
  );

  return (
    <div className='relative flex flex-col space-y-2 h-48 max-h-48 '>
      <motion.div
        variants={inputVariants}
        initial='hidden'
        animate='visible'
        className='flex items-center space-x-3 relative p-0'>
        <Input
          onChange={(e) => {
            setSearchMember(e.target.value);
          }}
          placeholder='Search member by username or email...'
          className='placeholder:text-xs pl-9'
        />
        <div className='absolute left-0'>
          {isLoading ? (
            <div className='absolute top-1/2 -translate-y-1/2 left-0'>
              <Loader
                size={18}
                strokeWidth={1.3}
                className='animate-spin text-foreground/60'
              />
            </div>
          ) : (
            <div className='absolute top-1/2 -translate-y-1/2 left-0'>
              <Search
                size={18}
                strokeWidth={1.3}
                className='text-foreground/50'
              />
            </div>
          )}
        </div>
      </motion.div>

      {searchMember !== "" && (
        <motion.div
          variants={memberVariants}
          initial='hidden'
          animate='visible'
          className='absolute top-10 z-30 w-full h-max max-h-[9rem] overflow-y-auto flex flex-col space-y-1 bg-background rounded-b-md shadow-lg pb-2'>
          {isError && (
            <div className='w-full grid place-items-center min-h-8'>
              <Text
                variant={"p"}
                className='text-center italic text-foreground/60'>
                {error?.message}
              </Text>
            </div>
          )}

          {filteredMembers?.map((member) => (
            <MemberItem
              oldMembers={oldMembers}
              key={member.id + member.email}
              setSearchedMembers={setSearchMember}
              name={member.username}
              email={member.email}
              image={member.avatar}
              id={member.id}
            />
          ))}

          {searchMember !== "" && filteredMembers?.length === 0 && (
            <div className='w-full grid place-items-center min-h-8'>
              <Text
                variant={"p"}
                className='text-center text-xs text-foreground/60'>
                Email not found
              </Text>
            </div>
          )}
        </motion.div>
      )}

      <AnimatePresence mode='wait'>
        {membersList.length !== 0 && (
          <div className='flex flex-col h-max max-h-48 overflow-y-auto'>
            {membersList.map((member) => (
              <MemberListItem
                key={member.id + member.email}
                name={member.name}
                email={member.email}
                image={member.image}
                id={member.id}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {membersList.length === 0 && (
        <div className='w-full grid place-items-center h-40'>
          <Text variant={"p"} className='text-xs text-foreground/60'>
            Choose your team members
          </Text>
        </div>
      )}
    </div>
  );
}

interface MemberItemProps extends MemberType {
  setSearchedMembers: (members: string) => void;
  oldMembers: AddMemberType[];
}

function MemberItem({
  name,
  email,
  image,
  id,
  setSearchedMembers,
}: MemberItemProps) {
  const setMembers = useGroupStore((state) => state.setMembers);
  const members = useGroupStore((state) => state.members);

  const handleSelect = () => {
    if (members.find((member) => member.id === id)) return;
    setSearchedMembers("");
    setMembers({
      name,
      email,
      image,
      id,
      created_at: new Date().toISOString(),
    });
  };

  return (
    <div
      onClick={handleSelect}
      id={id}
      className='flex items-center space-x-2 hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-300 py-1 px-2 cursor-pointer'>
      <div className='relative w-8 aspect-square rounded-full overflow-hidden flex items-center justify-center'>
        <Image
          src={image}
          alt={"profile" + name}
          fill
          className='object-cover'
        />
      </div>

      <div className='flex flex-col -space-y-1'>
        <Text variant={"p"} className='font-medium'>
          {name}
        </Text>
        <Text variant={"p"} className='text-xs'>
          {email}
        </Text>
      </div>
    </div>
  );
}

function MemberListItem({ name, email, image, id }: MemberType) {
  const deleteItem = useGroupStore((state) => state.deleteMember);

  return (
    <motion.div
      variants={listItemVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='flex items-center justify-between hover:bg-foreground/10 transition-all duration-300 py-1 px-2'>
      <div className='flex space-x-2 items-center'>
        <div className='relative w-8 aspect-square rounded-full overflow-hidden flex items-center justify-center'>
          <Image
            src={image}
            alt={"profile" + name}
            fill
            className='object-cover'
          />
        </div>

        <div className='flex flex-col -space-y-1'>
          <Text variant={"p"} className='font-medium'>
            {name}
          </Text>
          <Text variant={"p"} className='text-xs'>
            {email}
          </Text>
        </div>
      </div>

      <div>
        <Button
          onClick={() => deleteItem(id)}
          variant={"ghost"}
          size={"sm"}
          className='bg-transparent hover:bg-transparent'>
          <X strokeWidth={1.5} size={20} />
        </Button>
      </div>
    </motion.div>
  );
}
