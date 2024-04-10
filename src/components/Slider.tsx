'use client';

/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { memo } from 'react';
import {
  type Options, Splide, SplideSlide, SplideTrack,
} from '@splidejs/react-splide';
import { Grid } from '@splidejs/splide-extension-grid';
import '@splidejs/react-splide/css/core';
import type { IconVariant } from '@lib/types';
import cn from 'classnames';
import idToElement from '@utils/idToElement';
import Icon from './icon';

interface SliderIcon {
  variant: IconVariant
  fill?: `#${string}`
}

export interface SliderElement {
  item: React.ReactNode
  id: string | number
}

interface Props extends Options {
  elements: React.ReactNode[]
  sliderIdentifier: string
  leftControlIcon?: SliderIcon
  rightControlIcon?: SliderIcon
  hasPagination?: boolean
}

const Slider = memo(({
  elements,
  leftControlIcon,
  rightControlIcon,
  sliderIdentifier,
  pagination,
  perPage = 1,
  autoWidth,
  ...options
}: Props) => {
  const sliderElements = elements.map((element) => (
    idToElement({ element })
  ));

  const mainContainerClasses = cn([{ [`slider-${sliderIdentifier}`]: sliderIdentifier }]);

  return (
    <div className={mainContainerClasses}>
      <Splide
        hasTrack={false}
        options={{
          autoWidth,
          pagination,
          perPage,
          ...options,
        }}
        id={sliderIdentifier}
        extensions={{ Grid }}
      >
        <div className={`splide__${sliderIdentifier} splide__container`}>
          <SplideTrack>
            {sliderElements?.map((element) => (
              <SplideSlide
                key={element.id}
              >
                {element.item}
              </SplideSlide>
            ))}
          </SplideTrack>
          <div className={`splide__arrows splide__arrows--${sliderIdentifier}`}>
            <button
              type="button"
              className={`splide__arrow splide__arrow--${sliderIdentifier} splide__arrow--prev`}
            >
              <Icon
                variant={`${leftControlIcon?.variant || 'slider-left-control'}`}
                fill={`${leftControlIcon?.fill || '#ecf39e'}`}
              />
            </button>
            <button
              type="button"
              className={`splide__arrow splide__arrow--${sliderIdentifier} splide__arrow--next`}
            >
              <Icon
                variant={`${rightControlIcon?.variant || 'slider-right-control'}`}
                fill={`${rightControlIcon?.fill || '#ecf39e'}`}
              />
            </button>
          </div>
          {
            pagination && (
              <ul className={`splide__pagination splide-${sliderIdentifier}-pagination`} />
            )
          }
        </div>
      </Splide>

    </div>
  );
});

export default Slider;
