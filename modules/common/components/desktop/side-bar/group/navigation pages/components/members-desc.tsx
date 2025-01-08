"use client";

import useGroupAction from "@/hooks/use-group-action";
import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import useGroupStore from "@/modules/store/group-store";
import useUserStore from "@/modules/store/user-store";
import { Download, Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface MembersDescProps {
  group_id: string;
}

export default function MembersDesc({ group_id }: MembersDescProps) {
  const user = useUserStore((state) => state.user);
  const setIsAddMember = useGroupStore((state) => state.setIsAddMember);

  // Fetch the group data to check the logged-in user's role.
  const { fetchedGroup } = useGroupAction(user?.id as string, group_id);

  // Check if the logged-in user is the creator or an admin in the group.
  const isAdmin =
    fetchedGroup?.creator_id === user?.id ||
    fetchedGroup?.members.some(
      (member) => member.member_id === user?.id && member.role === "Admin"
    );

  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col space-y-2'>
        <Text variant={"h5"} className='font-medium'>
          Members
        </Text>
        <div className='flex flex-col'>
          <Text variant={"p"}>
            Invite your team members to work faster and to collaborate easily.
          </Text>
          <Text variant={"p"}>Manage your members and their roles.</Text>
        </div>
      </div>

      <div className='flex space-x-4 items-center'>
        <Button
          variant={"ghost"}
          className='flex items-center bg-foreground/10 hover:bg-foreground/15'>
          <Download strokeWidth={1.5} size={18} />
          <Text variant={"p"} className='text-xs'>
            Download CSV
          </Text>
        </Button>
        <Button
          onClick={() => {
            if (!isAdmin) {
              toast.error("Only admins can invite members");
              return;
            }
            setIsAddMember(true);
          }}
          className='flex items-center'>
          <Plus strokeWidth={1.5} size={18} />
          <Text variant={"p"} className='text-xs'>
            Invite member
          </Text>
        </Button>
      </div>
    </div>
  );
}
