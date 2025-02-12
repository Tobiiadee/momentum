/*eslint-disable @typescript-eslint/no-explicit-any */

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/modules/common/ui/accordion";
import { useDrag } from "react-dnd";
import { motion, Variants } from "framer-motion";
import { Checkbox } from "../../../ui/checkbox";
import { Text } from "../../../ui/text";
import { CalendarDays, Clock, EllipsisVertical, Link } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import { Button } from "../../../ui/button";
import { cn } from "@/lib/utils";
import TaskGroupImg from "../../task/task-group-img";
import TaskGroupTitle from "../../task/task-group-title";
import useNewTaskStore from "@/modules/store/new-task.store";
import { useNewTask } from "@/hooks/use-new-task";
import useUserStore from "@/modules/store/user-store";
import { toast } from "sonner";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "../../../ui/skeleton";
import TaskFileItem from "./task-file-item";
import { fetchGroup } from "@/modules/supabase/utils/actions";
import { useQueryClient } from "@tanstack/react-query";
// import { mergeRefs } from "react-merge-refs";

const accordionVariants: Variants = {
  hidden: { opacity: 0, x: -200 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, type: "tween", delay: index * 0.08 }, // Adjust delay per index
  }),
  exit: { opacity: 0, x: 200 },
};

interface TaskItemProps extends TaskItem {
  index: number;
  list?: string;
  group_members?: MemberType[];
  group_title?: string;
  isLoadingGroup?: boolean;
}

