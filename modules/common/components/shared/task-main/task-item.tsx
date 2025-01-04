import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/modules/common/ui/accordion";
import { useDrag } from "react-dnd";
import { motion, Variants } from "framer-motion";
import { Checkbox } from "../../../ui/checkbox";
import { Text } from "../../../ui/text";
import { CalendarDays, Clock, EllipsisVertical } from "lucide-react";
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
import { useEffect } from "react";
import { Skeleton } from "../../../ui/skeleton";
import TaskFileItem from "./task-file-item";
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
}: TaskItemProps) {
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
              file_url={taskFiles?.map((file) => file.file_url) as string[]}
            />
          </AccordionTrigger>
          <AccordionContent className='px-4 bg-background rounded-b-md'>
            <div className='w-full flex items-start justify-between'>
              {!!description && (
                <div className='flex flex-col space-y-1 mt-2'>
                  <Text variant={"p"} className='font-medium'>
                    Note:
                  </Text>
                  <Text variant={"p"}>{description}</Text>
                </div>
              )}
              {!!callLink && (
                <Text variant={"p"} className='underline'>
                  <a
                    title='tasks call link'
                    href={callLink}
                    target='_blank'
                    rel='noreferrer'>
                    {callLink}
                  </a>
                </Text>
              )}
            </div>
            {taskFiles && taskFiles?.length > 0 && (
              <div className='flex flex-col space-y-2 mt-4'>
                <Text variant={"p"} className='font-semibold'>
                  Task Files
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
  file_url
}: CollapsibleTriggerProps) {
  // if (type === "group") fetch group members

  const itemOptionHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

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
        <Text variant={"p"} className=''>
          {title}
        </Text>
        <div className='w-max aspect-square p-[2px] grid place-items-center border bg-foreground/10 rounded'>
          {convertStringToHTML({ list_icon })}
        </div>
        {type === "group" && <TaskGroupTitle groupTitle='Test' />}
      </div>

      <div className='flex space-x-2 items-center'>
        {type === "group" && <TaskGroupImg members={[]} />}
        <div className='flex space-x-1 items-center bg-foreground/10 px-2 py-1 rounded-md'>
          <Clock strokeWidth={1.5} size={18} className='text-foreground/60' />
          <Text variant={"p"} className='text-foreground/60 text-xs'>
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
  file_urls
}: {
  itemOptionHandler: (e: React.MouseEvent) => void;
  taskId: string;
  file_urls: string[];
}) {
  const setIsReschedule = useNewTaskStore((state) => state.setIsReschedule);
  const setTaskId = useNewTaskStore((state) => state.setTaskId);
  const user = useUserStore((state) => state.user);
  const { deleteTaskMutate, deleteTaskError, deleteTaskFileMutate } = useNewTask(user?.id as string);

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
            deleteTaskFileMutate({taskId, fileUrls: file_urls});
          }}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
