import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type BackdropType = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function Backdrop({ onClick, className }: BackdropType) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className={cn(
        className,
        "w-screen h-screen fixed top-0 left-0 z-50 overflow-hidden"
      )}></motion.div>
  );
}
