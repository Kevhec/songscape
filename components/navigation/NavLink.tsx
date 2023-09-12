'use client';

import React, { Ref, forwardRef } from 'react';
import Link from 'next/link';
import type { IconVariants } from '@/types';
import Icon from '../icon';

interface Props {
  href: string
  className: string
  isActive: boolean
  name: string
  icon?: IconVariants
}

const NavLink = forwardRef((props: Props, ref: Ref<HTMLAnchorElement>) => {
  const {
    className, href, isActive, name, icon,
  } = props;

  return (
    <Link
      href={href}
      className={className}
      ref={ref}
    >
      {
        icon !== undefined && (
          <Icon variant={icon} fill={isActive ? '#212529' : '#ECF39E'} width={20} />
        )
      }
      <span>
        {name}
      </span>
    </Link>
  );
});

export default NavLink;
