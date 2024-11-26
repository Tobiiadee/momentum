import React from "react";
import { Button } from "../../ui/button";
import { Text } from "../../ui/text";

export default function NoTask({ module }: { module: string }) {
  return (
    <div className='w-full h-[60vh] grid place-items-center'>
      <Text variant={"h4"}>You have no {module} task</Text>
    </div>
  );
}
