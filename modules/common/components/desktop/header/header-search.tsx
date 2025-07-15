"use client";

import { Text } from "@/modules/common/ui/text";
import { useSearchStore } from "@/modules/store/search-store";
import { Search } from "lucide-react";
import React, { useEffect, useCallback } from "react";

export default function HeaderSearch() {
  const setIsSearch = useSearchStore((state) => state.setIsSearch);

  const handleSearch = () => {
    setIsSearch(true);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setIsSearch(true);
      }
    },
    [setIsSearch]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      onClick={handleSearch}
      role='button'
      className='relative w-[40%] h-8 hidden md:flex justify-start items-center pl-8 border border-primary rounded-lg bg-foreground/5 active:scale-95 hover:bg-foreground/10 transition cursor-pointer focus:ring-2 focus:ring-foreground/50'>
      <Text variant='p' className='text-xs text-foreground/60'>
        Search...
      </Text>
      <div className='absolute top-1/2 -translate-y-1/2 left-2'>
        <Search strokeWidth={1.5} size={16} className='text-foreground/60' />
      </div>
      <div className='hidden absolute top-1/2 -translate-y-1/2 right-2 lg:flex items-center bg-primary py-0.5 px-2 rounded-lg'>
        <Text variant='p' className='font-semibold text-background'>
          ctrl+
        </Text>
        <Text variant='p' className='font-semibold text-background'>
          k
        </Text>
      </div>
    </div>
  );
}
