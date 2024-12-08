import { cn } from "@/lib/utils";

export type BackdropType = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function Backdrop({ onClick, className }: BackdropType) {
  return (
    <div
      onClick={onClick}
      className={cn(
        className,
        "w-screen h-screen fixed top-0 left-0 z-50 overflow-hidden"
      )}></div>
  );
}
