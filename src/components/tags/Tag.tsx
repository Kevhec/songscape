import React from 'react';
import classNames from 'classnames';
import { lato } from '@/fonts';

type Variant = 'dark';

interface Props {
  tag: string
  variant: Variant
}

const variantsMap = {
  dark: 'tag--dark',
};

export default function Tag({ tag, variant }: Props) {
  const classes = classNames('tag', variantsMap[variant], lato.variable);

  return (
    <div className={classes}>
      <p>{tag}</p>
    </div>
  );
}
