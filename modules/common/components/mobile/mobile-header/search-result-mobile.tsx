import React from "react";
import { Separator } from "@/modules/common/ui/separator";
import { useSearchStore } from "@/modules/store/search-store";
import ResultTasks from "../../desktop/header/components/result-tasks";
import ResultPeople from "../../desktop/header/components/result-people";
import ResultFile from "../../desktop/header/components/result-file";
import NoResults from "../../desktop/header/components/no-results";

export default function SearchResultMobile() {
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
    return (
      <div className="bg-background py-2 px-4 rounded-b-lg">
        <NoResults />
      </div>
    );
  }

  // console.log(searchResults);

  return (
    <div className='flex flex-col space-y-1 md:hidden w-full h-full overflow-y-auto bg-background py-2 px-4 rounded-b-lg'>
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
