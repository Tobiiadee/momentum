import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/modules/common/ui/tabs";
import NavAll from "./nav-pages/nav-all";
import NavTask from "./nav-pages/nav-task";
import NavGroup from "./nav-pages/nav-group";
import NavChat from "./nav-pages/nav-chat";
import { Text } from "@/modules/common/ui/text";

const notifiactionNav = [
  { nav_id: 1, nav_name: "All", nav_value: "all", nav_page: <NavAll /> },
  { nav_id: 2, nav_name: "Task", nav_value: "task", nav_page: <NavTask /> },
  { nav_id: 3, nav_name: "Group", nav_value: "group", nav_page: <NavGroup /> },
  { nav_id: 4, nav_name: "Chat", nav_value: "chat", nav_page: <NavChat /> },
];

export default function NotificationNav() {
  return (
    <div className='overflow-hidden w-full h-full'>
      <Tabs defaultValue='all' className='w-full '>
        <TabsList className='justify-start rounded-none px-1 py-0 bg-transparent border-b shadow-none w-full'>
          {notifiactionNav.map((nav) => (
            <TabsTrigger
              key={nav.nav_value}
              value={nav.nav_value}
              className='relative  space-x-6 data-[state=active]:bg-background group data-[state=active]:shadow-none h-full rounded-none shadow-none'>
              <div className='flex items-center space-x-4'>
                <Text variant='p'>{nav.nav_name}</Text>
              </div>
              <div className='absolute -left-[1.5rem] bottom-[-1.5px] w-full h-[1.5px] bg-foreground hidden group-data-[state=active]:block'></div>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className='w-full h-[80vh] pl-2 pr-4 pb-6 overflow-y-auto'>
          {notifiactionNav.map((nav) => (
            <TabsContent key={nav.nav_id} value={nav.nav_value} className=''>
              {nav.nav_page}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
