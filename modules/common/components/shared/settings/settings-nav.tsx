import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/modules/common/ui/tabs";
import { Text } from "@/modules/common/ui/text";
import {
  BadgeHelp,
  BellDot,
  SlidersHorizontal,
  User,
  Users,
} from "lucide-react";
import General from "./general";
import Account from "./account";
import Help from "./help";
import Notification from "./notification";
import Groups from "./groups";

const tabs = [
  {
    name: "General",
    value: "general",
    icon: <User size={18} strokeWidth={1.5} />,
    content: <General />,
  },
  {
    name: "Groups",
    value: "groups",
    icon: <Users size={18} strokeWidth={1.5} />,
    content: <Groups />,
  },
  {
    name: "Account",
    value: "account",
    icon: <SlidersHorizontal size={18} strokeWidth={1.5} />,
    content: <Account />,
  },
  {
    name: "Notifications",
    value: "notifications",
    icon: <BellDot size={18} strokeWidth={1.5} />,
    content: <Notification />,
  },
  {
    name: "Help",
    value: "help",
    icon: <BadgeHelp size={18} strokeWidth={1.5} />,
    content: <Help />,
  },
];

export default function SettingsNav() {
  return (
    <div>
      <Tabs defaultValue='general' className='w-full '>
        <TabsList id="hide-scrollbar" className='sticky top-0 left-0 z-40 justify-start w-full rounded-none p-0 bg-background shadow-none overflow-x-auto'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='relative space-x-6 data-[state=active]:bg-foreground/5 group data-[state=active]:shadow-none h-full rounded-none shadow-none'>
              <Text variant='p'>{tab.name}</Text>
              <div>{tab.icon}</div>
              <div className='absolute -left-[1.5rem] top-0 w-full h-[1.5px] bg-foreground hidden group-data-[state=active]:block'></div>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className='w-full mt-4 md:pl-2 md:pr-4 py-2 pb-14'>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
