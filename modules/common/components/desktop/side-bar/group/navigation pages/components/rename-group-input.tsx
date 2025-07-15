import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/modules/common/ui/input";
import { motion } from "framer-motion";
import { SlideUpVariants } from "@/modules/common/components/desktop/side-bar/new list/new-list";
import { Button } from "@/modules/common/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameList } from "@/modules/supabase/utils/actions";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import useUserStore from "@/modules/store/user-store";

interface RenameGroupInputProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

export default function RenameGroupInput({
  setIsOpen,
  isOpen,
}: RenameGroupInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [groupName, setGroupName] = useState("");

  //QueryCLient
  const queryClient = useQueryClient();

  //Get list Id from url
  const { groupId } = useParams();

  //get user's id
  const userId = useUserStore((state) => state.user?.id);

  useEffect(() => {
    if (isOpen === true && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  //   console.log(listId);

  const { mutate: renameListMutate, isPending } = useMutation({
    mutationKey: ["renameList"],
    mutationFn: (groupId: string) => renameList(groupId, groupName),
    onSuccess: () => {
      toast.success("List renamed successfully");
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["all-list", userId, "list", groupId],
      });
    },
    onError: () => {
      toast.error("Failed to rename list");
    },
  });

  const listHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(listName);

    if (groupId) {
      renameListMutate(groupId as string);
    }
  };

  return (
    <div className="fixed top-1/3 -translate-y-1/3  left-1/2 -translate-x-1/2 w-max h-max flex items-center justify-center z-50">
      <motion.form
        onSubmit={listHandler}
        initial="hidden"
        animate="visible"
        exit={"exit"}
        variants={SlideUpVariants}
        className="w-[20rem] md:w-[24rem] h-max flex flex-col space-y-4 shadow-lg bg-background rounded-md px-3 py-4"
      >
        <div className="relative flex space-x-1 items-center">
          <Input
            ref={inputRef}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Choose a group name..."
            className="placeholder:text-xs"
          />
        </div>

        <Button
          type="submit"
          isLoading={isPending}
          disabled={!groupName || isPending}
          variant={"default"}
          className=""
        >
          Rename Group
        </Button>
      </motion.form>
    </div>
  );
}
