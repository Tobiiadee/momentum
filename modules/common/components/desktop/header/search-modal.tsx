import React from "react";
import { useSearchStore } from "@/modules/store/search-store";
import Modal from "@/modules/common/ui/modal";
import { Loader, Search, X } from "lucide-react";
import SearchResult from "./search-result";
import { motion } from "framer-motion";
import { previewVariant } from "../../shared/new-task/preview-task";

export default function SearchModal() {
  const setIsSearch = useSearchStore((state) => state.setIsSearch);

  return (
    <Modal
      onClick={() => setIsSearch(false)}
      className='bg-foreground/10 backdrop-blur-sm'>
      <motion.div
        variants={previewVariant}
        animate='visible'
        initial='hidden'
        exit='exit'
        className='w-[45rem] flex flex-col space-y-4 absolute left-1/4 -translate-x-1/4 top-28 bg-background p-4 rounded-lg z-50'>
        <SearchInput />
        <SearchResult />
      </motion.div>
    </Modal>
  );
}

interface SearchInputProps {
  isLoading?: boolean;
}

function SearchInput({ isLoading }: SearchInputProps) {
  const [searchInput, setSearchInput] = React.useState("");
  const isSearch = useSearchStore((state) => state.isSearch);

  const inputRef = (Element: HTMLInputElement) => {
    if (Element && isSearch) {
      Element.focus();
    }
  };

  return (
    <div className='w-full relative'>
      <input
        ref={inputRef}
        placeholder='Searching is easier than you think...'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className='pl-6 pr-8 w-full text-sm focus:outline-none border-none py-1 placeholder:text-xs placeholder:text-foreground/60'
      />
      <div className='absolute top-1/2 -translate-y-1/2 left-2'></div>
      <div className='absolute top-1/2 -translate-y-1/2 left-0 '>
        {isLoading ? (
          <Loader strokeWidth={1.5} size={16} className='text-foreground/60' />
        ) : (
          <Search strokeWidth={1.5} size={16} className='text-foreground/60' />
        )}
      </div>

      <div
        onClick={() => setSearchInput("")}
        title='clear search'
        role='button'
        className='absolute top-1/2 -translate-y-1/2 right-0 grid place-items-center p-[2px] rounded-full hover:bg-foreground/10 active:scale-95 transition cursor-pointer'>
        <X strokeWidth={1.5} size={16} className='text-foreground/60' />
      </div>
    </div>
  );
}
