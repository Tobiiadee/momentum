import { AlignJustify } from "lucide-react";
import { Button } from "../../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

export default function SelectFilter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SelectFilterButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-5'>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>A-Z</DropdownMenuItem>
        <DropdownMenuItem>Date</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SelectFilterButton() {
  return (
    <Button
      variant={"ghost"}
      className='bg-background hover:bg-background/50 active:bg-background/40 shadow'>
      <AlignJustify strokeWidth={1.5} size={20} />
    </Button>
  );
}
