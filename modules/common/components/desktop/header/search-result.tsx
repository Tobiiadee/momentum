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
import Groups from "./search-tabs-pages/groups";
import Lists from "./lists";
import { Cog, FilesIcon, GroupIcon, ListIcon, Users } from "lucide-react";
import Files from "./search-tabs-pages/files";

const SearchResultNavTabs = [
  { nav_id: 1, nav_name: "All", nav_value: "all", nav_page: <AllResults /> },
  {
    nav_id: 2,
    nav_name: "People",
    nav_value: "people",
    nav_page: <People />,
    icon: <Users size={16} strokeWidth={1.5} />,
  },
  {
    nav_id: 3,
    nav_name: "Files",
    nav_value: "files",
    nav_page: <Files />,
    icon: <FilesIcon size={16} strokeWidth={1.5} />,
  },
  {
    nav_id: 5,
    nav_name: "Group",
    nav_value: "group",
    nav_page: <Groups />,
    icon: <GroupIcon size={16} strokeWidth={1.5} />,
  },
  {
    nav_id: 5,
    nav_name: "List",
    nav_value: "list",
    nav_page: <Lists />,
    icon: <ListIcon size={16} strokeWidth={1.5} />,
  },
];

export default function SearchResult() {
  return (
    <div>
      <SearchResultNav />
    </div>
  );
}

function SearchResultNav() {
  return (
    <div className='overflow-hidden w-full h-full'>
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
                <SearchResultNumber number={0} />
              </div>
              <div className='absolute -left-[1.5rem] bottom-[-1.5px] w-full h-[1.5px] bg-foreground hidden group-data-[state=active]:block'></div>
            </TabsTrigger>
          ))}
          <div
            role='button'
            title='search trigger'
            className='absolute top-1/2 -translate-y-1/2 right-2 grid place-items-center rounded-md hover:bg-foreground/10 p-1'>
            <Cog strokeWidth={1.5} size={16} className='text-foreground/60' />
          </div>
        </TabsList>
        <div className='w-full h-max pl-2 pr-4 pb-6 overflow-y-auto'>
          {SearchResultNavTabs.map((nav) => (
            <TabsContent key={nav.nav_id} value={nav.nav_value} className='mt-4'>
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
