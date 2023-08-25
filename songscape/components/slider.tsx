'use client';

import React, { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperOptions } from 'swiper/types';

type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

interface Props {
  elements: React.ReactNode[]
}

export default function Slider({ elements }: Props) {
  const swiperRef = useRef<SwiperRef>(null as any);

  useEffect(() => {
    // Register swiper web component
    register();

    const params: SwiperOptions = {
      slidesPerView: 'auto',
      spaceBetween: '1rem',
      cssMode: true,
      navigation: true,
    };

    Object.assign(swiperRef?.current, params);

    swiperRef?.current?.initialize();
  }, []);

  /* ToDo: Before production update id generation to use crypto.randomUUID */
  const elementsToRender = elements.map((element, i) => ({
    item: element,
    id: i,
  }));

  return (
    <swiper-container init={'false' as unknown as boolean} ref={swiperRef}>
      {
        elementsToRender.map((element) => (
          <swiper-slide key={element.id}>
            {element.item}
          </swiper-slide>
        ))
      }
    </swiper-container>
  );
}
