import React from 'react';
import '@scss/layouts/app.scss';
import MainNav from '@components/navigation/MainNav';
import type { NavLinkType } from '@types';
import Typography from '@/components/Typography';
// import HistoryNav from '@/components/navigation/HistoryNav';
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
      <aside className="mainLayout__aside">
        <div>
          <figure className="logo logo--desktop">
            <picture>
              <source srcSet="/logo-large.svg" media="(min-width: 1024px)" />
              <source srcSet="/logo-small.svg" media="(min-width: 768px)" />
              <img src="/logo-nowaves.svg" alt="SongScape logo" width={120} height={25} />
            </picture>
          </figure>
          <div>
            <MainNav navLinks={navLinks} />
          </div>
        </div>
        <p className={`attribution ${lato.className}`}>Powered by AudioScrobbler</p>
      </aside>
      <div className="mainLayout__mainContent">
        <header className="mainLayout__header">
          <figure className="logo logo--mobile">
            <picture>
              <source srcSet="/logo-large.svg" media="(min-width: 1024px)" />
              <source srcSet="/logo-small.svg" media="(min-width: 768px)" />
              <img src="/logo-nowaves.svg" alt="SongScape logo" width={120} height={25} />
            </picture>
          </figure>
          <div className="navbar">
            {/* <HistoryNav /> */}
            <label htmlFor="search" className="search__inputLabel">
              <Typography variant="p" className="visually-hidden">
                Search Anything!
              </Typography>
              <input type="text" id="search" className="search__input" placeholder="Bohemian Rhapsody..." />
            </label>
          </div>
        </header>
        <main className="main-section mainLayout__main">
          {children}
        </main>
      </div>
    </>
  );
}
