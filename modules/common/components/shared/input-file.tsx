import { Plus } from "lucide-react";
import React from "react";

export default function InputFile() {
  return (
    <div className='m-auto'>
      <label
        htmlFor='file'
        className='flex items-center justify-center w-28 aspect-square border border-dotted cursor-pointer'>
        <Plus strokeWidth={1} size={30} />
      </label>
      <input id='file' type='file' className='hidden' title="file"/>
    </div>
  );
}
