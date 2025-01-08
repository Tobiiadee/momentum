"use client";

import PreviewWithModal from "@/modules/common/components/shared/preview-with-modal";
import useGroupStore from "@/modules/store/group-store";
import React from "react";
import { Button } from "@/modules/common/ui/button";
import useGroupAction from "@/hooks/use-group-action";
import useUserStore from "@/modules/store/user-store";
import { useParams } from "next/navigation";
import UpdateMembers from "./update-members";
import { toast } from "sonner";

export default function AddMemberModal() {
  const { groupId } = useParams();
  const user = useUserStore((state) => state.user);
  const setIsAddMember = useGroupStore((state) => state.setIsAddMember);
  const members = useGroupStore((state) => state.members);
  const setGroupMembers = useGroupStore((state) => state.reset);

  const {
    allGroups,
    inviteMembersMutate,
    isInviteMembers,
    isInviteMembersError,
    inviteMembersError,
  } = useGroupAction(user?.id as string);

  const filteredGroupId =
    allGroups?.find(
      (group) => group.label.toLowerCase() === (groupId as string).toLowerCase()
    )?.list_id ?? null;

  const filteredGroupMembers =
    allGroups?.find(
      (group) => group.label.toLowerCase() === (groupId as string).toLowerCase()
    )?.members ?? [];

  const setMembers: AddMemberType[] = members.map((member) => ({
    member_id: member.id,
    created_at: member.created_at,
    role: "Member",
  }));

  const handleMembersUpdateGroup = () => {
    inviteMembersMutate({
      groupId: filteredGroupId as string,
      members: setMembers,
    });

    if (!isInviteMembers && !isInviteMembersError) {
      setIsAddMember(false);
    }

    if (isInviteMembersError) toast.error(inviteMembersError?.message);
    if (!isInviteMembers && !isInviteMembersError)
      toast.success("Invite sent successfully");
    setGroupMembers();
  };

  return (
    <PreviewWithModal
      title='add member'
      ariaLabel='add member'
      position='top-[10rem] left-1/2 -translate-x-1/2'
      width='w-[22rem]'
      modalBackground='bg-foreground/20'
      closeModal={() => {
        setIsAddMember(false);
        setGroupMembers();
      }}>
      <div className='flex flex-col space-y-4'>
        <UpdateMembers oldMembers={filteredGroupMembers} />
      </div>
      <Button
        isLoading={isInviteMembers}
        onClick={handleMembersUpdateGroup}
        aria-label='invite members'
        className='w-full'>
        Invite
      </Button>
    </PreviewWithModal>
  );
}
