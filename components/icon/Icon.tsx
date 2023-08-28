import React from 'react';
import {
  Discover, Favorite, Home, Search,
} from './variants';
import './index.css';
import Location from './variants/Location';
import ArrowRight from './variants/ArrowRight';
import ArrowLeft from './variants/ArrowLeft';

export type IconVariants =
  'home'
  | 'discover'
  | 'search'
  | 'favorites'
  | 'location'
  | 'arrow-left'
  | 'arrow-right';

type IconComponentMapping = {
  [key in IconVariants]: React.FC<{ fill?: string; width?: number; height?: number }>;
};

interface Props {
  variant: IconVariants
  fill?: string
  width?: number
  height?: number
}

const iconComponentMapping: IconComponentMapping = {
  discover: Discover,
  home: Home,
  search: Search,
  favorites: Favorite,
  location: Location,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
};

export default function Icon({
  variant, fill, width, height,
} : Props) {
  const IconComponent = iconComponentMapping[variant];

  return (
    <IconComponent fill={fill} width={width} height={height || width} />
  );
}
