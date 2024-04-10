import React from 'react';
import type { IconComponentMapping, IconVariant, IconVariantProps } from '@types';
import './index.css';
import {
  ArrowLeft,
  Discover,
  Favorite,
  Home,
  Search,
  Location,
  ArrowRight,
  EmptyHeart,
  Number25,
  DiscoverSliderLeftControl,
  DiscoverSliderRightControl,
  Flame,
  GrowingArrow,
  GoBackArrow,
  GoNextArrow,
} from './variants';

interface Props extends IconVariantProps {
  variant: IconVariant
}

const iconComponentMapping: IconComponentMapping = {
  discover: Discover,
  home: Home,
  search: Search,
  favorites: Favorite,
  location: Location,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'empty-heart': EmptyHeart,
  'number-25': Number25,
  'slider-left-control': DiscoverSliderLeftControl,
  'slider-right-control': DiscoverSliderRightControl,
  flame: Flame,
  'growing-arrow': GrowingArrow,
  'go-back': GoBackArrow,
  'go-next': GoNextArrow,
};

export default function Icon({
  variant, fill, width, height, stroke, style, className,
} : Props) {
  const IconComponent = iconComponentMapping[variant];

  return (
    <IconComponent
      fill={fill}
      width={width}
      height={height || width}
      stroke={stroke}
      style={style || {}}
      className={className}
    />
  );
}
