import React from "react";
import ResultTasks from "../components/result-tasks";
import { Separator } from "@/modules/common/ui/separator";
import { useSearchStore } from "@/modules/store/search-store";
import NoResults from "../components/no-results";

export default function SearchTasks() {
  const searchResults = useSearchStore((state) => state.searchResults);

  if (!searchResults?.tasks || searchResults?.tasks.length === 0) {
    return <NoResults />;
  }

  return (
    <div className='flex flex-col space-y-1'>
      {searchResults?.tasks.map((task) => (
        <div key={task.task_id} className='flex flex-col space-y-1'>
          <ResultTasks task={task} />
          <Separator className='w-full' />
        </div>
      ))}
    </div>
  );
}
