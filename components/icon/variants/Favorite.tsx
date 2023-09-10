import React from 'react';
import type { Variant } from '@/types';

export default function Favorite({ fill, height, width }: Variant) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}` || '25'} height={`${height}` || `${width}` || '25'} viewBox="0 0 21 20" fill="none">
      <path d="M10.2002 19.0583L8.7502 17.7383C3.6002 13.0683 0.200195 9.97825 0.200195 6.20825C0.200195 3.11825 2.6202 0.708252 5.7002 0.708252C7.4402 0.708252 9.1102 1.51825 10.2002 2.78825C11.2902 1.51825 12.9602 0.708252 14.7002 0.708252C17.7802 0.708252 20.2002 3.11825 20.2002 6.20825C20.2002 9.97825 16.8002 13.0683 11.6502 17.7383L10.2002 19.0583Z" fill={fill || 'currentColor'} />
    </svg>
  );
}
