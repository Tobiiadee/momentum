import React from "react";
import { Text } from "../../ui/text";

interface NameListProps {
  names: string[];
}

const NameList: React.FC<NameListProps> = ({ names }) => {
  if (names.length === 2) {
    return (
      <Text
        variant={"p"}
        className='text-foreground text-xs font-semibold'>{`${names[0]} and ${names[1]}`}</Text>
    );
  }

  if (names?.length > 2) {
    return (
      <Text
        variant={"p"}
        className='text-foreground text-xs font-semibold'>{`${names[0]}, ${
        names[1]
      } and ${names?.length - 2} others`}</Text>
    );
  }

  // Fallback for cases with fewer than 2 names
  return (
    <Text variant={"p"} className='text-foreground text-xs font-semibold'>
      {names?.join(", ")}
    </Text>
  );
};

export default NameList;
