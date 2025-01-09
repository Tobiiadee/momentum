/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import React from "react";
import { createAvatar, Style } from "@dicebear/core";
import {
  lorelei,
  adventurer,
  avataaars,
  bigEars,
  bigSmile,
} from "@dicebear/collection";
import useListStore from "@/modules/store/list-store";
import { Button } from "@/modules/common/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useCustomScroll from "@/hooks/use-custom-scroll";

interface SelectSvgProps {
  seed: string;
}

// const styles = [
//   // lorelei,
//   adventurer,
//   avataaars,
//   bigEars,
//   bigSmile,
//   bottts,
//   croodles,
//   notionists,
//   micah,
//   openPeeps,
//   personas,
//   pixelArt,
//   icons,
//   funEmoji,
// ] as const;

type CompatibleStyle = Style<any>;

const compatibleStyles: CompatibleStyle[] = [
  lorelei,
  adventurer,
  avataaars,
  bigEars,
  bigSmile,
];

export default function SelectSvg({ seed }: SelectSvgProps) {
  const { showLeft, showRight, scrollLeft, scrollRight, scrollRef } =
    useCustomScroll();

  const avatars = compatibleStyles.map((style) =>
    createAvatar(style, { seed, scale: 80 }).toString()
  );

  return (
    <div
      ref={scrollRef}
      id='hide-scrollbar'
      className='flex items-center space-x-2 h-max w-full overflow-x-auto'>
      {showLeft && (
        <div className='absolute -left-5 top-1/3 -translate-y-1/3 z-40 flex items-center justify-center w-8 aspect-square shadow-md bg-background rounded-full overflow-hidden'>
          <Button
            type='button'
            onClick={scrollLeft}
            variant={"ghost"}
            className=''>
            <ChevronLeft strokeWidth={1.5} size={20} />
          </Button>
        </div>
      )}
      {avatars.map((avatar, index) => (
        <SVGS key={index} svg={avatar.toString()} />
      ))}
      {showRight && (
        <div className='absolute -right-6 top-1/3 -translate-y-1/3 z-40 flex items-center justify-center w-8 aspect-square shadow-md bg-background rounded-full overflow-hidden'>
          <Button
            type='button'
            onClick={scrollRight}
            variant={"ghost"}
            className=''>
            <ChevronRight strokeWidth={1.5} size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}

function SVGS({ svg }: { svg: string }) {
  const avatarDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const setSvgImage = useListStore((state) => state.setSvgImage);

  return (
    <div className='h-max'>
      <div
        onClick={() => setSvgImage(avatarDataUrl)}
        className='relative w-12 aspect-square rounded-md overflow-hidden grid place-items-center border hover:border-foreground/60 cursor-pointer active:scale-95 transition-all'>
        <Image
          src={avatarDataUrl}
          alt={`${svg} svg`}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
