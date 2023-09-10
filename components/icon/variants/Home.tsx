import React from 'react';
import type { Variant } from '@/types';

export default function Home({ fill, width, height }: Variant) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}` || '25'} height={`${height}` || `${width}` || '25'} viewBox="0 0 25 25" fill="none">
      <path d="M3.39614 24.7083H7.68081C8.1621 24.7083 8.56122 24.3091 8.56122 23.8278V19.1088C8.56122 17.2072 10.099 15.6694 12.0007 15.6694H12.3998C14.3015 15.6694 15.8393 17.2072 15.8393 19.1088V23.8278C15.8393 24.3091 16.2384 24.7083 16.7197 24.7083H21.0044C22.7887 24.7083 24.2325 23.2644 24.2325 21.4801V13.1103C24.2325 12.2769 23.9156 11.4904 23.3404 10.8799L14.5363 1.6767C13.3037 0.385435 11.0851 0.385435 9.86423 1.6767L1.04838 10.8917C0.484917 11.4903 0.167969 12.2769 0.167969 13.1103V21.4801C0.167969 23.2644 1.61184 24.7083 3.39614 24.7083Z" fill={fill || 'currentColor'} />
    </svg>
  );
}
