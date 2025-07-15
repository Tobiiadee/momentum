"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import useGroupStore from "@/modules/store/group-store";
import { Download, Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface MembersDescProps {
  isAdmin: boolean;
}

export default function MembersDesc({ isAdmin }: MembersDescProps) {
  const setIsAddMember = useGroupStore((state) => state.setIsAddMember);

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
      <div className="flex flex-col space-y-2">
        <Text variant={"h5"} className="font-medium">
          Members
        </Text>
        <div className="flex flex-col">
          <Text variant={"p"}>
            Invite your team members to work faster and to collaborate easily.
          </Text>
          <Text variant={"p"}>Manage your members and their roles.</Text>
        </div>
      </div>

      <div className="flex space-x-4 md:items-center">
        <Button
          variant={"ghost"}
          className="flex items-center bg-foreground/10 hover:bg-foreground/15"
        >
          <Download strokeWidth={1.5} size={18} />
          <Text variant={"p"} className="text-xs hidden md:block">
            Download CSV
          </Text>
        </Button>
        {isAdmin && (
          <Button
            title="Invite A Member"
            onClick={() => {
              if (!isAdmin) {
                toast.error("Only admins can invite members");
                return;
              }
              setIsAddMember(true);
            }}
            className="flex items-center"
          >
            <Plus strokeWidth={1.5} size={18} />
            <Text variant={"p"} className="text-xs">
              Invite member
            </Text>
          </Button>
        )}
      </div>
    </div>
  );
}
