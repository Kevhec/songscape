'use client';

import React, { memo, useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperOptions } from 'swiper/types';
import useSliderElements from '@/hooks/useSliderElements';
import type { IconVariant } from '@/lib/types';
import Icon from './icon';

type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

interface SliderIcon {
  variant: IconVariant
  fill: `#${string}`
}

export interface SliderElement {
  item: React.ReactNode
  id: string | number
}

interface Props {
  elements: React.ReactNode[]
  leftControlIcon?: SliderIcon
  rightControlIcon?: SliderIcon
}

const Slider = memo(({ elements, leftControlIcon, rightControlIcon }: Props) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [sliderElements] = useSliderElements({ elements });

  useEffect(() => {
    register();

    const params: SwiperOptions = {
      slidesPerView: 'auto',
      spaceBetween: '16',
      centeredSlides: true,
      centeredSlidesBounds: true,
      cssMode: true,
      navigation: {
        enabled: true,
        prevEl: '.swiper-prevElement',
        nextEl: '.swiper-nextElement',
      },
      injectStyles: [
        `
          .swiper-wrapper {
            padding: 0 1rem;
            @media screen and (min-width: 768px) {
              padding: 0;
            }
          }
        `,
      ],
    };

    if (swiperRef.current) {
      Object.assign(swiperRef?.current, params);
      swiperRef?.current?.initialize();
    }
  }, []);

  return (
    <div className="mySwiper">
      <swiper-container init={'false' as unknown as boolean} ref={swiperRef}>
        {
          sliderElements?.map((element) => (
            <swiper-slide key={element.id}>
              {element.item}
            </swiper-slide>
          ))
        }
      </swiper-container>
      <div className="swiper-prevElement swiper-control">
        <Icon
          variant={`${leftControlIcon?.variant || 'arrow-left'}`}
          fill={`${leftControlIcon?.fill || '#9BBB9A'}`}
        />
      </div>
      <div className="swiper-nextElement swiper-control">
        <Icon
          variant={`${rightControlIcon?.variant || 'arrow-right'}`}
          fill={`${rightControlIcon?.fill || '#9BBB9A'}`}
        />
      </div>
    </div>
  );
});

export default Slider;
