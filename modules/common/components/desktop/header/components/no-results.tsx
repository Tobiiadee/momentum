import { Text } from "@/modules/common/ui/text";
import React from "react";

export default function NoResults() {
  return (
    <div className='grid place-items-center w-full h-[16rem]'>
      <Text variant={"h5"}>No results found</Text>
    </div>
  );
}
