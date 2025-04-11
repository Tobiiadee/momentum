import { useNewTask } from "@/hooks/use-new-task";
import { Button } from "@/modules/common/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import useNewTaskStore from "@/modules/store/new-task.store";
import useUserStore from "@/modules/store/user-store";
import { useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Link } from "lucide-react";
import { toast } from "sonner";

export function MoreOptionsDropdown({
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
          className='text-foreground/70 md:bg-foreground/10 hover:bg-foreground/15 active:bg-foreground/20 py-1 px-2'>
          <EllipsisVertical strokeWidth={1.5} size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-[1.3rem] md:mr-[1.7rem] lg:mr-[3rem]'>
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

export function CallLink({ callLink }: { callLink: string }) {
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
