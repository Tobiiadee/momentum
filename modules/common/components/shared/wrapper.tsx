import { cn } from "@/lib/utils";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function Wrapper({ className, children }: WrapperProps) {
  return (
    <div className={cn(className, "pl-4 pr-4 lg:pl-[22rem] 2xl:pr-20 lg:pt-6 lg:pr-6 bg-foreground/5 min-h-screen max-h-screen overflow-hidden")}>
      {children}
    </div>
  );
}
