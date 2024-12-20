import React from "react";

export default function Logo() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='200'
      height='200'
      viewBox='0 0 200 200'
      fill='none'>
      <circle cx='100' cy='100' r='90' stroke='black' stroke-width='10' />

      <path
        d='M70 100 L90 130 L140 70'
        stroke='black'
        strokeWidth='10'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      <path
        d='M40 160 L60 120 L80 160 L100 120 L120 160'
        stroke='black'
        strokeWidth='10'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
