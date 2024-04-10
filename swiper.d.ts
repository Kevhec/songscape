import React from 'react';

import type { SwiperSlideProps, SwiperProps } from 'swiper/react';

interface CustomEventMap {
  'swiperslidechange': CustomEvent<any>;
}

declare global {
  interface Document { // adds definition to Document, but you can do the same with HTMLElement
    addEventListener<K extends keyof CustomEventMap>(type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & SwiperProps,
      HTMLElement
      >;
      'swiper-slide': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & SwiperSlideProps,
      HTMLElement
      >;
    }
  }
}
