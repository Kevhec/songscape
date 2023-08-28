import React from 'react';
import '@/scss/layouts/app.scss';
import MainNav, { NavLinkType } from '@/components/navigation/MainNav';
import { lato } from '../../styles/fonts';

interface Props {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  const navLinks: NavLinkType[] = [
    { href: '/home', name: 'Home', icon: 'home' },
    { href: '/discover', name: 'Discover', icon: 'discover' },
    { href: '/search', name: 'Search', icon: 'search' },
    { href: '/favorites', name: 'Favorites', icon: 'favorites' },
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
