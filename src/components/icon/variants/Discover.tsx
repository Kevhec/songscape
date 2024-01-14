import React from 'react';
import type { Variant } from '@/types';

export default function Discover({ fill, width, height }: Variant) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}` || '25'} height={`${height}` || `${width}` || '25'} viewBox="0 0 25 25" fill="none">
      <path d="M21.2646 3.70825V16.2083C21.2646 17.1365 20.8959 18.0267 20.2395 18.6831C19.5831 19.3395 18.6929 19.7083 17.7646 19.7083C16.8364 19.7083 15.9462 19.3395 15.2898 18.6831C14.6334 18.0267 14.2646 17.1365 14.2646 16.2083C14.2646 15.28 14.6334 14.3898 15.2898 13.7334C15.9462 13.077 16.8364 12.7083 17.7646 12.7083C18.3046 12.7083 18.8146 12.8283 19.2646 13.0483V7.17825L9.26465 9.30825V18.2083C9.26465 19.1365 8.8959 20.0267 8.23952 20.6831C7.58314 21.3395 6.69291 21.7083 5.76465 21.7083C4.83639 21.7083 3.94615 21.3395 3.28977 20.6831C2.6334 20.0267 2.26465 19.1365 2.26465 18.2083C2.26465 17.28 2.6334 16.3898 3.28977 15.7334C3.94615 15.077 4.83639 14.7083 5.76465 14.7083C6.30465 14.7083 6.81465 14.8283 7.26465 15.0483V6.70825L21.2646 3.70825Z" fill={fill || 'currentColor'} />
    </svg>
  );
}