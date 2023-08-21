'use client';

import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon, { IconVariants } from '../icon';

export type NavLinkType = {
  href: string
  name: string
  icon?: IconVariants | undefined
};

interface Props {
  navLinks: NavLinkType[]
}

export default function MainNav({ navLinks }: Props) {
  /* activeLink state defined to keep it stored and extract it's props only when the path changes */
  const [activeLink, setActiveLink] = useState<HTMLAnchorElement | null>(null);

  /* Props needed to position the highlighting element of the nav component */
  const [activeLinkProps, setActiveLinkProps] = useState<{
    x: number | undefined,
    y: number | undefined,
    width: number | undefined,
    height: number | undefined,
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  /* Get pathname to know which link is currently active */
  const pathname = usePathname();
  /* Ref needed to ensure link gets highlighted on first load */
  const firstLoadActiveLink = useRef<HTMLAnchorElement>(null);

  const updateActiveLinkProps = (element: HTMLAnchorElement | null) => {
    const newActiveLinkProps = {
      x: (element?.offsetLeft),
      y: (element?.offsetTop),
      width: element?.offsetWidth,
      height: element?.offsetHeight,
    };

    setActiveLinkProps(newActiveLinkProps);
  };

  const handleClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveLink(evt.currentTarget);
  };

  /* Effect to set first load active link props */
  useEffect(() => {
    updateActiveLinkProps(firstLoadActiveLink.current);
  }, []);

  /* Effect to make sure the highlight only occurs when the pathname changes */
  useEffect(() => {
    if (activeLink === null) return;
    updateActiveLinkProps(activeLink);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <nav
      className="main-nav"
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
                <Icon variant={icon} fill={isActive ? '#212529' : '#ECF39E'} width={25} />
              )
            }
              {name}
            </Link>
          );
        })
      }
    </nav>
  );
}
