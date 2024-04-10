import React from 'react';
import cn from 'classnames';
import { TypographyComponentMapping, TypographyVariants } from '@types';

const variantsMapping: TypographyComponentMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
};

interface Props {
  variant: TypographyVariants
  children: React.ReactNode
  className?: string
}

export default function Typography({ variant, children, className }: Props) {
  const Component = variantsMapping[variant];

  const classes = cn(
    'typography__variant',
    {
      [`typography__variant--${variant}`]: variant,
    },
    className,
  );

  return (
    <Component className={classes}>
      { children }
    </Component>
  );
}
