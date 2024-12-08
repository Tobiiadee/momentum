"use client";

import { cn } from "@/lib/utils";
import { Text } from "@/modules/common/ui/text";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

interface SideBarLinksProps {
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  numberOfTask?: string | number;
  label?: string;
}

export default function SideBarLinks({
  className,
  numberOfTask,
  label,
  icon,
}: SideBarLinksProps) {
  const pathname = usePathname();
  const router = useRouter();

  const href = `/dashboard/${label?.toLowerCase()}`;

  const isActive = useMemo(() => pathname === href, [pathname, href]);

  const navigateHandler = () => {
    router.push(href);
  };

  return (
    <div
      onClick={navigateHandler}
      className={cn(
        className,
        "w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-foreground/10 active:bg-foreground/20 transition-all duration-300 cursor-pointer",
        isActive && "bg-foreground/10"
      )}
      aria-current={isActive ? "page" : undefined}>
      <div className='flex space-x-4 items-center'>
        {icon}
        <Text variant='p' className='text-sm font-semibold capitalize'>
          {label}
        </Text>
      </div>

      {numberOfTask && <TaskNumber numberOfTask={numberOfTask} />}
    </div>
  );
}

export function TaskNumber({
  numberOfTask,
  className,
}: {
  numberOfTask?: string | number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        className,
        "w-6 aspect-square rounded-full bg-foreground/5 flex items-center justify-center"
      )}>
      <Text variant='p' className='text-xs font-semibold text-foreground/80'>
        {numberOfTask}
      </Text>
    </div>
  );
}
