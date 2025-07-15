/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useGroupAction from "@/hooks/use-group-action";
import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import useUserStore from "@/modules/store/user-store";
import { exitGroup } from "@/modules/supabase/utils/actions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface ExitGroupButtonProps {
  group_id: string;
}

export default function ExitGroupBtn({ group_id }: ExitGroupButtonProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const { fetchedGroup } = useGroupAction(user?.id as string, group_id);

  //make sure the user is not the only admin
  const otherAdmins = fetchedGroup?.members.filter(
    (member) => member.role === "Admin" && member.member_id !== user?.id
  );

  

  const handleExitGroup = async () => {
    if (otherAdmins?.length === 0) {
      toast.error("You cannot exit the group because you are the only admin.");
      return;
    }
    try {
      await exitGroup(user?.id as string, group_id);
      router.push("/dashboard");
      toast.success("You have successfully exited the group.");
      // Add any navigation or state updates here
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Button title="Exit group" onClick={handleExitGroup} variant={"ghost"} className='text-xs'>
      <LogOut size={20} strokeWidth={1.5} />
      <Text variant={"p"} className='text-xs'>
        Exit Group
      </Text>
    </Button>
  );
}
