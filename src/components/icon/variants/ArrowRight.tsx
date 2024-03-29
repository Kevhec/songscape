import React from 'react';
import type { IconVariantProps } from '@types';

export default function ArrowRight({ fill, width, height }: IconVariantProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width || '22'}`}
      height={`${height || (width ? 2 * width : null) || '44'}`}
      fill="none"
    >
      <path d="M3.4541 41.375L17.8291 22L3.4541 2.625" stroke={fill} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
