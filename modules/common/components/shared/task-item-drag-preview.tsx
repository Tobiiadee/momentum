import { cn } from "@/lib/utils";
import React from "react";
import { Checkbox } from "../../ui/checkbox";
import { Text } from "../../ui/text";
import { Clock, EllipsisVertical } from "lucide-react";


type TaskitemDragPreviewProps = {
  title: string;
  timeRange: string;
  completed: boolean;
  className?: string;
};

const TaskitemDragPreview = React.forwardRef<HTMLDivElement, TaskitemDragPreviewProps>(
  ({ title, timeRange, completed, className }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>} // Ensure the ref matches HTMLDivElement type
        className={cn(
          className,
          "w-full flex justify-between items-center p-2 bg-background shadow-md rounded-md"
        )}
      >
        {/* Left Section: Task Info */}
        <div className="flex items-center w-1/2 space-x-4 h-max">
          <Checkbox />
          <Text variant="p" className={cn(completed === true && "line-through text-muted")}>
            {title}
          </Text>
          <div className="w-5 aspect-square bg-foreground/10 rounded"></div>
        </div>

        {/* Right Section: Time and Options */}
        <div className="flex space-x-2 items-center">
          <div className="flex space-x-1 items-center bg-foreground/10 px-2 py-1 rounded-md">
            <Clock strokeWidth={1.5} size={18} className="text-foreground/60" />
            <Text variant="p" className="text-foreground/60 text-xs">
              {timeRange}
            </Text>
          </div>

          <div className="text-foreground/70 bg-foreground/10 hover:bg-foreground/15 active:bg-foreground/20 py-1 px-2 rounded-md">
            <EllipsisVertical strokeWidth={1.5} size={18} />
          </div>
        </div>
      </div>
    );
  }
);

export default TaskitemDragPreview.displayName = "TaskitemDragPreview";


