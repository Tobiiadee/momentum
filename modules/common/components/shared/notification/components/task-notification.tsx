import { Text } from "@/modules/common/ui/text";
import { ClipboardCheck } from "lucide-react";
import React, { useMemo } from "react";
import { NotificationOptions } from "./group-invite-notification";

interface TaskNotificationProps {
  type?: "add" | "remove" | "update" | "complete";
  task_list?: string;
}

export default function TaskNotification({
  type = "add",
  task_list = "work",
}: TaskNotificationProps) {
  const taskType = useMemo(() => {
    if (type === "add") {
      return "added";
    } else if (type === "remove") {
      return "removed";
    } else if (type === "update") {
      return "updated";
    } else if (type === "complete") {
      return "completed";
    }
  }, [type]);

  return (
    <div className='flex space-x-4 items-center py-2 w-full'>
      <div className='w-10 aspect-square rounded-md bg-foreground/10 grid place-items-center'>
        <ClipboardCheck size={22} strokeWidth={1.5} />
      </div>

      <div className='w-full flex flex-col -space-y-1'>
        <div className='flex items-center justify-between w-full'>
          <Text variant={"p"}>Task Notification</Text>

          <div className='flex items-center space-x-2'>
            <Text variant={"p"} className='text-foreground/60 text-xs'>
              8hrs ago
            </Text>

            <NotificationOptions />
          </div>
        </div>
        <Text variant={"p"} className='text-foreground/60 text-xs'>
          A task has been {taskType} to your {task_list} list
        </Text>
      </div>
    </div>
  );
}
