import { cn } from "@/lib/utils";
import React from "react";



export default function BorderAsIcon({ borderColor }: { borderColor: string }) {
  return (
    <div
      style={{ borderColor: borderColor }}
      className={cn(
        borderColor && `border`,
        "border-[1.4px] w-4 rounded aspect-square"
      )} // Fallback Tailwind class
    />
  );
}
