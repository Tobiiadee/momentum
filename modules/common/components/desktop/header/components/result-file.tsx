import { Text } from "@/modules/common/ui/text";
import { FilesIcon } from "lucide-react";
import React from "react";

export default function ResultFile() {
  return (
    <div className='flex items-center space-x-2 cursor-pointer'>
      <div className='grid place-items-center w-12 aspect-square rounded-md bg-foreground/10'>
        <FilesIcon size={24} strokeWidth={1.5} className="text-foreground/60" />
      </div>

      <div className="flex flex-col">
        <Text variant="p" className="font-semibold">Name of the file</Text>
        <div className="flex items-center space-x-2">
            <Text variant="p" className="font-semibold">Group Name:</Text>
            <Text variant="p">Group ID</Text>
        </div>
      </div>
    </div>
  );
}
