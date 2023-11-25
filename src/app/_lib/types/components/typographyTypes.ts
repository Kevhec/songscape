export type TypographyVariants =
  'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p';

export type TypographyComponentMapping = {
  [key in TypographyVariants]: React.FC<{
    children: React.ReactNode, className: string
  }> | string;
};
