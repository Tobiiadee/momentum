import useGroupAction from "@/hooks/use-group-action";
import { capitalize } from "@/lib/helpers/helpers";
import { Button } from "@/modules/common/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/ui/select";
import useUserStore from "@/modules/store/user-store";
import { X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface MembersRoleProps {
  memberRole: string;
  group_id: string;
  member_id: string;
  creator_id: string;
  permission?: boolean;
}

export function MembersRole({
  memberRole,
  group_id,
  member_id,
  creator_id,
}: MembersRoleProps) {
  const user = useUserStore((state) => state.user);

  // Fetch the group data to check the logged-in user's role.
  const { fetchedGroup, deleteMemberMutate, updateMemberRoleMutate } =
    useGroupAction(user?.id as string, group_id);

  // Check if the logged-in user is the creator or an admin in the group.
  const isAdmin =
    user?.id === creator_id ||
    fetchedGroup?.members.some(
      (member) =>
        member.member_id === user?.id && capitalize(member.role) === "Admin"
    );

  const handleDeleteMember = () => {
    if (!isAdmin) {
      toast.error("Only admins can remove members from the group");
      return;
    }
    deleteMemberMutate({
      groupId: group_id,
      memberId: member_id,
    });
  };

  const handleRoleChange = (newRole: string) => {
    if (!isAdmin) {
      toast.error("Only admins can change member roles");
      return;
    }
    updateMemberRoleMutate({
      groupId: group_id,
      memberId: member_id,
      newRole: capitalize(newRole) as GroupRoleType,
      userId: user?.id as string,
    });
  };

  return (
    <div className='flex space-x-4'>
      <Select
        defaultValue={memberRole.toLowerCase()}
        disabled={!isAdmin}
        onValueChange={handleRoleChange}>
        <SelectTrigger className='w-[100px] md:w-[150px] border-foreground/30 text-xs'>
          <SelectValue className='placeholder:text-xs' placeholder='Role' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='admin'>Admin</SelectItem>
          <SelectItem value='member'>Member</SelectItem>
          <SelectItem value='guest'>Guest</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={handleDeleteMember}
        disabled={!isAdmin}
        variant='ghost'
        size='sm'
        className='hover:bg-foreground/15'>
        <X strokeWidth={1.5} size={18} />
      </Button>
    </div>
  );
}
