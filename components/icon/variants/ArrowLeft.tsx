import React from 'react';
import { Variant } from './Discover';

export default function ArrowLeft({ fill, width, height }: Variant) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width || '22'}`}
      height={`${height || (width ? 2 * width : null) || '44'}`}
      fill="none"
    >
      <path d="M17.8291 41.375L3.4541 22L17.8291 2.625" stroke={fill} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
