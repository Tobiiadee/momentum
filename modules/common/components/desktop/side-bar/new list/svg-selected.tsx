"use client";

import React from "react";
import useListStore from "@/modules/store/list-store";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const SvgVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function SVGSelected() {
  const svgImage = useListStore((state) => state.svgImage);
  return (
    <div className='w-full flex justify-center'>
      <motion.div
        variants={SvgVariants}
        animate='visible'
        initial='hidden'
        className='w-max h-max rounded-md shadow-md'>
        <div className='relative w-12 aspect-square rounded-md overflow-hidden grid place-items-center'>
          <Image
            src={svgImage}
            alt={`${svgImage} svg`}
            width={100}
            height={100}
          />
        </div>
      </motion.div>
    </div>
  );
}
