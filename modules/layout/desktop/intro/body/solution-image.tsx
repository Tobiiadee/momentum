import Image from "next/image";
import React from "react";

export default function SolutionImage() {
  return (
    <div className="self-center w-[90%] rounded-t-3xl overflow-hidden border p-3 bg-foreground/10">
      <div className='relative w-full h-[35rem] rounded-t-2xl overflow-hidden'>
        <Image
          src={"/images/momentum-group.png"}
          alt={""}
          fill
          className='object-fill'
        />
      </div>
    </div>
  );
}
