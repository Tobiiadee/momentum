import { cn } from "@/lib/utils";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function Wrapper({ className, children }: WrapperProps) {
  return (
    <div className={cn(className, "pl-[22rem] 2xl:pr-20 pt-6 pr-6 bg-foreground/5 h-screen")}>
      {children}
    </div>
  );
}
