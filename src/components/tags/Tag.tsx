import React from 'react';
import classNames from 'classnames';
import { lato } from '@/fonts';

type Variant = 'dark' | 'default';

interface Props {
  children: string
  variant: Variant
}

const variantsMap = {
  dark: 'tag--dark',
  default: 'tag--default',
};

export default function Tag({ children, variant }: Props) {
  const classes = classNames('tag', variantsMap[variant], lato.variable);

  return (
    <div className={classes}>
      <p>{children}</p>
    </div>
  );
}
