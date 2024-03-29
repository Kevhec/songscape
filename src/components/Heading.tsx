import React from 'react';
import cn from 'classnames';
import type { IconVariant, TypographyVariants } from '@lib/types';
import Icon from './icon';
import Typography from './Typography';

interface Props {
  icon?: IconVariant;
  variant: TypographyVariants
  children: React.ReactNode;
  className?: string;
}

export default function Heading({
  children, variant, icon, className,
}: Props) {
  const classes = cn('heading__container', className);
  return (
    <div className={classes}>
      {
        icon && (
          <Icon variant={icon} />
        )
      }
      <Typography variant={variant}>
        {children}
      </Typography>
    </div>
  );
}
