import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import { Cog } from "lucide-react";
import React from "react";

export default function SearchFilter() {
  const [isFilter, setIsFilter] = React.useState(false);

  return (
    <div className='absolute top-1/2 -translate-y-1/2 right-2'>
      <DropdownMenu>
        <DropdownMenuTrigger
          title='search filter'
          onClick={(prev) => setIsFilter(!prev)}>
          <div
            title='search filter'
            className='grid place-items-center rounded-md hover:bg-foreground/10 p-1'>
            <Cog
              strokeWidth={1.5}
              size={20}
              className={cn(
                isFilter && "rotate-180 transition duration-700",
                "text-foreground/60"
              )}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mr-[5rem]'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
