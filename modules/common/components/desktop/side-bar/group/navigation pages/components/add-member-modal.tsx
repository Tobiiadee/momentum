/*eslint-disable @typescript-eslint/no-explicit-any*/

"use client";

import PreviewWithModal from "@/modules/common/components/shared/preview-with-modal";
import useGroupStore from "@/modules/store/group-store";
import React, { useState } from "react";
import { Button } from "@/modules/common/ui/button";
import useUserStore from "@/modules/store/user-store";
import { useParams } from "next/navigation";
import UpdateMembers from "./update-members";
import { toast } from "sonner";
import { sendInvite } from "@/lib/utils/invite-response";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGroup } from "@/modules/supabase/utils/actions";

export default function AddMemberModal() {
  const { groupId } = useParams();

  const [isInviting, setIsInviting] = useState(false);

  //fetch group with id
  const { data: group } = useQuery({
    queryKey: [groupId],
    queryFn: async () => fetchGroup(groupId as string),
  });

  const queryClient = useQueryClient();

  const user = useUserStore((state) => state.user);
  const setIsAddMember = useGroupStore((state) => state.setIsAddMember);
  const members = useGroupStore((state) => state.members);
  const setGroupMembers = useGroupStore((state) => state.reset);

  const setMembers: AddMemberType[] = members.map((member) => ({
    member_id: member.id,
    created_at: member.created_at,
    role: "Member",
  }));

  const receiverIds = setMembers.map((member) => member.member_id);

  const handleMembersUpdateGroup = async () => {
    try {
      setIsInviting(true);
      const sendInviteRes = await sendInvite(
        group?.list_id as string,
        user?.id as string,
        receiverIds
      );

      if (sendInviteRes.status === 200) {
        toast.success("Invite sent successfully");
        queryClient.invalidateQueries({
          queryKey: ["getGroupPendingInvites", group?.list_id],
        });
        setIsInviting(false);
        toast.success("Invite sent successfully");
      }
    } catch (error: any) {
      setIsInviting(false);
      toast.error(error.message);
    }

    setGroupMembers();
    setIsAddMember(false);
  };

  return (
    <PreviewWithModal
      title='invite members'
      ariaLabel='add member'
      // position='top-[10rem] left-1/2 -translate-x-1/2'
      width='w-[90vw] md:w-[70vw] lg:w-[22rem]'
      modalBackground='bg-foreground/20'
      closeModal={() => {
        setIsAddMember(false);
        setGroupMembers();
      }}>
      <div className='flex flex-col space-y-4'>
        <UpdateMembers oldMembers={group?.members as AddMemberType[]} />
      </div>
      <Button
        isLoading={isInviting}
        disabled={receiverIds.length === 0}
        onClick={handleMembersUpdateGroup}
        aria-label='invite members'
        className='w-full'>
        Invite members
      </Button>
    </PreviewWithModal>
  );
}
