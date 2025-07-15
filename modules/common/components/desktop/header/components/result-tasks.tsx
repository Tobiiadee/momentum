import { Text } from "@/modules/common/ui/text";
import { useSearchStore } from "@/modules/store/search-store";
import { ClipboardCheck, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ResultTasksProps {
  task: Task;
}

export default function ResultTasks({ task }: ResultTasksProps) {
  const router = useRouter();
  const setIsSearch = useSearchStore((state) => state.setIsSearch);
  const setIsSearchResults = useSearchStore(
    (state) => state.setIsSearchResults
  );

  const handleClick = () => {
    if (task?.type === "group") {
      router.push(`/dashboard/group/${task?.list_label}`);
    } else {
      router.push(`/dashboard/list/${task?.task_id}?label=${task?.list_label}`);
    }

    setIsSearch(false);
    setIsSearchResults(false);
  };

  return (
    <div
      onClick={handleClick}
      className='flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg w-full hover:bg-foreground/5 active:bg-foreground/10 transition duration-300'>
      <div className='flex items-center space-x-2'>
        <div className='grid place-items-center w-10 aspect-square rounded-md bg-foreground/10'>
          <ClipboardCheck
            size={20}
            strokeWidth={1.5}
            className='text-foreground'
          />
        </div>

        <div className='flex flex-col'>
          <Text variant='p' className='font-semibold'>
            {task?.title}
          </Text>
        </div>
      </div>

      <MoveRight strokeWidth={1.5} size={20} className='text-foreground/30' />
    </div>
  );
}
