import React from 'react';

export type IconVariant =
  'home'
  | 'discover'
  | 'search'
  | 'favorites'
  | 'location'
  | 'arrow-left'
  | 'arrow-right'
  | 'empty-heart'
  | 'number-25'
  | 'discover-slider-left-control'
  | 'discover-slider-right-control';

export interface IconVariantProps {
  fill?: string
  stroke?: string
  width?: number
  height?: number
  style?: React.CSSProperties
  className?: string
}

export type IconComponentMapping = {
  [key in IconVariant]: React.FC<IconVariantProps>;
};
