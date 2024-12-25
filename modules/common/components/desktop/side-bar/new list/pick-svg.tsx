import { Button } from "@/modules/common/ui/button";
import { Plus, X } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/ui/tooltip";
import { Text } from "@/modules/common/ui/text";
import useListStore from "@/modules/store/list-store";

export default function PickSvg() {
  const setShowEmojipicker = useListStore((state) => state.setShowEmojipicker);
  const showEmojiPicker = useListStore((state) => state.showEmojipicker);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {!showEmojiPicker ? (
            <Button
              onClick={() => setShowEmojipicker(true)}
              type="button"
              variant={"ghost"}
              aria-label='Select an emoji'
              size={"icon"}
              className='flex items-center space-x-2 hover:bg-transparent'>
              <Plus strokeWidth={1.5} size={20} />
            </Button>
          ) : (
            <Button
              onClick={() => setShowEmojipicker(false)}
              type="button"
              variant={"ghost"}
              aria-label='Select an emoji'
              size={"icon"}
              className='flex items-center space-x-2 hover:bg-transparent'>
              <X strokeWidth={1.5} size={20} />
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <Text variant={"p"} className='text-xs'>
            Select an svg
          </Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
