import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/modules/common/ui/tabs";
import { Text } from "@/modules/common/ui/text";
import { Blocks,  Files,  ListTodo, Users } from "lucide-react";
import TasksGroup from "./navigation pages/tasks-group";
import Members from "./navigation pages/members";
import Integrations from "./navigation pages/integrations";
import GroupFiles from "./navigation pages/group-files";


const tabs = [
  {
    name: "Tasks",
    value: "tasks",
    icon: <ListTodo size={18} strokeWidth={1.5} />,
    content: <TasksGroup />,
  },
  {
    name: "Members",
    value: "members",
    icon: <Users size={18} strokeWidth={1.5} />,
    content: <Members />,
  },
  {
    name: "Integrations",
    value: "integrations",
    icon: <Blocks size={18} strokeWidth={1.5} />,
    content: <Integrations />,
  },
  {
    name: "Files",
    value: "files",
    icon: <Files size={18} strokeWidth={1.5} />,
    content: <GroupFiles />,
  },
];

export default function GroupNav() {
  return (
    <div>
      <Tabs defaultValue='tasks' className='w-full h-[77vh] lg:pr-4 overflow-y-auto overflow-x-hidden'>
        <TabsList className='sticky top-0 left-0 z-40 justify-start w-full rounded-none p-0 bg-background shadow-none overflow-x-auto'>
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
        <div className='w-full mt-4 lg:pl-2 lg:pr-4 py-2 pb-14'>
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
