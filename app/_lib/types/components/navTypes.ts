import type { IconVariants } from '.';

export type NavLinkType = {
  href: string
  name: string
  id: string
  icon?: IconVariants | undefined
};

export interface NavLinkProps {
  x: number | undefined
  y: number | undefined
  width: number | undefined
  height: number | undefined
}
