import React from "react";
import ResultFile from "../components/result-file";
import ResultPeople from "../components/result-people";
import { Separator } from "@/modules/common/ui/separator";
import ResultTasks from "../components/result-tasks";
import { useSearchStore } from "@/modules/store/search-store";
import NoResults from "../components/no-results";

export default function AllResults() {
  const searchResults = useSearchStore((state) => state.searchResults);

  const fileResults = searchResults?.files;
  const peopleResults = searchResults?.people;
  const tasksResults = searchResults?.tasks;

  if (
    (!fileResults && !peopleResults && !tasksResults) ||
    (fileResults.length === 0 &&
      peopleResults.length === 0 &&
      tasksResults.length === 0)
  ) {
    return <NoResults />;
  }

  console.log(searchResults);

  return (
    <div className='flex flex-col space-y-1'>
      {fileResults?.map((result) => (
        <div key={result.id} className='flex flex-col space-y-1'>
          <ResultFile file={result} />
          <Separator className='w-full' />
        </div>
      ))}
      {peopleResults?.map((result) => (
        <div key={result.id} className='flex flex-col space-y-1'>
          <ResultPeople people={result} />
          <Separator className='w-full' />
        </div>
      ))}
      {tasksResults?.map((result) => (
        <div key={result.task_id} className='flex flex-col space-y-1'>
          <ResultTasks task={result} />
          <Separator className='w-full' />
        </div>
      ))}
    </div>
  );
}
