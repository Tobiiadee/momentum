import { Text } from "@/modules/common/ui/text";
import { fetchTaskById } from "@/modules/supabase/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { Download, FilesIcon } from "lucide-react";
import React from "react";

interface ResultFileProps {
  file: TaskFileType;
}

export default function ResultFile({ file }: ResultFileProps) {
  const { data: task } = useQuery({
    queryKey: ["file"],
    queryFn: async () => fetchTaskById(file?.task_id as string),
  });

  return (
    <div className='flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg w-full hover:bg-foreground/5 active:bg-foreground/10 transition duration-300'>
      <div className='flex items-center space-x-2'>
        <div className='grid place-items-center w-10 aspect-square rounded-md bg-foreground/10'>
          <FilesIcon size={20} strokeWidth={1.5} className='text-foreground' />
        </div>

        <div className='flex flex-col'>
          <Text variant='p' className='font-medium capitalize'>
            {file?.file_name.toLocaleLowerCase()}
          </Text>
          <div className='flex items-center space-x-2'>
            <Text variant='p' className='font-normal text-xs'>
              {task?.list_label}
            </Text>
          </div>
        </div>
      </div>

      <a
        href={file.file_url}
        target='_blank'
        title='Download File'
        rel='noopener noreferrer'
        className='text-sm text-foreground/30 hover:text-background transition-all p-1 hover:bg-foreground/30 rounded-md'>
        <Download strokeWidth={1.5} size={20} />
      </a>
    </div>
  );
}
