import {
  useCallback, useEffect, useState,
} from 'react';
import { usePathname } from 'next/navigation';
import type { NavLinkProps } from '@/types';

const fallbackLinkProps: NavLinkProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

function useActiveLink(activeLink: HTMLAnchorElement | null) {
  let storageLinkProps: NavLinkProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  if (typeof window !== 'undefined') {
    storageLinkProps = window.localStorage.getItem('linkProps') as unknown as NavLinkProps || fallbackLinkProps;
  }

  /* Props needed to position the highlighting element of the nav component */
  /* Storage is used to keep track of last active link on page reload */
  const [activeLinkProps, setActiveLinkProps] = useState<NavLinkProps>({
    x: storageLinkProps?.x || 0,
    y: storageLinkProps?.y || 0,
    width: storageLinkProps?.width || 0,
    height: storageLinkProps?.height || 0,
  });

  /* Get pathname to know which link is currently active */
  const pathname = usePathname();

  /* Save props to local storage to correctly place highlight on first load */
  const saveToStorage = (linkProps: NavLinkProps) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('linkProps', JSON.stringify(linkProps));
    }
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
    updateActiveLinkProps(activeLink);
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

  return { activeLinkProps, pathname };
}

export default useActiveLink;
