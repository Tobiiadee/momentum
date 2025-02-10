"use client";

import { useSearchStore } from "@/modules/store/search-store";
import { Search } from "lucide-react";
import React, { useEffect, useCallback } from "react";

export default function MobileHeaderSearch() {
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
      className='relative w-[10%] h-8 flex justify-start items-center pl-8 border border-foreground/40 rounded-lg bg-foreground/5 active:scale-95 hover:bg-foreground/10 transition cursor-pointer focus:ring-2 focus:ring-foreground/50 md:hidden'>
      <div className='absolute top-1/2 -translate-y-1/2 left-2'>
        <Search strokeWidth={1.5} size={16} className='text-foreground' />
      </div>
    </div>
  );
}
