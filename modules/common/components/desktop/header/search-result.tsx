import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/modules/common/ui/tabs";
import { Text } from "@/modules/common/ui/text";
import AllResults from "./search-tabs-pages/all-results";
import People from "./search-tabs-pages/people";
import { ClipboardCheck, FilesIcon, Users } from "lucide-react";
import Files from "./search-tabs-pages/files";
import SearchFilter from "./search-filter";
import SearchTasks from "./search-tabs-pages/search-tasks";
import { useSearchStore } from "@/modules/store/search-store";

export default function SearchResult() {
  return (
    <div className="min-h-[25rem] overflow-y-auto">
      <SearchResultNav />
    </div>
  );
}

function SearchResultNav() {
  const searchResults = useSearchStore((state) => state.searchResults);

  const searchResultsPeople = searchResults?.people || [];
  const searchResultsFiles = searchResults?.files || [];
  const searchResultsTasks = searchResults?.tasks || [];

  //Calculate total number of results
  const totalResults =
    searchResultsPeople.length +
    searchResultsFiles.length +
    searchResultsTasks.length;

  //number of results for each tab
  const peopleResults = searchResultsPeople.length;
  const filesResults = searchResultsFiles.length;
  const tasksResults = searchResultsTasks.length;

  const SearchResultNavTabs = [
    {
      nav_id: 1,
      nav_name: "All",
      nav_value: "all",
      nav_page: <AllResults />,
      noOfResults: totalResults || 0,
    },
    {
      nav_id: 2,
      nav_name: "People",
      nav_value: "people",
      nav_page: <People />,
      icon: <Users size={16} strokeWidth={1.5} />,
      noOfResults: peopleResults || 0,
    },
    {
      nav_id: 3,
      nav_name: "Files",
      nav_value: "files",
      nav_page: <Files />,
      icon: <FilesIcon size={16} strokeWidth={1.5} />,
      noOfResults: filesResults || 0,
    },
    {
      nav_id: 4,
      nav_name: "Tasks",
      nav_value: "tasks",
      nav_page: <SearchTasks />,
      icon: <ClipboardCheck size={16} strokeWidth={1.5} />,
      noOfResults: tasksResults || 0,
    },
  ];

  return (
    <div className='overflow-hidden w-full h-full overflow-y-auto bg-background py-2 px-4 rounded-b-lg'>
      <Tabs defaultValue='all' className='w-full '>
        <TabsList className='relative justify-start border-b-2 border-foreground/10 rounded-none p-0 bg-background shadow-none w-full'>
          {SearchResultNavTabs.map((nav) => (
            <TabsTrigger
              key={nav.nav_value}
              value={nav.nav_value}
              className='relative  space-x-6 data-[state=active]:bg-background group data-[state=active]:shadow-none h-full rounded-none shadow-none'>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-1'>
                  {nav.icon}
                  <Text variant='p'>{nav.nav_name}</Text>
                </div>
                <SearchResultNumber number={nav.noOfResults} />
              </div>
              <div className='absolute -left-[1.5rem] bottom-[-1.5px] w-full h-[1.5px] bg-foreground hidden group-data-[state=active]:block'></div>
            </TabsTrigger>
          ))}

          <SearchFilter />
        </TabsList>
        <div className='w-full h-max pl-2 pr-4 pb-6 overflow-y-auto'>
          {SearchResultNavTabs.map((nav) => (
            <TabsContent
              key={nav.nav_id}
              value={nav.nav_value}
              className='mt-4'>
              {nav.nav_page}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

function SearchResultNumber({ number }: { number: number | string }) {
  return (
    <div className='text-xs w-6 aspect-square bg-foreground/10 rounded-md grid place-items-center'>
      {number}
    </div>
  );
}