export default function TaskItem({
  index,
  title,
  description,
  time_range,
  task_id: id,
  category,
  completed,
  list,
  type,
  due_date,
  callLink,
  list_icon,
  list_id,
  isLoadingGroup,
}: TaskItemProps) {
  //state for managing group details
  const [group, setGroup] = useState<GroupType>();
  const [isLoading, setIsLoading] = useState(false);

  // making the task item draggable
  const [{ isDragging }] = useDrag(() => ({
    type: "task",
    item: { id: index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const user = useUserStore((state) => state.user);
  const {
    refetchTaskFiles,
    isFetchingTaskFiles,
    isFetchTaskFilesError,
    fetchTaskFilesError,
    taskFiles,
  } = useNewTask(user?.id as string, id);

  useEffect(() => {
    refetchTaskFiles();
  }, [refetchTaskFiles]);

  const fetchTaskGroup = useCallback(async () => {
    try {
      setIsLoading(true);
      const groupData = await fetchGroup(list_id);

      if (!groupData) throw new Error("Group not found");

      setGroup(groupData);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch group");
    } finally {
      setIsLoading(false);
    }
  }, [list_id]);

  useEffect(() => {
    if (type === "group" && list_id) {
      fetchTaskGroup();
    }
  }, [type, list_id, fetchTaskGroup]);

  // removed ref={dragRef as ConnectDragSource}
  return (
    <div>
      <motion.div
        // ref={mergeRefs([dragRef, newRef])}
        variants={accordionVariants}
        key={index}
        custom={index}
        initial='hidden'
        animate='visible'
        exit={"exit"}>
        <AccordionItem value={`item-${id}`} className=''>
          <AccordionTrigger
            className={cn(
              "bg-background pl-4 pr-2 py-1 rounded-t-md data-[state=closed]:rounded-b-md",
              isDragging && "cursor-grab"
            )}>
            <CollapsibleTrigger
              title={title}
              taskId={id}
              timeRange={time_range}
              completed={completed}
              category={category?.label as string}
              type={type}
              list_label={list as string}
              list_icon={list_icon}
              dueDate={due_date}
              group_title={group?.label}
              group_members={group?.members as AddMemberType[]}
              file_url={taskFiles?.map((file) => file.file_url) as string[]}
              isLoadingGroup={isLoadingGroup}
              isLoadingGroupDetails={isLoading}
            />
          </AccordionTrigger>
          <AccordionContent className='px-4 bg-background rounded-b-md'>
            <div className='flex items-center justify-between md:hidden'>
              <div className='flex items-center space-x-4'>
                {type === "group" && group?.label && (
                  <TaskGroupTitle group_title={group?.label as string} />
                )}

                {type === "group" && !isLoadingGroup && group?.members && (
                  <TaskGroupImg
                    group_members={group.members as AddMemberType[]}
                    isLoading={isLoading}
                  />
                )}
              </div>

              <div className='md:hidden space-x-1 items-center bg-foreground/10 px-2 py-1 rounded-md flex'>
                <Clock
                  strokeWidth={1.5}
                  size={18}
                  className='text-foreground/60'
                />
                <Text variant={"p"} className='text-foreground/60 text-xs '>
                  {time_range}
                </Text>
              </div>
            </div>
            <div className='w-full flex items-start justify-between'>
              {!!description && (
                <div className='flex flex-col space-y-1 mt-2 w-[60%]'>
                  <Text variant={"p"} className='font-medium'>
                    Note:
                  </Text>
                  <Text variant={"p"}>{description}</Text>
                </div>
              )}
              {!!callLink && <CallLink callLink={callLink} />}
            </div>
            {taskFiles && taskFiles?.length > 0 && (
              <div className='flex flex-col space-y-2 mt-4'>
                <Text variant={"p"} className='font-semibold'>
                  Attached Files
                </Text>
                <div className='grid grid-cols-3 gap-2 w-[50%]'>
                  {isFetchingTaskFiles &&
                    Array.from({ length: 2 }).map((_, i) => (
                      <Skeleton key={i} className='w-full h-full' />
                    ))}

                  {isFetchTaskFilesError && (
                    <Text variant={"p"}>{fetchTaskFilesError?.message}</Text>
                  )}
                  {taskFiles?.map((file) => (
                    <TaskFileItem
                      file={file.file}
                      key={file.id}
                      file_name={file.file_name}
                      file_url={file.file_url}
                      created_at={file.created_at}
                      uploaded_at={file.uploaded_at}
                      task_id={file.task_id}
                      id={file.id}
                    />
                  ))}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </motion.div>

      {/* <TaskitemDragPreview
          ref={preview}
          title={title}
          timeRange={timeRange}
          completed={completed}
        /> */}
    </div>
  );
}

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

function CollapsibleTrigger({
  timeRange,
  title,
  // completed,
  // category, fix category instead of list
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
      <div className='flex items-center w-1/2 space-x-4 h-max'>
        <Checkbox onClick={(e) => e.stopPropagation()} />
        <div className='flex items-center space-x-2'>
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

      <div className='flex space-x-2 items-center'>
        <div className='hidden md:block'>
          {type === "group" && !isLoadingGroup && group_members && (
            <TaskGroupImg
              group_members={group_members as AddMemberType[]}
              isLoading={isLoadingGroupDetails}
            />
          )}
        </div>

        <div className='md:flex space-x-1 items-center bg-foreground/10 px-2 py-1 rounded-md hidden'>
          <Clock strokeWidth={1.5} size={18} className='text-foreground/60' />
          <Text variant={"p"} className='text-foreground/60 text-xs '>
            {timeRange}
          </Text>
        </div>
        <div className='flex space-x-1 items-center bg-foreground/10 px-2 py-1 rounded-md'>
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

function MoreOptionsDropdown({
  itemOptionHandler,
  taskId,
  file_urls,
}: {
  itemOptionHandler: (e: React.MouseEvent) => void;
  taskId: string;
  file_urls: string[];
}) {
  const queryClient = useQueryClient();
  const user_id = useUserStore((state) => state.user?.id);

  const setIsReschedule = useNewTaskStore((state) => state.setIsReschedule);
  const setTaskId = useNewTaskStore((state) => state.setTaskId);
  const user = useUserStore((state) => state.user);
  const { deleteTaskMutate, deleteTaskError, deleteTaskFileMutate } =
    useNewTask(user?.id as string);

  if (deleteTaskError) {
    toast.error(deleteTaskError.message);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={itemOptionHandler}
          variant={"ghost"}
          size={"sm"}
          className='text-foreground/70 bg-foreground/10 hover:bg-foreground/15 active:bg-foreground/20 py-1 px-2'>
          <EllipsisVertical strokeWidth={1.5} size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-14'>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
          }}>
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            setIsReschedule(true);
            setTaskId(taskId);
          }}>
          Reschedule
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            deleteTaskMutate(taskId);
            if (file_urls.length > 0) {
              deleteTaskFileMutate({ taskId, fileUrls: file_urls });
            }
            queryClient.invalidateQueries({ queryKey: ["all-task", user_id] });
          }}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CallLink({ callLink }: { callLink: string }) {
  return (
    <a
      className='grid place-items-center bg-transparent hover:bg-foreground/10 w-10 aspect-square rounded-full'
      title='tasks call link'
      href={callLink}
      target='_blank'
      rel='noreferrer'>
      <Link size={16} strokeWidth={1.5} />
    </a>
  );
}
