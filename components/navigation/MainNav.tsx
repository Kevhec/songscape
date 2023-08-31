'use client';

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import Icon, { IconVariants } from '../icon';

export type NavLinkType = {
  href: string
  name: string
  id: string
  icon?: IconVariants | undefined
};

interface Props {
  navLinks: NavLinkType[]
}

interface LinkProps {
  x: number | undefined
  y: number | undefined
  width: number | undefined
  height: number | undefined
}

// Stablish a fallback for the local storage get item call with default link props
const fallbackLinkProps: LinkProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export default function MainNav({ navLinks }: Props) {
  const storageLinkProps: LinkProps = window.localStorage.getItem('linkProps') as unknown as LinkProps || fallbackLinkProps;

  /* Props needed to position the highlighting element of the nav component */
  /* Storage is used to keep track of last active link on page reload */
  const [activeLinkProps, setActiveLinkProps] = useState<LinkProps>({
    x: storageLinkProps?.x || 0,
    y: storageLinkProps?.y || 0,
    width: storageLinkProps?.width || 0,
    height: storageLinkProps?.height || 0,
  });

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  /* Get pathname to know which link is currently active */
  const pathname = usePathname();
  /* Ref needed to ensure link gets highlighted on first load */
  const activeLink = useRef<HTMLAnchorElement>(null);

  /* Save props to local storage to correctly place highlight on first load */
  const saveToStorage = (linkProps: LinkProps) => {
    window.localStorage.setItem('linkProps', JSON.stringify(linkProps));
  };

  const updateActiveLinkProps = useCallback((element: HTMLAnchorElement | null) => {
    const newActiveLinkProps = {
      x: (element?.offsetLeft),
      y: (element?.offsetTop),
      width: element?.offsetWidth,
      height: element?.offsetHeight,
    };

    setActiveLinkProps(newActiveLinkProps);
    saveToStorage(newActiveLinkProps);
  }, []);

  const updateFromActiveLink = useCallback(() => {
    updateActiveLinkProps(activeLink.current);
  }, [activeLink, updateActiveLinkProps]);

  /* Effect to make sure the highlight only occurs when the pathname changes */
  useEffect(() => {
    updateFromActiveLink();
  }, [pathname, updateFromActiveLink]);

  useEffect(() => {
    window.addEventListener('resize', updateFromActiveLink);
    return () => {
      window.removeEventListener('resize', updateFromActiveLink);
    };
  }, [updateFromActiveLink]);

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
            <Link
              href={href}
              className={classes}
              key={id}
              ref={isActive ? activeLink : null}
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
        })
      }
    </nav>
  );
}
