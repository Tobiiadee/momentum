import { Button } from "@/modules/common/ui/button";
// import { Text } from "@/modules/common/ui/text";
import { Trash2 } from "lucide-react";
import React from "react";
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
    <Button
      onClick={handleDeleteGroup}
      isLoading={isDeletingGroup}
      title="Delete group"
      variant={"ghost"}
      size={"sm"}
      className="text-xs hover:bg-red-300 group"
    >
      <Trash2 size={20} strokeWidth={1.5} className="text-red-500 group-hover:text-red-600"/>
      {/* <Text variant={"p"} className="text-xs hidden md:block">
        Delete group
      </Text> */}
    </Button>
  );
}
