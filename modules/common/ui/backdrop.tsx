import { cn } from "@/lib/utils";

export type BackdropType = {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
  };
  
  export default function Backdrop({ onClick, className }: BackdropType) {
    return (
      <div onClick={onClick}>
        <div
          className={cn(className, "w-screen h-screen fixed top-0 left-0 z-40 overflow-hidden")}></div>
      </div>
    );
  }
  