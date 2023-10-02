import React from 'react';
import type { IconVariant, TypographyVariants } from '@/app/_lib/types';
import Icon from './icon';
import Typography from './Typography';

interface Props {
  icon?: IconVariant;
  variant: TypographyVariants
  children: React.ReactNode;
}

export default function Heading({ children, variant, icon }: Props) {
  return (
    <div className="heading__container">
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
