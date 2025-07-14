"use client";

import ReactDOMServer from "react-dom/server";
import { formatTimeIntl } from "@/lib/helpers/format";
import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import useNewTaskStore from "@/modules/store/new-task.store";
import React, { useMemo } from "react";
import useUserStore from "@/modules/store/user-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useNewTask } from "@/hooks/use-new-task";
import { v4 as uuidv4 } from "uuid";
import { Variants } from "framer-motion";

export const previewVariant: Variants = {
  hidden: { scale: 0.9 },
  visible: { scale: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.1 } },
};

// Helper function to convert list icon to string or keep as is
const convertListIconToString = (listIcon: string | React.ReactNode) =>
  React.isValidElement(listIcon)
    ? ReactDOMServer.renderToString(listIcon)
    : listIcon;

export default function AddTask() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const taskStore = useNewTaskStore();

  const {
    title: taskTitle,
    description: taskDescription,
    taskDate,
    taskTimeFrom,
    taskTimeUntil,
    callLink,
    type,
    selectedCategory,
    taskFile,
    // setPreviewTask,
    reset,
  } = taskStore;

  const {
    addTaskMutate,
    isAddingTask,
    isAddTaskError,
    addTaskError,
    uploadTaskFilesMutate,
    // isUploadTaskFilesSuccess,
    isUploadTaskFilesError,
    uploadTaskFilesError,
  } = useNewTask(user?.id as string);

  // const handleClosePreview = () => {
  //   setPreviewTask(false);
  //   reset();
  // };

  const isTaskValid = useMemo(() => {
    return (
      taskTitle && taskDate && taskTimeFrom && taskTimeUntil && selectedCategory
    );
  }, [taskTitle, taskDate, taskTimeFrom, taskTimeUntil, selectedCategory]);

  const handleSaveTask = async () => {
    const taskId = uuidv4();
    const timeRange = formatTaskTime(taskTimeFrom, taskTimeUntil);

    try {
      await addTaskMutate({
        user_id: user?.id as string,
        task_id: taskId,
        title: taskTitle,
        description: taskDescription,
        due_date: taskDate,
        time_range: timeRange,
        completed: false,
        list_label: selectedCategory?.label || "",
        list_icon:
          (convertListIconToString(selectedCategory?.icon) as string) || "",
        list_id: selectedCategory?.id || "",
        call_link: callLink,
        type,
      });

      await uploadTaskFilesMutate({
        task_id: taskId,
        files: taskFile.map((file) => file.file),
      });

      if (!isAddTaskError && !isUploadTaskFilesError) {
        toast.success("Task added successfully");
        reset();
        router.push(`/dashboard/${selectedCategory?.label}`);
      }
    } catch (error: Error | unknown) {
      const errorMessage =
        isAddTaskError || isUploadTaskFilesError
          ? addTaskError?.message || uploadTaskFilesError?.message
          : "An error occurred while saving the task";
      toast.error(errorMessage);

      return error;
    }
  };

  const formatTaskTime = (from: string | null, until: string | null) => {
    if (!from || !until) return "";
    return `${formatTimeIntl(from)} - ${formatTimeIntl(until)}`;
  };

  return (
    <Button
      isLoading={isAddingTask}
      disabled={!isTaskValid}
      onClick={handleSaveTask}
      aria-label="save task"
      title="Save Task"
    >
      <Text variant="p">Save Task</Text>
    </Button>
  );
}

// function Header({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="w-full flex justify-between items-center border-b py-1 pr-2 pl-4">
//       <Text variant="p" className="font-semibold">
//         Preview Task
//       </Text>
//       <Button
//         onClick={onClose}
//         variant="ghost"
//         aria-label="close preview task"
//         size="sm"
//         className="rounded-full group px-[7px]"
//       >
//         <X
//           strokeWidth={2}
//           size={24}
//           className="text-foreground/60 group-hover:text-foreground"
//         />
//       </Button>
//     </div>
//   );
// }

// function EditButton({ onClick }: { onClick: () => void }) {
//   return (
//     <Button
//       onClick={onClick}
//       variant="ghost"
//       size="sm"
//       aria-label="edit task"
//       className="group"
//     >
//       <SquarePen
//         strokeWidth={2}
//         size={20}
//         className="text-foreground/60 group-hover:text-foreground"
//       />
//     </Button>
//   );
// }

// function TaskDetails({
//   title,
//   description,
//   date,
//   time,
//   category,
//   callLink,
// }: {
//   title: string;
//   description: string | null;
//   date: string;
//   time: string;
//   category?: string;
//   callLink?: string;
// }) {
//   return (
//     <div className="flex flex-col space-y-6 px-4">
//       <div className="w-full grid grid-cols-2 place-items-center py-2 mt-6">
//         <Detail label="Task Name" value={title} />
//         <Detail label="Due Date" value={date} />
//       </div>
//       <Detail label="Time" value={time} center />
//       {description && <Detail label="Description" value={description} center />}
//       <div className="w-full grid grid-cols-3 place-items-center py-2 gap-4">
//         <Detail label="List Category" value={category} />
//         {callLink && (
//           <Detail
//             label="Call Link"
//             value={<a href={callLink}>{callLink}</a>}
//             colSpan={2}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// function Detail({
//   label,
//   value,
//   center,
//   colSpan,
// }: {
//   label: string;
//   value?: React.ReactNode;
//   center?: boolean;
//   colSpan?: number;
// }) {
//   return (
//     <div
//       className={`flex flex-col space-y-2 ${
//         colSpan ? `col-span-${colSpan}` : ""
//       } ${center ? "items-center" : ""}`}
//     >
//       <Text variant="p" className="text-foreground/60 text-xs">
//         {label}
//       </Text>
//       <Text variant="p" className="font-semibold">
//         {value}
//       </Text>
//     </div>
//   );
// }
