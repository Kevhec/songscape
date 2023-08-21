'use client';

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMediaQuery } from 'react-responsive';
import Icon, { IconVariants } from '../icon';

export type NavLinkType = {
  href: string
  name: string
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
  /* activeLink state defined to keep it stored and extract it's props only when the path changes */
  const [activeLink, setActiveLink] = useState<HTMLAnchorElement | null>(null);
  /* Props needed to position the highlighting element of the nav component */
  const [activeLinkProps, setActiveLinkProps] = useState<LinkProps>({
    x: storageLinkProps?.x || 0,
    y: storageLinkProps?.y || 0,
    width: storageLinkProps?.width || 0,
    height: storageLinkProps?.height || 0,
  });

  /* Get pathname to know which link is currently active */
  const pathname = usePathname();
  /* Ref needed to ensure link gets highlighted on first load */
  const firstLoadActiveLink = useRef<HTMLAnchorElement>(null);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

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

  const handleClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveLink(evt.currentTarget);
  };

  const updateFromActiveLink = useCallback(() => {
    updateActiveLinkProps(activeLink);
  }, [activeLink, updateActiveLinkProps]);

  /* Effect to set first load active link props */
  useEffect(() => {
    updateActiveLinkProps(firstLoadActiveLink.current);
  }, [updateActiveLinkProps]);

  /* Effect to make sure the highlight only occurs when the pathname changes */
  useEffect(() => {
    if (activeLink === null) return;
    updateFromActiveLink();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
          const { href, name, icon } = navLink;

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
              key={name + href}
              onClick={handleClick}
              ref={isActive ? firstLoadActiveLink : null}
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
