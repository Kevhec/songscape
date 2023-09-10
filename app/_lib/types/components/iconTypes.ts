export type IconVariants =
  'home'
  | 'discover'
  | 'search'
  | 'favorites'
  | 'location'
  | 'arrow-left'
  | 'arrow-right';

export interface Variant {
  fill?: string
  width?: number
  height?: number
}

export type IconComponentMapping = {
  [key in IconVariants]: React.FC<{ fill?: string; width?: number; height?: number }>;
};
