"use client";

import { AlignJustify, CalendarDays, MoveDownIcon, MoveUp } from "lucide-react";
import { Button } from "../../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { sortArray } from "@/lib/helpers/format";
import useSortArrayStore from "@/modules/store/sort-array-store";
import { usePathname, useRouter } from "next/navigation";

interface SelectFilterProps {
  sortData?: Task[];
}

export default function SelectFilter({ sortData }: SelectFilterProps) {
  const setSortedData = useSortArrayStore((state) => state.setSortData);
  const router = useRouter();
  const pathName = usePathname();

  const onSortArrayByNameAsc = () => {
    if (!sortData) return;
    const sortedArray = sortArray(sortData, "title", "asc");
    setSortedData(sortedArray);

    // Update the query string
    router.push(`${pathName}?sort=asc`);
 
    
  };
  const onSortArrayByNameDesc = () => {
    if (!sortData) return;
    const sortedArray = sortArray(sortData, "title", "desc");
    setSortedData(sortedArray);

    // Update the query string
    router.push(`${pathName}?sort=desc`);
  };
  const onSortArrayByDate = () => {
    if (!sortData) return;
    const sortedArray = sortArray(sortData, "due_date", "asc");
    setSortedData(sortedArray);

    // Update the query string
    router.push(`${pathName}?sort=asc?type=date`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SelectFilterButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-5 w-[10rem]'>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSortArrayByNameAsc}>
          A-Z
          <DropdownMenuShortcut>
            <MoveDownIcon strokeWidth={1.5} size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSortArrayByNameDesc}>
          Z-A
          <DropdownMenuShortcut>
            <MoveUp strokeWidth={1.5} size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSortArrayByDate}>
          Date
          <DropdownMenuShortcut>
            <CalendarDays strokeWidth={1.5} size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
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
