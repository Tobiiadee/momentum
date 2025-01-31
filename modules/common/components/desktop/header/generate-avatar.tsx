import { cn } from "@/lib/utils";
import { Text } from "@/modules/common/ui/text";
import React from "react";

interface GenerateAvatarProps {
  letter: string;
  color: string;
}

export default function GenerateAvatar({ letter, color }: GenerateAvatarProps) {
  return (
    <div
      style={{ backgroundColor: color }}
      className={cn("rounded-full w-12 lg:w-8 aspect-square grid place-items-center")}>
      <Text variant={"p"} className='font-semibold text-background'>
        {letter}
      </Text>
    </div>
  );
}
