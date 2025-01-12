import React from "react";
import ResultFile from "../components/result-file";
import ResultPeople from "../components/result-people";

export default function AllResults() {
  return (
    <div className='flex flex-col space-y-4 divide-y'>
      <ResultFile />
      <ResultPeople />
    </div>
  );
}
