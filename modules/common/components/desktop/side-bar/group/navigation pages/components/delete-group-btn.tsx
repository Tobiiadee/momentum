import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { Trash2 } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/ui/tooltip";
import useGroupAction from "@/hooks/use-group-action";
import useUserStore from "@/modules/store/user-store";
import { toast } from "sonner";

interface DeleteGroupBtnProps {
  group_id: string;
  creator_id: string;
}

export default function DeleteGroupBtn({
  group_id,
  creator_id,
}: DeleteGroupBtnProps) {
  const user = useUserStore((state) => state.user);
  const { deleteGroupMutate, isDeletingGroup } = useGroupAction(
    user?.id as string
  );

  const handleDeleteGroup = () => {
    if (creator_id !== user?.id) {
      toast.error("You must be the creator of the group to delete it.");
      return;
    }
    deleteGroupMutate(group_id);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleDeleteGroup}
            isLoading={isDeletingGroup}
            variant={"destructive"}
            className='text-xs'>
            <Trash2 size={20} strokeWidth={1.5} />
            <Text variant={"p"} className='text-xs hidden md:block'>
              Delete group
            </Text>
          </Button>
        </TooltipTrigger>
        <TooltipContent className='mr-20 text-xs'>
          <p>You must be the creator of the group to delete it.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
