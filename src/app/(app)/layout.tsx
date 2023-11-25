import React from 'react';
import '@/scss/layouts/app.scss';
import MainNav from '@/components/navigation/MainNav';
import type { NavLinkType } from '@/types';
import { lato } from '../../styles/fonts';
import generateRandomId from '../_lib/api/generateRandomId';

interface Props {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  const navLinks: NavLinkType[] = [
    {
      href: '/home', name: 'Home', icon: 'home', id: generateRandomId(),
    },
    {
      href: '/discover', name: 'Discover', icon: 'discover', id: generateRandomId(),
    },
    {
      href: '/search', name: 'Search', icon: 'search', id: generateRandomId(),
    },
    {
      href: '/favorites', name: 'Favorites', icon: 'favorites', id: generateRandomId(),
    },
  ];

  return (
    <>
      <header>
        <figure className="logo">
          <picture>
            <source srcSet="/logo-large.svg" media="(min-width: 1024px)" />
            <source srcSet="/logo-small.svg" media="(min-width: 768px)" />
            <img src="/logo-nowaves.svg" alt="Songscape logo" width={120} height={25} />
          </picture>
        </figure>
        <div className="placeholder">
          <p>NavBar</p>
        </div>
      </header>
      <aside>
        <div>
          <MainNav navLinks={navLinks} />
        </div>
        <p className={`attribution ${lato.className}`}>Powered by AudioScrobbler</p>
      </aside>
      <main>
        {children}
      </main>
    </>
  );
}
