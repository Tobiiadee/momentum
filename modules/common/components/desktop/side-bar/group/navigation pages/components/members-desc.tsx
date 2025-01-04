import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { Download, Plus } from "lucide-react";
import React from "react";

export default function MembersDesc() {
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
        <Button className='flex items-center'>
          <Plus strokeWidth={1.5} size={18} />
          <Text variant={"p"} className='text-xs'>
            Invite member
          </Text>
        </Button>
      </div>
    </div>
  );
}
