import { Text } from "@/modules/common/ui/text";
import React from "react";

interface EmptyTaskModuleProps {
  module?: string;
  text?: string;
}

export default function EmptyTaskModule({
  module,
  text: state,
}: EmptyTaskModuleProps) {
  return (
    <div className='grid place-items-center h-[60vh]'>
      {!!state ? (
        <Text variant={"h4"}>{state}</Text>
      ) : (
        <Text variant={"h4"}>
          You have no {!!module && module} tasks yet. Start by adding a task.
        </Text>
      )}
    </div>
  );
}
