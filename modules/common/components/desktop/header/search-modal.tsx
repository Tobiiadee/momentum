import React, { useEffect } from "react";
import { useSearchStore } from "@/modules/store/search-store";
import Modal from "@/modules/common/ui/modal";
import { Loader, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { previewVariant } from "../../shared/new-task/preview-task";
import useUserStore from "@/modules/store/user-store";
import useDebounce from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { searchEntities } from "@/modules/supabase/utils/actions";
import SearchResult from "./search-result";
import { cn } from "@/lib/utils";

const searchVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  hidden: { opacity: 0, y: "30%" },
};

export default function SearchModal() {
  const setIsSearch = useSearchStore((state) => state.setIsSearch);
  const isSearchResults = useSearchStore((state) => state.isSearchResults);
  const setIsSearchResults = useSearchStore(
    (state) => state.setIsSearchResults
  );

  return (
    <Modal
      onClick={() => {
        setIsSearch(false);
        setIsSearchResults(false);
      }}
      className='bg-foreground/10 backdrop-blur-sm '>
      <motion.div
        variants={previewVariant}
        animate='visible'
        initial='hidden'
        exit='exit'
        className='w-[40rem] h-max max-h-[80vh] flex flex-col space-y-2 absolute left-1/4 -translate-x-1/4 top-16 p-4 rounded-lg z-50'>
        <SearchInput />
        {isSearchResults && (
          <motion.div
            initial='hidden'
            animate='visible'
            variants={searchVariants}
            className='w-full h-max'>
            <SearchResult />
          </motion.div>
        )}
      </motion.div>
    </Modal>
  );
}

// interface SearchInputProps {
//   isLoading?: boolean;
// }

function SearchInput() {
  const userId = useUserStore((state) => state.user?.id);
  const isSearch = useSearchStore((state) => state.isSearch);
  const isSearchResults = useSearchStore((state) => state.isSearchResults);

  const setIsSearchResults = useSearchStore(
    (state) => state.setIsSearchResults
  );

  //search input state
  const [searchInput, setSearchInput] = React.useState("");

  //use debounce for search input to avoid unnecessary api calls
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const setSearchResults = useSearchStore((state) => state.setSearchResults);

  const setSearchResultsLoading = useSearchStore(
    (state) => state.setIsSearchResultsLoading
  );

  // const [searchResults, setSearchResults] = React.useState<any[]>([]);

  const { data: searchResults, isLoading: searchResultsLoading } = useQuery({
    queryKey: ["search", debouncedSearchInput],
    queryFn: async () =>
      await searchEntities(debouncedSearchInput, userId as string),
    enabled: debouncedSearchInput.length > 0,
  });

  useEffect(() => {
    setSearchResults(searchResults as SearchReturnType);
    setSearchResultsLoading(searchResultsLoading);
    if (searchResults) setIsSearchResults(true);
  }, [
    searchResults,
    searchResultsLoading,
    setSearchResults,
    setSearchResultsLoading,
    setIsSearchResults,
  ]);

  // console.log(searchResults);

  const inputRef = (element: HTMLInputElement) => {
    if (element && isSearch) {
      element.focus();
    }
  };

  return (
    <div
      className={cn(
        isSearchResults ? "rounded-t-lg" : "rounded-lg",
        "w-full relative bg-background py-2 px-4 "
      )}>
      <input
        ref={inputRef}
        placeholder='Searching is easier than you think...'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className='pl-6 pr-8 w-full text-sm focus:outline-none border-none py-1 placeholder:text-xs placeholder:text-foreground/60'
      />
      <div className='absolute top-1/2 -translate-y-1/2 left-2'></div>
      <div className='absolute top-1/2 -translate-y-1/2 left-4 '>
        {searchResultsLoading ? (
          <Loader
            strokeWidth={1.5}
            size={16}
            className='text-foreground/60 animate-spin'
          />
        ) : (
          <Search strokeWidth={1.5} size={16} className='text-foreground/60' />
        )}
      </div>

      <div
        onClick={() => setSearchInput("")}
        title='clear search'
        role='button'
        className='absolute top-1/2 -translate-y-1/2 right-4 grid place-items-center p-[2px] rounded-full hover:bg-foreground/10 active:scale-95 transition cursor-pointer'>
        <X strokeWidth={1.5} size={16} className='text-foreground/60' />
      </div>
    </div>
  );
}
