"use client";

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
import { sortArray } from "@/lib/helpers/format";
import useSortArrayStore from "@/modules/store/sort-array-store";

interface SelectFilterProps {
  sortData?: Task[];
}

export default function SelectFilter({ sortData }: SelectFilterProps) {
  const setSortedData = useSortArrayStore((state) => state.setSortData);

  const onSortArrayByNameAsc = () => {
    if (!sortData) return;
    const sortedArray = sortArray(sortData, "title", "asc");
    setSortedData(sortedArray);
  };
  const onSortArrayByNameDesc = () => {
    if (!sortData) return;
    const sortedArray = sortArray(sortData, "title", "desc");
    setSortedData(sortedArray);
  };
  const onSortArrayByDate = () => {
    if (!sortData) return;
    const sortedArray = sortArray(sortData, "due_date", "asc");
    setSortedData(sortedArray);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SelectFilterButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-5'>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSortArrayByNameAsc}>A-Z</DropdownMenuItem>
        <DropdownMenuItem onClick={onSortArrayByNameDesc}>Z-A</DropdownMenuItem>
        <DropdownMenuItem onClick={onSortArrayByDate}>Date</DropdownMenuItem>
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
