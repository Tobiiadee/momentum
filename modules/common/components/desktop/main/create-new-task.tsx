"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import useNewTaskStore from "@/modules/store/new-task.store";
import { Variants, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const NewTaskVariant: Variants = {
  hidden: { y: 200, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function CreateNewTask() {
  // const setIsNewTask = useNewTaskStore((state) => state.setIsNewTask);
  const isNewTask = useNewTaskStore((state) => state.isNewTask);
  const setIsTask = useNewTaskStore((state) => state.setIsTask);

  const router = useRouter();
  // const pathName = usePathname();

  // const hide = pathName === "/dashboard/create-new-task";

  const handleKeyEvent = (e: KeyboardEvent) => {
    if (e.altKey && e.key === "n") {
      e.preventDefault();
      // setIsNewTask(true);
      setIsTask(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  });

  const handleTask = () => {
    setIsTask(true);
    router.push("/dashboard/create-new-task");
  };

  return (
    <motion.div
      variants={NewTaskVariant}
      initial="hidden"
      animate="visible"
      className="w-[30%] h-12"
    >
      <Button
        onClick={handleTask}
        variant={"default"}
        className="w-full h-full flex justify-between rounded-3xl space-x-4 bg-foreground text-background hover:text-background hover:bg-foreground/95 active:bg-foreground/90 transition-all duration-300"
      >
        <div className="flex items-center space-x-2 ">
          <Plus
            strokeWidth={2}
            size={20}
            className={cn(isNewTask && "rotate-45 transition")}
          />
          <Text variant={"p"} className="font-medium">
            Create new task
          </Text>
        </div>

        <div className="flex items-center space-x-2 px-1.5 py-0.5 rounded-xl bg-background">
          <Text variant={"p"} className="text-xs text-foreground font-medium">
            alt + N
          </Text>
        </div>
      </Button>
    </motion.div>
  );
}
