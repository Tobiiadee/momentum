import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { PenLine } from "lucide-react";
import React from "react";

interface EditButtonProps {
  editFn?: () => void;
  text?: string;
}

export default function EditButton({ editFn, text = "Edit" }: EditButtonProps) {
  return (
    <Button
      onClick={editFn}
      variant={"ghost"}
      className='flex items-center space-x-1 rounded-xl text-foreground/60 hover:text-foreground hover:bg-transparent border'>
      <PenLine size={18} strokeWidth={1.5} />
      <Text variant={"p"} className=''>
        {text}
      </Text>
    </Button>
  );
}
