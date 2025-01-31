import React from "react";

interface NameListProps {
  names: string[];
}

const NameList: React.FC<NameListProps> = ({ names }) => {
  if (names.length === 2) {
    return (
      <span

        className='text-foreground text-xs font-semibold'>{`${names[0]} and ${names[1]}`}</span>
    );
  }

  if (names?.length > 2) {
    return (
      <span

        className='text-foreground text-xs font-semibold'>{`${names[0]}, ${
        names[1]
      } and ${names?.length - 2} others`}</span>
    );
  }

  // Fallback for cases with fewer than 2 names
  return (
    <span className='text-foreground text-xs font-semibold'>
      {names?.join(", ")}
    </span>
  );
};

export default NameList;
