import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/modules/common/ui/accordion";
import { useDrag } from "react-dnd";
import { motion, Variants } from "framer-motion";
import { Checkbox } from "../../ui/checkbox";
import { Text } from "../../ui/text";
import { CalendarDays, Clock, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import TaskGroupImg from "./task-group-img";
import TaskGroupTitle from "./task-group-title";
import useNewTaskStore from "@/modules/store/new-task.store";
import { useNewTask } from "@/hooks/use-new-task";
import useUserStore from "@/modules/store/user-store";
import { toast } from "sonner";
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
  timeRange,
  task_id: id,
  category,
  completed,
  list,
  type,
  dueDate,
  callLink,
}: TaskItemProps) {
  const [{ isDragging }] = useDrag(() => ({
    type: "task",
    item: { id: index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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
              timeRange={timeRange}
              completed={completed}
              category={category?.label as string}
              type={type}
              list={list as string}
              dueDate={dueDate}
            />
          </AccordionTrigger>
          <AccordionContent className='px-4 bg-background rounded-b-md'>
            <div className='w-full flex items-start justify-between'>
              {!!description && <Text variant={"p"}>{description}</Text>}
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
  list: string;
  dueDate: string;
  type?: "list" | "group";
}

function CollapsibleTrigger({
  timeRange,
  title,
  completed,
  // category, fix category instead of list
  type,
  taskId,
  list,
  dueDate,
}: CollapsibleTriggerProps) {
  // if (type === "group") fetch group members

  const itemOptionHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const categoryBorderColor: Record<string, string> = {
    completed: "#000000",
    work: "#a569bd",
    personal: "#3498db",
  };

  return (
    <div className='w-full flex justify-between items-center'>
      <div className='flex items-center w-1/2 space-x-4 h-max'>
        <Checkbox onClick={(e) => e.stopPropagation()} />
        <Text variant={"p"} className=''>
          {title}
        </Text>
        <div
          style={{ borderColor: categoryBorderColor[list] }}
          className='w-5 aspect-square border bg-foreground/10 rounded'></div>
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
        />
      </div>
    </div>
  );
}

function MoreOptionsDropdown({
  itemOptionHandler,
  taskId,
}: {
  itemOptionHandler: (e: React.MouseEvent) => void;
  taskId: string;
}) {
  const setIsReschedule = useNewTaskStore((state) => state.setIsReschedule);
  const user = useUserStore((state) => state.user);
  const { deleteTaskMutate, deleteTaskError } = useNewTask(user?.id as string);

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
          }}>
          Reschedule
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            deleteTaskMutate(taskId);
          }}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
