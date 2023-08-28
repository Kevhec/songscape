'use client';

import React, { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperOptions } from 'swiper/types';
import Icon from './icon';

type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

interface Props {
  elements: React.ReactNode[]
}

export default function Slider({ elements }: Props) {
  const swiperRef = useRef<SwiperRef>(null as any);
  const nextEl = useRef<HTMLDivElement>(null as any);
  const prevEl = useRef<HTMLDivElement>(null as any);

  useEffect(() => {
    // Register swiper web component
    register();

    const params: SwiperOptions = {
      slidesPerView: 'auto',
      spaceBetween: '16',
      centeredSlides: true,
      centeredSlidesBounds: true,
      cssMode: true,
      navigation: {
        enabled: true,
        nextEl: nextEl.current,
        prevEl: prevEl.current,
      },
      injectStyles: [
        `

        `,
      ],
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
    <div className="mySwiper">
      <swiper-container init={'false' as unknown as boolean} ref={swiperRef}>
        {
          elementsToRender.map((element) => (
            <swiper-slide key={element.id}>
              {element.item}
            </swiper-slide>
          ))
        }
      </swiper-container>
      <div className="swiper-prevElement" ref={prevEl}>
        <Icon variant="arrow-left" fill="#9BBB9A" />
      </div>
      <div className="swiper-nextElement" ref={nextEl}>
        <Icon variant="arrow-right" fill="#9BBB9A" />
      </div>
    </div>
  );
}
