import React from "react";
import ResultPeople from "../components/result-people";
import { Separator } from "@/modules/common/ui/separator";
import { useSearchStore } from "@/modules/store/search-store";
import NoResults from "../components/no-results";

// interface PeopleProps {
//   people: UserDataType[];
// }

export default function People() {
  const searchResults = useSearchStore((state) => state.searchResults);

  if (!searchResults?.people || searchResults?.people.length === 0) {
    return <NoResults />;
  }

  return (
    <div className='flex flex-col space-y-1'>
      {searchResults?.people.map((person) => (
        <div key={person.id} className='flex flex-col space-y-1'>
          <ResultPeople people={person} />
          <Separator className='w-full' />
        </div>
      ))}
    </div>
  );
}
