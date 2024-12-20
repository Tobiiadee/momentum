import React from "react";
import { motion, Variants } from "framer-motion";
import { Info } from "lucide-react";
import { Text } from "../../ui/text";

const slideInVariant: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", duration: 0.6, stiffness: 200, damping: 10 },
  },
};

export default function ErrorTemp({ error }: { error: string }) {
  return (
    <div className='w-full flex justify-end pr-4 overflow-hidden'>
      <motion.div
        variants={slideInVariant}
        initial='initial'
        animate='animate'
        className='flex items-center space-x-1'>
        <Info size={18} strokeWidth={1.5} className='text-red-500' />
        <Text variant={"p"} className='text-red-500' role='alert'>
          {error as string}
        </Text>
      </motion.div>
    </div>
  );
}
