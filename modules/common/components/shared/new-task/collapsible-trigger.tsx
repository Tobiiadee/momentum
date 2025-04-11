import { Checkbox } from "@/modules/common/ui/checkbox";
import { Text } from "@/modules/common/ui/text";
import { CalendarDays, Clock, Loader } from "lucide-react";
import Image from "next/image";
import TaskGroupTitle from "../../task/task-group-title";
import TaskGroupImg from "../../task/task-group-img";
import { MoreOptionsDropdown } from "./more-option-dropdown";
import { useMutation } from "@tanstack/react-query";
import { setTaskAsCompleted } from "@/modules/supabase/utils/actions";
import { toast } from "sonner";

interface CollapsibleTriggerProps {
  title: string;
  timeRange: string;
  completed: boolean;
  category: string;
  taskId: string;
  list_label: string;
  list_icon: string;
  dueDate: string;
  type?: "list" | "group";
  file_url: string[];
  group_title?: string;
  group_members?: AddMemberType[];
  isLoadingGroup?: boolean;
  isLoadingGroupDetails?: boolean;
}

export function CollapsibleTrigger({
  timeRange,
  title,
  completed,
  type,
  taskId,
  list_icon,
  dueDate,
  list_label,
  file_url,
  isLoadingGroup,
  group_title,
  group_members,
  isLoadingGroupDetails,
}: CollapsibleTriggerProps) {
  // if (type === "group") fetch group members

  const itemOptionHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  //mark task as completed
  const { mutate, isPending } = useMutation({
    mutationKey: ["complete-task", taskId],
    mutationFn: () => setTaskAsCompleted(taskId),
    onSuccess: () => {
      toast.success("Task marked as completed");
    },
    onError: () => {
      toast.error("Unable to mark task as completed");
    },
  });

  // console.log(group_members);

  function convertStringToHTML({ list_icon }: { list_icon: string }) {
    const htmlRegex = /<\/?[a-z][\s\S]*>/i; // Matches strings with HTML-like tags
    if (htmlRegex.test(list_icon)) {
      return <div dangerouslySetInnerHTML={{ __html: list_icon }} />;
    } else
      return (
        <div className='relative w-6 aspect-square grid place-items-center'>
          <Image src={list_icon} alt={list_label} fill priority />
        </div>
      );
  }

  return (
    <div className='w-full flex justify-between items-center'>
      <div className='flex items-center w-full md:w-1/2 space-x-4 h-max '>
        {isPending ? (
          <Loader className='mr-2 h-4 w-4 text-foreground animate-spin z-40' />
        ) : (
          <Checkbox
            checked={completed}
            onClick={(e) => {
              e.stopPropagation();
              mutate();
            }}
          />
        )}

        <div className='flex items-center space-x-2 w-max'>
          <Text variant={"p"} className=''>
            {title}
          </Text>
          <div className='w-max h-max hidden md:grid place-items-center'>
            {convertStringToHTML({ list_icon })}
          </div>
        </div>
        <div className='hidden md:block'>
          {type === "group" && group_title && (
            <TaskGroupTitle group_title={group_title as string} />
          )}
        </div>
      </div>

      <div className='flex space-x-2 items-center justify-end w-full'>
        <div className='hidden md:block'>
          {type === "group" && !isLoadingGroup && group_members && (
            <TaskGroupImg
              group_members={group_members as AddMemberType[]}
              isLoading={isLoadingGroupDetails}
            />
          )}
        </div>

        <div className='md:flex space-x-1 items-center bg-foreground/10 px-2 py-1 rounded-md hidden '>
          <Clock strokeWidth={1.5} size={18} className='text-foreground/60' />
          <Text variant={"p"} className='text-foreground/60 text-xs '>
            {timeRange}
          </Text>
        </div>
        <div className='md:flex hidden space-x-1 items-center bg-foreground/10 px-2 py-1 rounded-md'>
          <CalendarDays
            strokeWidth={1.5}
            size={18}
            className='text-foreground/60'
          />
          <Text variant={"p"} className='text-foreground/60 text-xs'>
            {dueDate}
          </Text>
        </div>

        <MoreOptionsDropdown
          taskId={taskId}
          itemOptionHandler={itemOptionHandler}
          file_urls={file_url}
        />
      </div>
    </div>
  );
}
