import React from 'react';
import type { IconVariantProps } from '@types';

export default function EmptyHeart({
  fill, height, width, stroke, style, className,
}: IconVariantProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={`${width}` || '44'} height={`${height}` || `${width}` || '44'} viewBox="0 0 24 24" strokeWidth="1.5" stroke={stroke || '#2c3e50'} fill={fill || 'none'} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path id="emptyheart" d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
  );
}
