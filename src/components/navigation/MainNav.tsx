'use client';

import React, { useRef } from 'react';
import classnames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import type { NavLinkType } from '@/types';
import useActiveLink from '@/hooks/useActiveLink';
import NavLink from './NavLink';

interface Props {
  navLinks: NavLinkType[]
}

export default function MainNav({ navLinks }: Props) {
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  const { activeLinkProps, pathname } = useActiveLink(activeLinkRef.current);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const navClassName = classnames('main-nav', isTablet ? 'main-nav--tablet' : null);

  return (
    <nav
      className={navClassName}
      style={{
        '--x': `${activeLinkProps.x}px`,
        '--y': `${activeLinkProps.y}px`,
        '--linkWidth': `${activeLinkProps.width}px`,
        '--linkHeight': `${activeLinkProps.height}px`,
      } as React.CSSProperties}
    >
      {
        navLinks.map((navLink) => {
          const {
            href, name, icon, id,
          } = navLink;

          const isActive = pathname === href;

          const classes = classnames(
            'nav-link',
            isActive ? 'nav-link--active' : null,
            isTablet ? 'nav-link--tablet' : null,
          );

          return (
            <NavLink
              className={classes}
              href={href}
              icon={icon}
              isActive={isActive}
              name={name}
              key={id}
              ref={isActive ? activeLinkRef : null}
            />
          );
        })
      }
    </nav>
  );
}
